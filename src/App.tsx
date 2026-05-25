import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Code, 
  Eye, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  AlertCircle,
  Cpu,
  Bookmark,
  ChevronRight,
  Sparkle,
  Layers,
  Palette,
  Type,
  Maximize2,
  FileCode,
  CornerDownLeft,
  Info,
  Undo2,
  Redo2,
  Sun,
  Moon
} from "lucide-react";
import { EXAMPLES } from "./data/examples";
import { GeneratedResult } from "./types";

export default function App() {
  // Application State
  const [imagePreview, setImagePreview] = useState<string | null>(EXAMPLES[0].result ? EXAMPLES[0].result.html : null);
  const [selectedExampleId, setSelectedExampleId] = useState<string>("saas-dashboard");
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [refinePrompt, setRefinePrompt] = useState<string>("");
  
  // Loading & Validation States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiError, setApiError] = useState<{ code?: string; message: string; error?: string } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Tab Controller ("preview" | "code" | "analysis")
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "analysis">("preview");

  // Dark mode toggle state for host website
  const [isWebsiteDarkMode, setIsWebsiteDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("visioncode_dark_mode") === "true";
  });
  
  // Active Generated code and breakdown data
  const [appCode, setAppCode] = useState<string>(EXAMPLES[0].result.html);
  const [analysisData, setAnalysisData] = useState<{
    layoutStyle: string;
    colors: string[];
    typography: string;
    keyComponents: string[];
  }>(EXAMPLES[0].result.analysis);

  // Undo/Redo Refinement History Stack State
  const [history, setHistory] = useState<Array<{
    appCode: string;
    analysisData: {
      layoutStyle: string;
      colors: string[];
      typography: string;
      keyComponents: string[];
    };
  }>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Push new state onto history stack
  const pushToHistory = (code: string, analysis: typeof analysisData) => {
    setHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      const newEntry = { appCode: code, analysisData: analysis };
      
      // Prevent consecutive duplicates in history stack
      if (nextHistory.length > 0) {
        const top = nextHistory[nextHistory.length - 1];
        if (top.appCode === code && JSON.stringify(top.analysisData) === JSON.stringify(analysis)) {
          return prev;
        }
      }
      
      const updated = [...nextHistory, newEntry];
      setHistoryIndex(updated.length - 1);
      return updated;
    });
  };

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Initialize with the first example on load
  useEffect(() => {
    const defaultExample = EXAMPLES.find(ex => ex.id === "saas-dashboard") || EXAMPLES[0];
    if (defaultExample) {
      setAppCode(defaultExample.result.html);
      setAnalysisData(defaultExample.result.analysis);
      setHistory([{ appCode: defaultExample.result.html, analysisData: defaultExample.result.analysis }]);
      setHistoryIndex(0);
    }
  }, []);

  // Set selected example preview
  const handleSelectExample = (id: string) => {
    const example = EXAMPLES.find(e => e.id === id);
    if (example) {
      setSelectedExampleId(example.id);
      setAppCode(example.result.html);
      setAnalysisData(example.result.analysis);
      setUploadedBase64(null);
      setImagePreview(null);
      setFileError(null);
      setApiError(null);
      setSuccessMessage(`Loaded "${example.title}" template.`);
      pushToHistory(example.result.html, example.result.analysis);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setFileError(null);
    setApiError(null);
    
    // Check supported MIME Types
    const validMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validMimeTypes.includes(file.type)) {
      setFileError("Invalid file type. Please upload a supported image format (PNG, JPG, WebP).");
      return;
    }

    // Check size limit: 12MB limit in client
    if (file.size > 12 * 1024 * 1024) {
      setFileError("File is too large. Max size allowed is 12MB to ensure API optimization throughput.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUploadedBase64(base64String);
      setImagePreview(base64String);
      setSelectedExampleId(""); // Unselect pre-baked templates
      setSuccessMessage("Screenshot selected. Ready to convert!");
      setTimeout(() => setSuccessMessage(null), 3000);
    };
    reader.onerror = () => {
      setFileError("Could not read file cleanly. Please try again with another system file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Core Request Triggers
  const handleGenerateCode = async (e: React.FormEvent, promptOverride?: string) => {
    e.preventDefault();
    if (!uploadedBase64) {
      setFileError("Please drop or browse an image screenshot first to begin processing.");
      return;
    }

    setIsGenerating(true);
    setApiError(null);
    setFileError(null);

    const payloadPrompt = promptOverride || customPrompt;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: uploadedBase64,
          framework: "HTML5 + Tailwind CSS + Interactive JS",
          prompt: payloadPrompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Generation query received an unexpected fault.");
      }

      if (data.html) {
        setAppCode(data.html);
        const nextAnalysis = data.analysis || analysisData;
        if (data.analysis) {
          setAnalysisData(data.analysis);
        }
        setActiveTab("preview");
        setSuccessMessage("Aesthetic layout successfully compiled by Gemini!");
        pushToHistory(data.html, nextAnalysis);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        throw new Error("Result compiled empty layout. Please confirm screenshot resolution or try simple overrides.");
      }
    } catch (err: any) {
      console.error(err);
      setApiError({
        message: err.message || "A validation fault occurred at the runtime compiler.",
        error: err.toString()
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Iterative refinement generator
  const handleRefineCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinePrompt.trim()) return;
    if (!appCode) {
      setFileError("Load or generate a base structure first before issuing refinement code scripts.");
      return;
    }

    setIsGenerating(true);
    setApiError(null);

    // If no uploaded image in memory, refine based on current preview state by treating current template HTML as a mock visual snapshot
    // But optimal behavior sends current Base64 + custom refinement instruction list
    const payloadPrompt = `This is a request to update the existing code. Under no circumstances lose the existing layout. Adjust the current UI with these specific enhancements: "${refinePrompt}". Avoid completely rewriting unless required. Present state:
${appCode}`;

    try {
      // If we have an image, we send the screenshot along to guide changes, else we can proxy or let Gemini update based on prompt string alone
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: uploadedBase64 || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // empty mock pixel if relying purely on text refine
          framework: "HTML5 + Tailwind CSS",
          prompt: payloadPrompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Iterative compiler encountered code issues.");
      }

      if (data.html) {
        setAppCode(data.html);
        const nextAnalysis = data.analysis || analysisData;
        if (data.analysis) {
          setAnalysisData(data.analysis);
        }
        setRefinePrompt("");
        setActiveTab("preview");
        setSuccessMessage("Visual component tweaked successfully!");
        pushToHistory(data.html, nextAnalysis);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        throw new Error("Refined result parsed empty. Please clarify your specific adjustment criteria.");
      }
    } catch (err: any) {
      console.error(err);
      setApiError({
        message: err.message || "Refining execution process stalled.",
        error: err.toString()
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle reverting / undoing refinements
  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const state = history[targetIndex];
      setHistoryIndex(targetIndex);
      setAppCode(state.appCode);
      setAnalysisData(state.analysisData);
      setSuccessMessage(`Undone: Restored step ${targetIndex + 1} of ${history.length}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Handle redoing refinement steps
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      const state = history[targetIndex];
      setHistoryIndex(targetIndex);
      setAppCode(state.appCode);
      setAnalysisData(state.analysisData);
      setSuccessMessage(`Redone: Restored step ${targetIndex + 1} of ${history.length}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Safe global refs for keyboard listener
  const undoRef = useRef(handleUndo);
  const redoRef = useRef(handleRedo);

  useEffect(() => {
    undoRef.current = handleUndo;
    redoRef.current = handleRedo;
  });

  // Bind Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z hotkeys globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undoRef.current();
      } else if (
        (isCmdOrCtrl && e.key.toLowerCase() === "y") ||
        (isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        redoRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Synchronize dynamic dark class on the document root for host website dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isWebsiteDarkMode);
    localStorage.setItem("visioncode_dark_mode", String(isWebsiteDarkMode));
  }, [isWebsiteDarkMode]);

  // Helper Utility: Copy Code
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopyCode = () => {
    if (!appCode) return;
    navigator.clipboard.writeText(appCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper Utility: Download file HTML directly
  const handleDownloadFile = () => {
    if (!appCode) return;
    const blob = new Blob([appCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vision-preview-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    setSuccessMessage("Component file generated and downloaded successfully.");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Clear inputs and resets
  const handleReset = () => {
    setImagePreview(null);
    setUploadedBase64(null);
    setSelectedExampleId("");
    setApiError(null);
    setFileError(null);
    setCustomPrompt("");
    setRefinePrompt("");
  };

  return (
    <div id="full-app-root" className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 dark:bg-black dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-200">
      
      {/* Sleek Theme Top Header Nav */}
      <header id="app-header" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-905 shadow-sm shrink-0 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <div className="bg-black px-3.5 py-1.5 flex items-center justify-center border border-zinc-900 shadow-md select-none rounded-sm">
            <span className="text-white font-black text-sm tracking-wider font-sans">
              UIC
            </span>
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans ml-1">
            UI<span className="text-neutral-500 dark:text-zinc-400 font-light">Code</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-zinc-800 ml-2">
            v3.5 Flash Engine
          </span>
        </div>

        {/* Global Success / Flow Message Box */}
        {successMessage && (
          <div className="hidden md:flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 rounded-full px-4 py-1.5 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center px-3 py-1 bg-green-50 dark:bg-emerald-950/40 text-green-700 dark:text-emerald-400 rounded-full text-xs font-semibold border border-green-100 dark:border-emerald-900/50 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
            Gemini 3.5 Flash Active
          </div>
          
          <button 
            onClick={() => {
              setSuccessMessage("Developer Workspace is fully active and synchronized.");
              setTimeout(() => setSuccessMessage(null), 3000);
            }} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-805 rounded-full transition-all text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
            title="System Diagnostics State"
          >
            <Cpu className="w-4 h-4" />
          </button>

          {/* Global Dark Mode Switch for Main Website */}
          <button 
            type="button"
            onClick={() => {
              const nextVal = !isWebsiteDarkMode;
              setIsWebsiteDarkMode(nextVal);
              setSuccessMessage(`Website Theme: ${nextVal ? "Dark Mode" : "Light Mode"} active.`);
              setTimeout(() => setSuccessMessage(null), 3000);
            }} 
            className={`p-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold border ${
              isWebsiteDarkMode 
                ? "bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800" 
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
            title="Toggle user dark mode preset for the website"
          >
            {isWebsiteDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center font-bold text-xs text-slate-850 dark:text-zinc-350 font-mono shadow-inner" title="Signed in user profile session">
            AI
          </div>
        </div>
      </header>

      {/* Main Sandbox Interactive Workspace */}
      <main id="app-workspace" className="flex flex-1 overflow-hidden">
        
        {/* Sleek Form Sidebar */}
        <aside id="workspace-sidebar" className="w-96 border-r border-slate-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 select-none transition-colors duration-200">
          
          {/* Header Action / Description */}
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">Source UI Screenshot</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Crop and upload a snapshot of your desired web component, pricing table, or modal card. UICode focuses strictly on recreating ONLY the exact elements visible in the screenshot.
            </p>
            <div className="mt-3 p-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-150 dark:border-zinc-850 rounded-lg flex items-center gap-2 text-[11px] text-slate-650 dark:text-zinc-400">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span><strong>Strict Elements-Only Focus:</strong> No unrequested full-page boilerplate scaffolded around widgets.</span>
            </div>
          </div>

          {/* Draggable Screenshot Upload Zone */}
          <div className="flex flex-col gap-2">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-850/85 hover:border-black dark:hover:border-zinc-405 cursor-pointer transition-all ${
                dragActive ? "border-black bg-slate-100 dark:bg-zinc-800/50 scale-[0.99] ring-2 ring-zinc-500/10" : "border-slate-300 dark:border-zinc-800"
              }`}
            >
              {imagePreview ? (
                <div className="w-full h-full p-2 flex flex-col items-center justify-center relative bg-slate-900 rounded-lg overflow-hidden group">
                  {imagePreview.startsWith("<") ? (
                    <div className="p-4 bg-slate-800 rounded-xl flex flex-col items-center border border-slate-700">
                      <FileCode className="w-10 h-10 text-zinc-400 mb-2" />
                      <span className="text-xs text-zinc-300 font-mono">Example Loaded</span>
                    </div>
                  ) : (
                    <img 
                      src={imagePreview} 
                      alt="Source Screenshot Preview" 
                      className="object-contain w-full h-full rounded transition group-hover:opacity-70"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all text-white p-2 text-center text-xs">
                    <RefreshCw className="w-5 h-5 mb-1 animate-spin-hover" />
                    <span>Upload a different screenshot</span>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-2 transition group-hover:text-black dark:group-hover:text-white" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drop screenshot here</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">PNG, JPG, WebP (max 12MB)</p>
                  <button type="button" className="mt-3 px-3 py-1 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-800 rounded-md text-xs font-semibold text-slate-755 dark:text-slate-200 shadow-sm transition-all">
                    Select File
                  </button>
                </>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*.png,image/*.jpeg,image/*.jpg,image/*.webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {imagePreview && (
              <div className="flex items-center justify-between mt-1 px-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Source asset ready</span>
                <button 
                  onClick={handleReset} 
                  className="text-[10px] text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold hover:underline"
                >
                  Remove Asset
                </button>
              </div>
            )}
          </div>

          {/* Error Message Box */}
          {fileError && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-xl">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-800 dark:text-red-200">Format Rejection</p>
                  <p className="text-[11px] text-red-600 dark:text-red-400 leading-snug">{fileError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Custom initial directives prompt */}
          {uploadedBase64 && !isGenerating && (
            <form onSubmit={(e) => handleGenerateCode(e)} className="flex flex-col gap-2.5 p-3.5 bg-slate-55 dark:bg-zinc-900/40 rounded-xl border border-slate-200 dark:border-zinc-800 animate-slide-up">
              <label className="text-[10px] font-bold text-slate-700 dark:text-zinc-400 uppercase tracking-wider">Initial Design System Directives</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Options: (e.g. 'Generate clean semantic CSS', 'Ensure responsive mobile sizing is fluid', 'Add interactive modals')"
                rows={2}
                className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 focus:outline-none focus:border-black dark:focus:border-zinc-500 focus:ring-1 focus:ring-black dark:focus:ring-zinc-500 rounded-lg transition resize-none placeholder-slate-400 text-slate-800 dark:text-zinc-100"
              />
              <button 
                type="submit" 
                className="w-full py-2 bg-black dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 text-white border border-transparent dark:border-zinc-700 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Analyze & Recompile code
              </button>
            </form>
          )}

          {/* Quick Examples Selection Grid */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 justify-between">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Interactive Templates</label>
              <span className="text-[10px] bg-slate-100 dark:bg-zinc-905 text-slate-700 dark:text-zinc-300 font-mono font-bold px-1.5 py-0.5 rounded uppercase">PRESETS</span>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5">
              {EXAMPLES.map((ex) => {
                const isActive = selectedExampleId === ex.id;
                return (
                  <div
                    key={ex.id}
                    onClick={() => handleSelectExample(ex.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 hover:translate-x-1 flex gap-3 ${
                      isActive 
                        ? "border-black dark:border-zinc-300 bg-slate-100 dark:bg-zinc-850/80 ring-1 ring-zinc-500/10" 
                        : "border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-black dark:bg-zinc-750 text-white" : "bg-white dark:bg-zinc-900 text-slate-400 border border-slate-200 dark:border-zinc-800"
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d={ex.thumbnail} />
                      </svg>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">{ex.title}</span>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                          ex.difficulty === "Simple" ? "bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300" :
                          ex.difficulty === "Medium" ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-zinc-850" :
                          "bg-slate-100 dark:bg-zinc-905 text-slate-705 dark:text-zinc-300 border border-slate-200 dark:border-zinc-850"
                        }`}>
                          {ex.difficulty}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{ex.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </aside>

        {/* Center Canvas UI Renderer / Sleek Preview Section */}
        <section id="workspace-canvas" className="flex-1 flex flex-col bg-slate-100 dark:bg-black p-6 overflow-hidden transition-colors duration-200">
          
          {/* Action Navigation Bar */}
          <div className="flex items-center justify-between mb-4 shrink-0 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {/* View Swapper */}
              <div className="flex bg-white dark:bg-zinc-950 rounded-lg p-1 border border-slate-200 dark:border-zinc-900 shadow-sm">
                <button 
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === "preview" 
                      ? "bg-black dark:bg-zinc-800 text-white shadow-sm" 
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </button>
                
                 <button 
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === "code" 
                      ? "bg-black dark:bg-zinc-800 text-white shadow-sm" 
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Generated Code
                </button>

                <button 
                  onClick={() => setActiveTab("analysis")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === "analysis" 
                      ? "bg-black dark:bg-zinc-800 text-white shadow-sm" 
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Design Metrics
                </button>
              </div>

              {/* Undo / Redo Refinement Stack Controls */}
              <div className="flex bg-white dark:bg-zinc-950 rounded-lg p-1 border border-slate-200 dark:border-zinc-900 shadow-sm items-center gap-1 font-sans">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-1 px-2.5 rounded hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-all flex items-center gap-1 font-bold text-xs"
                  title="Undo Refinement (Ctrl+Z)"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Undo</span>
                </button>
                
                {history.length > 0 && (
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 px-2 py-0.5 rounded shadow-inner select-none font-bold" title="Refinement History state step indicator">
                    {historyIndex + 1} / {history.length}
                  </span>
                )}
                
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1 px-2.5 rounded hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-all flex items-center gap-1 font-bold text-xs"
                  title="Redo Refinement (Ctrl+Y)"
                >
                  <span className="hidden xs:inline">Redo</span>
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Portability Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyCode}
                disabled={!appCode}
                className={`flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-lg text-xs font-semibold shadow-sm transition-all text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-805 focus:outline-none focus:ring-2 focus:ring-zinc-105 dark:focus:ring-zinc-900 disabled:opacity-50 ${
                  copied ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900" : ""
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy to Clipboard"}
              </button>
              
              <button 
                onClick={handleDownloadFile}
                disabled={!appCode}
                className="px-4 py-1.5 bg-black dark:bg-zinc-800 text-white hover:bg-zinc-900 dark:hover:bg-zinc-700 active:scale-95 border border-transparent dark:border-zinc-700 rounded-lg text-xs font-semibold tracking-wide transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Component
              </button>
            </div>
          </div>

          {/* High Fidelity Web Preview Canvas */}
          <div className="flex-1 bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-900 shadow-xl overflow-hidden flex flex-col relative transition-colors duration-200">
            
            {/* Top Bar (Browser Frame mimic) */}
            <div className="h-8 bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-zinc-905 flex items-center px-4 justify-between shrink-0 transition-colors duration-200">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="ml-4 px-3 py-0.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded text-[9px] text-slate-400 dark:text-slate-500 font-mono tracking-wide">
                  preview-window.local
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">responsive iframe sandbox</span>
              </div>
            </div>

            {/* Error alerts inside the preview area */}
            {apiError && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-30 flex items-center justify-center p-6 animate-fade-in">
                <div className="max-w-md w-full bg-white dark:bg-zinc-955 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-zinc-900 text-left">
                  <div className="flex items-center gap-3 text-red-600 mb-3">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Conversion Interrupted</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {apiError.message}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-200 dark:border-zinc-800 overflow-x-auto max-h-24 leading-snug">
                    {apiError.error || "System logs: Code compilation exception occurred."}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <button 
                      onClick={() => setApiError(null)} 
                      className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-bold rounded-lg transition"
                    >
                      Acknowledge
                    </button>
                    {uploadedBase64 && (
                      <button 
                        onClick={(e) => handleGenerateCode(e)} 
                        className="px-4 py-2 bg-black dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 text-white text-xs font-bold rounded-lg border border-transparent dark:border-zinc-700 transition"
                      >
                        Retry Conversion
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Loading Screen Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-fade-in">
                <div className="flex flex-col items-center max-w-sm text-center px-4">
                  {/* Rotating stylized spinner */}
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-zinc-850"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-black dark:border-white border-t-transparent animate-spin"></div>
                    <div className="absolute inset-2 bg-slate-55 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-black dark:text-white animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight mb-2">Analyzing Layout Metas...</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    AI is extracting layout color-codes, typography definitions, absolute coordinates, and responsive constraints. Generating responsive Tailwind template.
                  </p>
                  
                  {/* Mock progress bar */}
                  <div className="w-48 h-1 bg-slate-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-black dark:bg-zinc-150 rounded-full animate-indeterminate-bar"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Client Panel (Conditional rendering based on activeTab) */}
            <div className="flex-1 overflow-hidden relative">
              
              {/* TAB 1: Live Preview Iframe */}
              {activeTab === "preview" && (
                <div className="w-full h-full bg-slate-50 dark:bg-zinc-950 relative">
                  {appCode ? (
                    <iframe
                      id="preview-sandbox-iframe"
                      title="AI Applet Sandbox"
                      srcDoc={appCode}
                      sandbox="allow-scripts allow-modals allow-same-origin"
                      className="w-full h-full border-none bg-white"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-zinc-950">
                      <ImageIcon className="w-12 h-12 text-slate-300 dark:text-zinc-700 mb-3" />
                      <p className="text-sm font-bold text-slate-600 dark:text-slate-400">No layout compiled</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Please configure a source screenshot to see the live rendering here.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Generated Code Viewer */}
              {activeTab === "code" && (
                <div className="w-full h-full bg-black overflow-auto p-6 font-mono text-xs text-slate-300 text-left select-text scrollbar-thin">
                  {appCode ? (
                    <pre className="whitespace-pre-wrap break-all select-all leading-normal">
                      <code>{appCode}</code>
                    </pre>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center text-slate-500 dark:text-zinc-400">
                      <Code className="w-10 h-10 text-slate-700 dark:text-zinc-800 mb-2" />
                      <span>Code has not been compiled yet</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Design Metrics Inspector */}
              {activeTab === "analysis" && (
                <div className="w-full h-full bg-white dark:bg-zinc-950 overflow-y-auto p-8 text-left select-none transition-colors duration-200">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aethel Metrics Analysis</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated layout parameters retrieved from the visual asset.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Layout */}
                      <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-150 dark:border-zinc-850 flex flex-col gap-2 font-sans">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider">
                          <Layers className="w-4 h-4" />
                          <span>Layout Mechanics</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                          {analysisData.layoutStyle || "No layout evaluated yet."}
                        </p>
                      </div>

                      {/* Typography */}
                      <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-150 dark:border-zinc-800 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider">
                          <Type className="w-4 h-4" />
                          <span>Typography Structure</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium mt-1">
                          {analysisData.typography || "No fonts configured yet."}
                        </p>
                      </div>

                      {/* Colors */}
                      <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-150 dark:border-zinc-800 flex flex-col gap-2 md:col-span-2">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider mb-2">
                          <Palette className="w-4 h-4" />
                          <span>Identified Color Swatches</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.colors && analysisData.colors.length > 0 ? (
                            analysisData.colors.map((color, idx) => (
                              <span 
                                key={idx} 
                                className="px-2.5 py-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm"
                              >
                                <span className="w-3 h-3 rounded bg-zinc-500" style={{ backgroundColor: color.split(' ')[0] }}></span>
                                {color}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-zinc-500">No dominant colors specified.</span>
                          )}
                        </div>
                      </div>

                      {/* Reconstructed components */}
                      <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-150 dark:border-zinc-800 flex flex-col gap-2 md:col-span-2">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider mb-2">
                          <Sparkle className="w-4 h-4" />
                          <span>Recreated Component Tree</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {analysisData.keyComponents && analysisData.keyComponents.length > 0 ? (
                            analysisData.keyComponents.map((component, idx) => (
                              <div key={idx} className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800 rounded-lg text-xs font-medium text-slate-600 dark:text-zinc-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                                {component}
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-zinc-500">No components rebuilt yet.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Interactive AI Iterative Tweak Input bar */}
          <form onSubmit={handleRefineCode} className="mt-4 flex items-center gap-3 shrink-0">
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                value={refinePrompt}
                onChange={(e) => setRefinePrompt(e.target.value)}
                placeholder="Ask Gemini to tweak the styling or refine code logic (e.g. 'Make it a dark mode dashboard', 'Swap with emerald colors')" 
                disabled={isGenerating}
                className="w-full pl-4 pr-28 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs focus:ring-2 focus:ring-black dark:focus:ring-zinc-400 focus:border-black dark:focus:border-zinc-400 shadow-sm outline-none transition-all disabled:opacity-65 text-slate-800 dark:text-zinc-100 placeholder-slate-450 dark:placeholder-zinc-500"
              />
              <span className="absolute right-3.5 text-[10px] font-semibold text-slate-400 dark:text-zinc-500 font-mono tracking-widest hidden sm:inline">
                CTRL + ENTER
              </span>
            </div>
            
            <button 
              type="submit" 
              disabled={isGenerating || !refinePrompt.trim()}
              className="px-5 py-3 bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 dark:hover:bg-zinc-700 text-white border border-transparent dark:border-zinc-700 rounded-xl text-xs font-semibold hover:shadow-lg dark:hover:shadow-none transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Applying Changes...
                </>
              ) : (
                <>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                  Apply Tweaks
                </>
              )}
            </button>
          </form>
        </section>

      </main>

      {/* Sleek Theme Footer */}
      <footer id="app-footer" className="px-6 py-2 bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between shrink-0 select-none text-slate-400 dark:text-zinc-500 transition-colors duration-200">
        <div className="flex gap-4">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            State ID: <span className="text-slate-600 dark:text-slate-300 font-mono">NOMINAL</span>
          </span>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Token Capacity: <span className="text-slate-600 dark:text-slate-300 font-mono">99.9% Available</span>
          </span>
        </div>
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
          Integrated with Google Gemini 3.5 & Tailwind CSS
        </p>
      </footer>

      {/* Embedded CSS for custom progress and indeterminate actions */}
      <style>{`
        @keyframes indeterminate-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(100%); }
        }
        .animate-indeterminate-bar {
          width: 200%;
          animation: indeterminate-bar 1.5s infinite linear;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-hover:hover {
          animation: spin 0.8s ease-in-out;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
