import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Hardening: Disable Express signature header to prevent fingerprinting
  app.disable("x-powered-by");

  // Security Hardening: Apply safe metadata and XSS headers in responses
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Set highly flexible limit for uploading multi-MB screenshots
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ limit: "15mb", extended: true }));

  // API Generate Endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(400).json({
          error: "API key is missing.",
          message: "Please add a valid GEMINI_API_KEY in the Settings > Secrets configuration of your AI Studio workspace to perform live conversions.",
          code: "MISSING_API_KEY"
        });
      }

      const { image, mimeType, prompt, framework } = req.body;

      if (!image) {
        return res.status(400).json({
          error: "Missing image.",
          message: "An image base64 data string is required for layout conversion.",
          code: "MISSING_IMAGE"
        });
      }

      // Sanitize the Base64 image data
      let sanitizedBase64 = image;
      let detectedMimeType = mimeType || "image/png";

      if (image.startsWith("data:")) {
        const parts = image.split(";base64,");
        detectedMimeType = parts[0].replace("data:", "");
        sanitizedBase64 = parts[1];
      }

      // Initialize Gemini Client with proper custom headers
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const imagePart = {
        inlineData: {
          mimeType: detectedMimeType,
          data: sanitizedBase64,
        },
      };

      const systemPrompt = `You are a world-class senior UX/UI designer and expert frontend engineer.
Your goal is to perfectly recreate the provided screenshot as a single-page HTML mockup.
You will deliver a highly polished, interactive, modern interface that is structurally robust, fully responsive, and works flawlessly.

Guidelines:
1. STRICT ELEMENT-ONLY FOCUS (ANTIGRAVITY SCOPE):
   - CRITICAL REQUIREMENT: Recreate ONLY the exact interface elements, component parts, buttons, modally cropped boxes, or specific widgets visible in the uploaded image.
   - DO NOT scaffold, guess, or invent an entire webpage layout (such as main navigation bars, websites, headers, video players, bottom navs, or unrelated layout frames) around the uploaded widget if they are NOT in the image.
   - If the screenshot shows a single cropped button, subscriber pill, card, input box, table row, or comment block, then generate ONLY that specific element/component.
   - To present standalone widgets or cropped components beautifully in the preview sandbox, wrap them inside a clean, centered, full-height alignment frame (e.g. <div class="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4">), but keep the actual generated UX code completely focused and restricted to just that element.

2. DESIGN EXCELLENCE & PRECISENESS:
   - Match the screenshot's color palettes, contrast ratio, spacing, alignments, gaps, and relative layout carefully.
   - Choose clean modern sans-serif fonts or match specified headers using standard system/Google web fonts.
   - Use beautiful margins, padding ratios, hover states, soft scales, and micro-elevation shadows to convey premium fidelity.

3. CDNs & PLUGINS INCLUDED IN <head>:
   - ALWAYS include standard Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>
   - ALWAYS include Lucide Icons CDN Script: <script src="https://unpkg.com/lucide@latest"></script> (Call 'lucide.createIcons();' at the end of the body in a script block). Do not write manual XML/SVGs of complex icons, use Lucide tags: e.g. <i data-lucide="search"></i>, <i data-lucide="shopping-cart"></i>, etc.
   - If beautiful serif typography is needed, link Google Fonts as needed.

4. ROBUST INTERACTIVITY:
   - Inject vanilla JS within <script> tags to make custom interactions work natively! For example, wire up navigation mobile-menus, dropdown menus, authentication modals, form input validation, active state loaders, or tab controls. Let users play with the UI in the iframe!
   - Ensure elements look live: adding interactive hover:bg-opacity-8 || focus-within:ring scales. 

5. OUTPUT COMPLIANCE:
   - Provide a valid, standard, full self-contained index file string including DOCTYPE, html, head, and body.
   - Do NOT wrap code in markdown ticks inside the JSON.
   - Analyze the screenshot to extract key layout structures, a detailed list of design colors (hex or descriptive words), typography guidelines, and components rebuilt.`;

      const promptText = `Recreate this UI screenshot as clean, responsive ${framework || "HTML + Tailwind CSS"} markup. Rebuild ONLY the exact elements/widgets visible in the screenshot. Do not build an entire website page around them unless the screenshot shows a whole webpage.
${prompt ? `Strict additional developer/user requirements: ${prompt}` : "Reconstruct the visible layout elements exactly layout-for-layout, color-for-color."}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [imagePart, { text: `${systemPrompt}\n\nTask: ${promptText}` }],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              html: {
                type: Type.STRING,
                description: "The complete self-contained HTML document with Tailwind and custom interactivity scripts. No markdown tags.",
              },
              analysis: {
                type: Type.OBJECT,
                properties: {
                  layoutStyle: {
                    type: Type.STRING,
                    description: "Structural layout description (e.g. Adaptive Grid, Sidebar Layout, Modern Hero Grid).",
                  },
                  colors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Specific hex or descriptive color values extracted from the screenshot.",
                  },
                  typography: {
                    type: Type.STRING,
                    description: "Selected font pairings, sizes, weight parameters, and letter-spacing details.",
                  },
                  keyComponents: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "The list of reconstructed interactive sections, cards, and UI components.",
                  },
                },
                required: ["layoutStyle", "colors", "typography", "keyComponents"],
              },
            },
            required: ["html", "analysis"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini API");
      }

      const result = JSON.parse(responseText);
      res.json(result);
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        error: "Conversion failed.",
        message: err.message || "An error occurred while generating the UI elements.",
        code: "GENERATION_ERROR"
      });
    }
  });

  // Handle client asset paths
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server boots on http://0.0.0.0:${PORT}`);
  });
}

startServer();
