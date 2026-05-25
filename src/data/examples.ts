import { ExampleTemplate } from "../types";

export const EXAMPLES: ExampleTemplate[] = [
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard Hub",
    category: "Admin & Analytics Grid",
    difficulty: "Complex",
    thumbnail: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM17 11h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2zM17 21h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2zM9 11h2a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zM9 21h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zM17 15h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2z",
    description: "Multi-column interactive dashboard featuring user analytics metrics, dynamic transaction charts, live system state indicators, and an immersive dark cosmic color scheme.",
    userPrompt: "Recreate a highly interactive SaaS dashboard grid using a rich, dark twilight palette. Provide custom metric highlights and live badge controls.",
    result: {
      html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cosmic SaaS Hub</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
    body {
      font-family: 'Outfit', sans-serif;
    }
  </style>
</head>
<body class="bg-[#030712] text-slate-100 min-h-screen">
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside class="hidden md:flex flex-col w-64 bg-[#090d16] border-r border-[#1e293b] p-5">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-2 bg-indigo-600 rounded-lg text-white">
          <i data-lucide="sparkles" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Cosmic AI</h2>
          <p class="text-[10px] text-slate-500 font-mono text-xs">v3.5.0-beta</p>
        </div>
      </div>

      <nav class="flex-1 space-y-1">
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 bg-[#1e1b4b] text-indigo-400 rounded-lg text-sm font-medium">
          <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Overview
        </a>
        <a href="#" onclick="alert('Demo Action: Directing to Analytics section')" class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-sm transition font-medium">
          <i data-lucide="bar-chart-3" class="w-4 h-4"></i> Analytics
        </a>
        <a href="#" onclick="alert('Demo Action: Directing to Customers section')" class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-sm transition font-medium">
          <i data-lucide="users" class="w-4 h-4"></i> Customers
        </a>
        <a href="#" onclick="alert('Demo Action: Directing to Server Clusters')" class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-sm transition font-medium">
          <i data-lucide="server" class="w-4 h-4"></i> Deployments
        </a>
        <a href="#" onclick="alert('Demo Action: Directing to Settings')" class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg text-sm transition font-medium">
          <i data-lucide="settings" class="w-4 h-4"></i> Settings
        </a>
      </nav>

      <div class="mt-auto bg-gradient-to-br from-indigo-950/40 to-slate-900/40 p-4 rounded-xl border border-indigo-500/20">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span class="text-xs font-mono font-medium text-slate-300">All Nodes Secure</span>
        </div>
        <p class="text-[11px] text-slate-500">Resource ingestion rates are nominal across 18 edge systems.</p>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-[#0e131f] to-[#030712] relative">
      <!-- Navbar -->
      <header class="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#090d16]/70 backdrop-blur">
        <div class="flex items-center gap-4">
          <span class="md:hidden p-2 bg-slate-900 rounded text-slate-100" onclick="alert('Toggle Sidebar Menu')">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </span>
          <h1 class="text-xl font-semibold tracking-tight">Overview Dashboard</h1>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative hidden sm:block">
            <input type="text" placeholder="Search clusters..." class="w-60 bg-[#121824] text-slate-300 placeholder-slate-500 text-xs rounded-lg px-3 py-2 pl-9 border border-[#1e293b] focus:outline-none focus:border-indigo-500 transition">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5"></i>
          </div>

          <button onclick="toggleAlertCenter()" class="relative p-2 text-slate-400 hover:text-white transition">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
          </button>

          <div class="flex items-center gap-2.5 pl-3 border-l border-[#1e293b]">
            <img class="w-8 h-8 rounded-full border border-indigo-500/30" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="Profile">
            <span class="hidden lg:block text-xs font-medium text-slate-300">Amara Sterling</span>
          </div>
        </div>
      </header>

      <!-- Dashboard Elements -->
      <div class="p-6 space-y-6">
        <!-- Interactive Alert Info Pop -->
        <div id="demo-alert-box" class="hidden flex items-start gap-4 p-4 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-slate-200">
          <i data-lucide="sparkles" class="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 animate-bounce"></i>
          <div class="flex-1">
            <p class="text-xs font-medium text-slate-100">AI Optimization Node Active</p>
            <p class="text-[11px] text-slate-400">Your visual layout has compiled cleanly. The responsive scaling heuristics verified optimal styling across Desktop and iPhone viewports.</p>
          </div>
          <button onclick="toggleAlertCenter()" class="text-slate-400 hover:text-white font-semibold text-xs">&times;</button>
        </div>

        <!-- Metrics Grid -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-[#090d16] border border-[#1e293b] p-5 rounded-xl transition hover:border-slate-700">
            <div class="flex justify-between items-start mb-3">
              <span class="text-slate-400 text-xs tracking-wider uppercase font-medium">Memory Cache</span>
              <span class="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1 font-mono">
                <i data-lucide="trending-up" class="w-3 h-3"></i> +12%
              </span>
            </div>
            <p class="text-3xl font-bold tracking-tight">84.2<span class="text-lg text-slate-500">%</span></p>
            <p class="text-[11px] font-mono text-slate-500 mt-2">Allocated: 12.8 GB / 16 GB</p>
          </div>

          <div class="bg-[#090d16] border border-[#1e293b] p-5 rounded-xl transition hover:border-slate-700">
            <div class="flex justify-between items-start mb-3">
              <span class="text-slate-400 text-xs tracking-wider uppercase font-medium">Request Bandwidth</span>
              <span class="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1 font-mono">
                <i data-lucide="trending-up" class="w-3 h-3"></i> +4.2%
              </span>
            </div>
            <p class="text-3xl font-bold tracking-tight">410.8<span class="text-lg text-slate-500"> GB</span></p>
            <p class="text-[11px] font-mono text-slate-500 mt-2">Active ingress streams</p>
          </div>

          <div class="bg-[#090d16] border border-[#1e293b] p-5 rounded-xl transition hover:border-slate-700">
            <div class="flex justify-between items-start mb-3">
              <span class="text-slate-400 text-xs tracking-wider uppercase font-medium">Cluster Response</span>
              <span class="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-semibold flex items-center gap-1 font-mono">
                <i data-lucide="sparkles" class="w-3 h-3"></i> Nominal
              </span>
            </div>
            <p class="text-3xl font-bold tracking-tight">38<span class="text-lg text-slate-500"> ms</span></p>
            <p class="text-[11px] font-mono text-slate-500 mt-2">Ping: Europe-Central edge</p>
          </div>

          <div class="bg-[#090d16] border border-[#1e293b] p-5 rounded-xl transition hover:border-slate-700">
            <div class="flex justify-between items-start mb-3">
              <span class="text-slate-400 text-xs tracking-wider uppercase font-medium">Core API Status</span>
              <span class="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-semibold tracking-wide font-mono">
                ONLINE
              </span>
            </div>
            <p class="text-3xl font-bold tracking-tight">99.99<span class="text-lg text-slate-500">%</span></p>
            <p class="text-[11px] font-mono text-slate-500 mt-2">SLO SLA Compliant</p>
          </div>
        </section>

        <!-- Charts & Activity Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Visual Chart Card -->
          <div class="sky-chart bg-[#090d16] border border-[#1e293b] rounded-xl p-5 lg:col-span-2">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="font-semibold text-sm">System Capacity Ingestion Rate</h3>
                <p class="text-xs text-slate-500">Real-time telemetry distribution</p>
              </div>
              <div class="flex gap-2">
                <button onclick="setChartType('real')" class="px-2.5 py-1 text-[11px] bg-[#1e1b4b] text-indigo-300 border border-indigo-500/30 rounded font-medium">Direct</button>
                <button onclick="setChartType('avg')" class="px-2.5 py-1 text-[11px] bg-[#121824] text-slate-400 border border-[#1e293b] rounded font-medium hover:text-white">Average</button>
              </div>
            </div>

            <!-- Pre-baked SVG Telemetry Graph -->
            <div class="h-44 flex items-end gap-2 relative border-b border-[#1e293b] pb-2 font-mono">
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-1" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-28 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Mon</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-2" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-36 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Tue</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-3" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-20 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Wed</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-4" class="w-full bg-gradient-to-t from-indigo-900 to-purple-500 rounded-t h-32 hover:brightness-125 transition-all animate-pulse"></div>
                <span class="text-[10px] text-slate-400 mt-2">Thu</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-5" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-14 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Fri</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-6" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-24 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Sat</span>
              </div>
              <div class="flex-1 flex flex-col items-center">
                <div id="bar-7" class="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t h-40 hover:brightness-125 transition-all"></div>
                <span class="text-[10px] text-slate-400 mt-2">Sun</span>
              </div>
            </div>
          </div>

          <!-- Transaction List Card -->
          <div class="bg-[#090d16] border border-[#1e293b] rounded-xl p-5">
            <h3 class="font-semibold text-sm mb-4">Ingress Activity Logs</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs font-medium">Node Frankfurt #4 Connected</p>
                  <p class="text-[10px] text-slate-500 font-mono">1.1.8.214</p>
                </div>
                <span class="text-xs text-slate-400 font-mono">Just Now</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs font-medium">Cache Eviction Rate High</p>
                  <p class="text-[10px] text-slate-500 font-mono">RAM over 80%</p>
                </div>
                <span class="text-xs text-slate-400 font-mono">4m ago</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs font-medium">Job Build Completed</p>
                  <p class="text-[10px] text-slate-500 font-mono">commit #28fca1</p>
                </div>
                <span class="text-xs text-slate-400 font-mono">2h ago</span>
              </div>
            </div>
            <button onclick="alert('Demo Action: Directing to Core Logs Audit trail')" class="w-full mt-4 py-1.5 text-center bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium transition">
              Audit Logs Audit
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    // Initialize Lucide Icons on target UI
    lucide.createIcons();

    function toggleAlertCenter() {
      const alertBox = document.getElementById('demo-alert-box');
      alertBox.classList.toggle('hidden');
    }

    function setChartType(type) {
      if (type === 'real') {
        document.getElementById('bar-1').style.height = '112px';
        document.getElementById('bar-2').style.height = '144px';
        document.getElementById('bar-3').style.height = '80px';
        document.getElementById('bar-4').style.height = '128px';
        document.getElementById('bar-5').style.height = '56px';
        document.getElementById('bar-6').style.height = '96px';
        document.getElementById('bar-7').style.height = '160px';
      } else {
        document.getElementById('bar-1').style.height = '120px';
        document.getElementById('bar-2').style.height = '120px';
        document.getElementById('bar-3').style.height = '120px';
        document.getElementById('bar-4').style.height = '120px';
        document.getElementById('bar-5').style.height = '120px';
        document.getElementById('bar-6').style.height = '120px';
        document.getElementById('bar-7').style.height = '120px';
      }
    }
  </script>
</body>
</html>`,
      analysis: {
        layoutStyle: "Multi-column Flexbox layout with side routing utilities paired with adaptive responsive grid metrics.",
        colors: ["#030712 (Dark Gray)", "#090d16 (Jet Black)", "#6366f1 (Indigo Key Accent)", "#10b981 (Emerald Green)"],
        typography: "Outfit Google Web Font (clean, high scale display metrics) matched with rigid JetBrains Mono sizes.",
        keyComponents: [
          "Responsive Edge Ingestion sidebar navigation",
          "Quad core server metric KPI indicators",
          "SVG Direct Ingress real-time system performance analytics chart",
          "Automated log monitor events sidebar panel",
          "User notification dynamic system alerts"
        ]
      }
    }
  },
  {
    id: "sign-in-modal",
    title: "Minimal Auth Screen",
    category: "Forms & Controls",
    difficulty: "Simple",
    thumbnail: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    description: "An elegant, cozy, and high-fashion onboarding screen highlighting rounded form fields, Google SSO connectors, dynamic security validations, and aesthetic spacing details.",
    userPrompt: "Create a modern organic warm-gradient visual authentication dialog with tabs for Sign Up and Sign In.",
    result: {
      html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Authentication</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    h1, h2 {
      font-family: 'Playfair Display', serif;
    }
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="bg-gradient-to-tr from-[#fbf8f3] via-[#f7ebd9] to-[#ebd2be] min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-orange-500/5">
    <!-- Header Logo -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center p-3 bg-amber-150/10 text-amber-900 bg-amber-500/10 rounded-2xl mb-3">
        <i data-lucide="compass" class="w-7 h-7 text-amber-700"></i>
      </div>
      <h1 class="text-3xl font-semibold tracking-tight text-stone-900 leading-tight">Begin your adventure</h1>
      <p class="text-xs text-stone-500 mt-1">Select your path to continue the journey</p>
    </div>

    <!-- Switch Tab Navigation -->
    <div class="flex bg-stone-100/80 p-1.5 rounded-2xl mb-6 border border-stone-200/50">
      <button onclick="switchTab('signin')" id="tab-signin" class="flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-900 bg-white shadow-sm transition">Sign In</button>
      <button onclick="switchTab('signup')" id="tab-signup" class="flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-500 hover:text-stone-900 transition">Create Account</button>
    </div>

    <!-- SSO Connections -->
    <div class="space-y-2.5 mb-6">
      <button onclick="alert('Auth Proxy: Connecting via Google Auth Flow')" class="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium py-3 px-4 border border-stone-200 rounded-xl transition duration-200">
        <svg class="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.86-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.125C18.23 1.944 15.441 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.737-.08-1.302-.177-1.78l-10.616-.215z"/>
        </svg>
        Sign in with Google API
      </button>

      <button onclick="alert('Auth Proxy: Connecting via Apple Auth')" class="w-full flex items-center justify-center gap-3 bg-stone-900 hover:bg-black text-white text-xs font-medium py-3 px-4 rounded-xl transition duration-200">
        <i data-lucide="apple" class="w-4 h-4"></i>
        Sign in with Apple Secure
      </button>
    </div>

    <!-- Separator -->
    <div class="flex items-center gap-3 mb-6">
      <hr class="flex-1 border-stone-200">
      <span class="text-[10px] text-stone-400 font-mono tracking-wider uppercase">or input criteria</span>
      <hr class="flex-1 border-stone-200">
    </div>

    <!-- Target Form -->
    <form id="auth-form" onsubmit="handleFormSubmit(event)" class="space-y-4">
      <!-- Input Email -->
      <div>
        <label class="block text-xs font-medium text-stone-700 mb-1" for="email">Email Address</label>
        <div class="relative">
          <input type="email" id="email" required placeholder="name@domain.com" class="w-full text-xs bg-white text-stone-900 border border-stone-200 hover:border-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl py-3 px-3.5 pl-10 transition">
          <i data-lucide="mail" class="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5"></i>
        </div>
      </div>

      <!-- Input Password -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="text-xs font-medium text-stone-700" id="label-password" for="password">Security Password</label>
          <a href="#" onclick="alert('Action: Redirect to forgotten password reset form')" class="text-[10px] font-medium text-amber-700 hover:underline">Forgot?</a>
        </div>
        <div class="relative">
          <input type="password" id="password" required placeholder="••••••••" class="w-full text-xs bg-white text-stone-900 border border-stone-200 hover:border-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl py-3 px-3.5 pl-10 pr-10 transition">
          <i data-lucide="lock" class="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5"></i>
          <button type="button" onclick="togglePasswordVisibility()" class="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition">
            <i id="password-hide-icon" data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Consent Checkbox -->
      <div class="flex items-center gap-2 pt-1">
        <input type="checkbox" id="terms" required class="w-4 h-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded">
        <label for="terms" class="text-[11px] text-stone-500 leading-none">I accept the standard user privacy terms of data service</label>
      </div>

      <!-- Submit Action -->
      <button type="submit" id="submit-btn" class="w-full mt-2 font-semibold bg-[#b45309] hover:bg-[#92400e] text-white text-xs py-3 rounded-xl transition duration-200 shadow-md shadow-amber-900/10 flex items-center justify-center gap-2">
        <i data-lucide="log-in" class="w-4 h-4"></i>
        <span id="submit-txt">Access App Dashboard</span>
      </button>
    </form>
  </div>

  <script>
    lucide.createIcons();

    let currentMode = "signin";

    function switchTab(mode) {
      currentMode = mode;
      const tIn = document.getElementById('tab-signin');
      const tUp = document.getElementById('tab-signup');
      const submitText = document.getElementById('submit-txt');

      if (mode === 'signin') {
        tIn.className = "flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-900 bg-white shadow-sm transition";
        tUp.className = "flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-500 hover:text-stone-900 transition";
        submitText.textContent = "Access App Dashboard";
      } else {
        tUp.className = "flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-900 bg-white shadow-sm transition";
        tIn.className = "flex-1 text-center py-2 text-xs font-semibold rounded-xl text-stone-500 hover:text-stone-900 transition";
        submitText.textContent = "Create New Account Now";
      }
    }

    function togglePasswordVisibility() {
      const pField = document.getElementById('password');
      const icon = document.getElementById('password-hide-icon');

      if (pField.type === 'password') {
        pField.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
      } else {
        pField.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
      }
      lucide.createIcons();
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const submit = document.getElementById('submit-btn');
      const text = document.getElementById('submit-txt');
      
      submit.disabled = true;
      submit.className = "w-full mt-2 font-semibold bg-stone-500 text-white text-xs py-3 rounded-xl transition duration-200 cursor-not-allowed flex items-center justify-center gap-2";
      text.textContent = "Authenticating identity...";

      setTimeout(() => {
        alert("Demo Message: Welcome back! Authenticated successfully " + (currentMode === "signin" ? "(User Session loaded)" : "(New account constructed)"));
        submit.disabled = false;
        submit.className = "w-full mt-2 font-semibold bg-[#b45309] hover:bg-[#92400e] text-white text-xs py-3 rounded-xl transition duration-200 shadow-md shadow-amber-900/10 flex items-center justify-center gap-2";
        text.textContent = currentMode === "signin" ? "Access App Dashboard" : "Create New Account Now";
      }, 1500);
    }
  </script>
</body>
</html>`,
      analysis: {
        layoutStyle: "Single-card container perfectly centered in screen using viewport height Flex direction.",
        colors: ["#FFFDF9 (Warm Parchment BG)", "#111827 (Granite Black Headings)", "#B45309 (Warm Amber Theme CTA)"],
        typography: "Playfair Display Serif for dynamic Display Headers combined with high-contrast Inter Sans weight criteria.",
        keyComponents: [
          "SSO Authorization Quick OAuth Launchpad buttons",
          "Sign Up / Sign In tab modular toggle switch widget",
          "Email and lock input components with inline helper icons",
          "Vanilla security password visibility toggle handler",
          "Responsive active loader form submit process control"
        ]
      }
    }
  },
  {
    id: "product-swiss",
    title: "E-Commerce Card",
    category: "Detail & Marketing Panels",
    difficulty: "Medium",
    thumbnail: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    description: "A premium product detail card styled with a clinical, minimalistic Swiss design aesthetic. Includes modular thumbnail panels, interactive color choosing swatches, collapsible accordion review segments, and a floating purchase tray.",
    userPrompt: "Recompile a Swiss-inspired product feature grid card with detailed color selectors, pricing lines, and custom accordion interactions.",
    result: {
      html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minimal Headphone Detail</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
    h1, h2, h3, .heading-swiss {
      font-family: 'Space Grotesk', sans-serif;
    }
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 min-h-screen flex items-center justify-center p-6 md:p-12">
  <div class="max-w-4xl bg-white border border-stone-200 shadow-md rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    <!-- Image Display panel -->
    <div class="bg-stone-100 p-8 flex flex-col justify-between relative min-h-[300px] md:min-h-auto border-b md:border-b-0 md:border-r border-stone-200">
      <!-- Badge -->
      <span class="absolute top-6 left-6 bg-stone-900 text-stone-50 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded">NEW ARRIVAL</span>

      <!-- Product Center Asset Photo (Mock SVG illustration for beautiful presentation) -->
      <div class="flex-1 flex items-center justify-center py-6">
        <svg id="product_image" class="w-48 h-48 text-stone-800 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path id="headphone_band" class="text-stone-300 fill-stone-200 transition" d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      </div>

      <!-- Thumbnails -->
      <div class="flex gap-2 justify-center">
        <button onclick="changePhoto('graphite')" class="w-12 h-12 bg-white border border-stone-300 rounded hover:border-black p-1 transition">
          <div class="w-full h-full bg-stone-800 rounded-sm"></div>
        </button>
        <button onclick="changePhoto('alpine')" class="w-12 h-12 bg-white border border-stone-200 rounded hover:border-black p-1 transition">
          <div class="w-full h-full bg-slate-300 rounded-sm"></div>
        </button>
        <button onclick="changePhoto('aurora')" class="w-12 h-12 bg-white border border-stone-200 rounded hover:border-black p-1 transition">
          <div class="w-full h-full bg-emerald-900 rounded-sm"></div>
        </button>
      </div>
    </div>

    <!-- Product Text Criteria details -->
    <div class="p-8 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs text-stone-500 font-mono tracking-wide uppercase">OVER-EAR PRESETS</span>
          <!-- Rating -->
          <span class="flex items-center gap-1 text-xs font-semibold text-stone-800 bg-stone-100 rounded-full px-2 py-0.5"><i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>4.9</span>
        </div>
        
        <h1 class="text-3xl font-semibold tracking-tight uppercase leading-none mb-1">AURA ONE HEADSET</h1>
        <p class="text-2xl font-mono text-stone-500 mb-6">$299.00</p>

        <!-- Product description -->
        <p class="text-xs text-stone-600 leading-relaxed mb-6">Ultra-minimal, active noise-cancelling headphones featuring acoustic neutral design, fully adaptive memory foam cups, and continuous 45-hour playback.</p>

        <!-- Color Choice selector swatches -->
        <div class="mb-6">
          <span class="block text-xs font-mono font-medium text-stone-500 uppercase tracking-wider mb-2">Select Finishes: <span id="color_label" class="text-stone-900 font-bold">Graphite</span></span>
          <div class="flex gap-2.5">
            <button onclick="changeColor('Graphite', '#18181b')" class="w-6 h-6 rounded-full bg-stone-900 ring-2 ring-offset-2 ring-stone-900 focus:outline-none transition"></button>
            <button onclick="changeColor('Alpine White', '#cbd5e1')" class="w-6 h-6 rounded-full bg-slate-300 hover:ring-2 hover:ring-offset-2 hover:ring-stone-400 focus:outline-none transition"></button>
            <button onclick="changeColor('Aurora Sage', '#064e3b')" class="w-6 h-6 rounded-full bg-emerald-900 hover:ring-2 hover:ring-offset-2 hover:ring-stone-400 focus:outline-none transition"></button>
          </div>
        </div>

        <!-- Spec Accordion -->
        <div class="border-t border-stone-200 mt-6 pt-4 space-y-3">
          <div class="border-b border-stone-100 pb-3">
            <button onclick="toggleSpec()" class="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-900 transition">
              <span>Technical Aspects</span>
              <i id="accordion_icon" data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
            </button>
            <div id="spec_content" class="hidden text-xs text-stone-500 mt-2 space-y-1 bg-stone-50 p-2.5 rounded border border-stone-100">
              <p>• ANC: Hybrid Active Noise Cancelling 40dB reduction</p>
              <p>• Bluetooth 5.3 + Custom LDAC audio codec</p>
              <p>• Core Transducers: Dual custom 40mm bio-cellulose drivers</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Purchase buttons -->
      <div class="mt-8 space-y-2">
        <button id="cart_btn" onclick="addToCart()" class="w-full text-center bg-stone-950 hover:bg-stone-800 text-stone-50 font-bold tracking-wide uppercase text-xs py-3.5 rounded-lg transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart Bag
        </button>
        <button onclick="alert('Demo Action: Continuing straight to Checkout panel')" class="w-full text-center bg-white border border-stone-300 hover:border-black text-stone-900 hover:text-black font-bold tracking-wide uppercase text-xs py-3.5 rounded-lg transition">
          Direct Checkout Secure
        </button>
      </div>
    </div>
  </div>

  <script>
    lucide.createIcons();

    function changeColor(name, colorCode) {
      document.getElementById('color_label').textContent = name;
      
      const svg = document.getElementById('product_image');
      const band = document.getElementById('headphone_band');
      
      // Animate active state colors
      if (name.includes('Alpine')) {
        svg.style.color = '#475569';
        band.setAttribute('fill', '#cbd5e1');
      } else if (name.includes('Aurora')) {
        svg.style.color = '#065f46';
        band.setAttribute('fill', '#022c22');
      } else {
        svg.style.color = '#1c1917';
        band.setAttribute('fill', '#44403c');
      }
    }

    function changePhoto(type) {
      if (type === 'alpine') {
        changeColor('Alpine White', '#cbd5e1');
      } else if (type === 'aurora') {
        changeColor('Aurora Sage', '#064e3b');
      } else {
        changeColor('Graphite', '#18181b');
      }
    }

    function toggleSpec() {
      const spec = document.getElementById('spec_content');
      const icon = document.getElementById('accordion_icon');
      
      spec.classList.toggle('hidden');
      if (spec.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'chevron-down');
      } else {
        icon.setAttribute('data-lucide', 'chevron-up');
      }
      lucide.createIcons();
    }

    function addToCart() {
      const cartBtn = document.getElementById('cart_btn');
      cartBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Loading...';
      cartBtn.disabled = true;
      lucide.createIcons();

      setTimeout(() => {
        cartBtn.innerHTML = '<i data-lucide="badge-check" class="w-4 h-4 text-emerald-300"></i> Added to Bag!';
        lucide.createIcons();
        setTimeout(() => {
          cartBtn.innerHTML = '<i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart Bag';
          cartBtn.disabled = false;
          lucide.createIcons();
        }, 2000);
      }, 1000);
    }
  </script>
</body>
</html>`,
      analysis: {
        layoutStyle: "Standard 2-panel symmetrical grid utilizing flex direction responsive transitions.",
        colors: ["#FFFFFF (Pure Alpine Card)", "#18181B (Zinc Dark Text)", "#059669 (Emerald Sage Focus Color)"],
        typography: "Space Grotesk technical typography display metrics alongside Inter swiss body sizes.",
        keyComponents: [
          "Interactive split responsive product layout display cover",
          "Mock SVG wireframe customizable aesthetic active color swatches",
          "Collapsible Technical specifications disclosure widget accordion",
          "Fluid rating validation and review systems",
          "Micro-animation active loaders and Add to Cart bag statuses"
        ]
      }
    }
  },
  {
    id: "motion-playground",
    title: "Interactive Motion Hub",
    category: "Micro-interactions & UX",
    difficulty: "Medium",
    thumbnail: "M13 10V3L4 14h7v7l9-11h-7z",
    description: "An elegant interactive motion sandbox enabling developers to test and tweak spring kinematics, staggered entrances, 3D tilt effects, magnetic buttons, and copy-ready dynamic CSS layouts.",
    userPrompt: "Create a highly interactive modular motion sandbox showcasing real-time physics spring controls, staggered cards with delay triggers, ripple effects, and dynamic code generation.",
    result: {
      html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Motion Sandbox & Micro-interactions</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    body {
      font-family: 'Space Grotesk', sans-serif;
    }
    .font-mono-custom {
      font-family: 'JetBrains Mono', monospace;
    }
    
    /* Dynamic customized transition variables mapped in real-time */
    :root {
      --spring-duration: 0.5s;
      --spring-bounce: 0.45;
      --spring-stiffness: 180;
    }

    /* Spring effect matching customized curves */
    .spring-box-transition {
      transition: transform var(--spring-duration) cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
    }

    /* Interactive tilt container metrics */
    .tilt-card {
      transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
      transform-style: preserve-3d;
    }

    /* Ripple custom styling */
    .ripple-btn {
      position: relative;
      overflow: hidden;
    }
    .ripple-wave {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.45);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    /* Smooth loader staggered effects */
    @keyframes staggeredReveal {
      from {
        opacity: 0;
        transform: translateY(24px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .stagger-item {
      opacity: 0;
      animation: staggeredReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-8">
  <div class="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
    
    <!-- Design & Physics Controls Left Column -->
    <aside class="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between gap-6 shrink-0 bg-slate-900/95">
      <div>
        <div class="flex items-center gap-2.5 mb-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <i data-lucide="zap" class="w-4 h-4 animate-pulse"></i>
          </div>
          <div>
            <h2 class="text-sm font-bold tracking-tight text-white uppercase">Heuristics Lab</h2>
            <p class="text-[11px] text-slate-400">Physics Kinematic Customizer</p>
          </div>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed mb-6">
          Modify spring kinetics in real-time. Witness how physical properties affect micro-interactions inside live layout canvases.
        </p>

        <!-- Variable Range Controllers -->
        <div class="space-y-5">
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[11px] font-mono-custom text-indigo-300 uppercase font-semibold">Transition Velocity</label>
              <span id="label-duration" class="text-[11px] font-mono-custom text-slate-400">0.5s</span>
            </div>
            <input 
              type="range" 
              id="slider-duration" 
              min="0.1" 
              max="2.0" 
              step="0.05" 
              value="0.5" 
              class="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
              oninput="updatePhysicsVariables()"
            >
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[11px] font-mono-custom text-indigo-300 uppercase font-semibold">Tension & Elasticity</label>
              <span id="label-stiffness" class="text-[11px] font-mono-custom text-slate-400">180</span>
            </div>
            <input 
              type="range" 
              id="slider-stiffness" 
              min="50" 
              max="400" 
              step="10" 
              value="180" 
              class="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
              oninput="updatePhysicsVariables()"
            >
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[11px] font-mono-custom text-indigo-300 uppercase font-semibold">Spring Bounce Damping</label>
              <span id="label-bounce" class="text-[11px] font-mono-custom text-slate-400">0.45</span>
            </div>
            <input 
              type="range" 
              id="slider-bounce" 
              min="0.1" 
              max="0.9" 
              step="0.05" 
              value="0.45" 
              class="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
              oninput="updatePhysicsVariables()"
            >
          </div>
        </div>
      </div>

      <!-- Quick Codes Snippet Showcase -->
      <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[9px] font-mono-custom text-amber-400 font-bold uppercase">Dynamic CSS Formula</span>
          <button onclick="copyCSSFormula()" class="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition">
            <i data-lucide="copy" class="w-3 h-3"></i> Copy
          </button>
        </div>
        <textarea 
          id="css-formula" 
          readonly 
          class="w-full bg-transparent font-mono-custom text-[10px] text-emerald-400 outline-none resize-none h-14 leading-normal select-all select-none"
        >.spring-element {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}</textarea>
      </div>
    </aside>

    <!-- Canvas Preview Center Grid -->
    <main class="flex-1 p-6 flex flex-col justify-between min-h-[500px]">
      
      <!-- Top Section: Visual Interaction Tabs -->
      <div>
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 class="text-xl font-bold tracking-tight text-white">Motion Sandbox</h1>
            <p class="text-xs text-slate-400">Micro-feedback active demo modules</p>
          </div>
          
          <!-- Mode Selector Switches -->
          <div class="flex bg-slate-950 p-1 rounded-xl border border-slate-800 items-center">
            <button onclick="switchTab('spring')" id="t-spring" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 transition">Spring Demo</button>
            <button onclick="switchTab('stagger')" id="t-stagger" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition">Stagger Sequences</button>
            <button onclick="switchTab('tilt')" id="t-tilt" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition">3D Elastic Tilt</button>
          </div>
        </div>

        <!-- STATION 1: Physical Elastic Spring Box Simulator -->
        <section id="pane-spring" class="space-y-6">
          <div class="p-8 bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center relative min-h-[250px] overflow-hidden">
            <div id="target-spring" class="spring-box-transition w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20 cursor-pointer uppercase select-none active:scale-90" title="Click to trigger dynamic micro-bounce">
              Box Element
            </div>
            
            <p class="text-[10px] font-mono-custom text-slate-500 mt-6 select-none">
              Hover, click or press trigger button below to test spring kinetics
            </p>
          </div>
          
          <div class="flex gap-3 justify-center">
            <button onclick="runTriggerAnim('ping')" class="ripple-btn px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition select-none">
              <i data-lucide="play" class="w-3.5 h-3.5"></i> Bounce Impact
            </button>
            <button onclick="runTriggerAnim('rotate')" class="ripple-btn px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition select-none">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Elastic Rotate 180°
            </button>
            <button onclick="runTriggerAnim('scale')" class="ripple-btn px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition select-none">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> Pump Pulse
            </button>
          </div>
        </section>

        <!-- STATION 2: Sequenced Stagger List Items Grid -->
        <section id="pane-stagger" class="hidden space-y-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase font-bold tracking-wider text-indigo-400 font-mono-custom">Dynamic Sequencing Queue</span>
            <button onclick="refreshStaggerSequence()" class="p-1 px-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition">
              <i data-lucide="refresh-cw" class="w-3 h-3"></i> Sync Restagger
            </button>
          </div>
          
          <div id="stagger-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Dynamic items generated in JS with incremental transition delays -->
          </div>
        </section>

        <!-- STATION 3: 3D Interactive Card Tilt Deck -->
        <section id="pane-tilt" class="hidden space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <!-- Left Tilt Card Element -->
            <div id="card1" class="tilt-card p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0e172a] rounded-2xl border border-slate-800 min-h-[220px] flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 cursor-pointer shadow-lg">
              <div class="flex justify-between items-start">
                <div class="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                  <i data-lucide="compass" class="w-5 h-5"></i>
                </div>
                <span class="text-[9px] font-mono-custom text-slate-500 uppercase">Interactive Device</span>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white tracking-tight leading-snug">Spatial Heuristics Compass</h3>
                <p class="text-[11px] text-slate-400 mt-1">Gently wave your pointer over this card to witness real dynamic isometric 3D tilting math.</p>
              </div>
            </div>

            <!-- Right Tilt Card Element -->
            <div id="card2" class="tilt-card p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0c1a1e] rounded-2xl border border-slate-800 min-h-[220px] flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 cursor-pointer shadow-lg">
              <div class="flex justify-between items-start">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <i data-lucide="globe" class="w-5 h-5"></i>
                </div>
                <span class="text-[9px] font-mono-custom text-slate-500 uppercase">Symmetric Gyro</span>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white tracking-tight leading-snug">Continuous Horizon Matrix</h3>
                <p class="text-[11px] text-slate-400 mt-1">Tilting operates inside standard device frames natively using fluid mouse angle equations.</p>
              </div>
            </div>

          </div>
          
          <p class="text-[10px] text-center text-slate-500 font-mono-custom">
            Card coordinates recalculate based on center pixel alignment coordinates
          </p>
        </section>
      </div>

      <!-- Action Button Ripple Sandbox Frame -->
      <footer class="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div>
          <span class="block text-xs font-semibold text-slate-400">Micro-Action Checkpoint</span>
          <span class="text-[10px] text-slate-500 mt-0.5 block leading-normal">Interactive button clicks spawn custom velocity ripples</span>
        </div>
        
        <div class="flex items-center gap-2">
          <button onclick="triggerFeedback('info')" class="ripple-btn px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5">
            <i data-lucide="bell" class="w-3.5 h-3.5"></i> Click Alert Ripple
          </button>
          <button onclick="triggerFeedback('pulse')" class="ripple-btn px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Spark Ripple
          </button>
        </div>
      </footer>
    </main>
  </div>

  <script>
    lucide.createIcons();

    // Standard Animation States Storage
    let currentTab = "spring";
    let isTransitioningNow = false;

    // List of dynamic stagger presets
    const staggerPresets = [
      { id: 1, title: "Sensor Node Alpha", subtitle: "Active ping rate", value: "84.2 ms", icon: "activity", col: "emerald" },
      { id: 2, title: "Cache Eviction Pool", subtitle: "Garbage collection", value: "Level 4", icon: "trash-2", col: "amber" },
      { id: 3, title: "Deployments Pipeline", subtitle: "Continuous Integration", value: "CI Active", icon: "server", col: "indigo" },
      { id: 4, title: "Symmetric Encryption", subtitle: "AES-256 validation", value: "Verified", icon: "shield-check", col: "cyan" },
      { id: 5, title: "Horizon Registry", subtitle: "Multi-cluster mapping", value: "Linked", icon: "network", col: "teal" },
      { id: 6, title: "Telemetry Analytics", subtitle: "System capacity matrix", value: "Nominal", icon: "sparkles", col: "fuchsia" }
    ];

    // Compute active spring kinematics from UI input settings
    function updatePhysicsVariables() {
      const duration = document.getElementById("slider-duration").value;
      const stiffness = document.getElementById("slider-stiffness").value;
      const bounce = document.getElementById("slider-bounce").value;

      // Map slider parameters back onto interface DOM labels
      document.getElementById("label-duration").textContent = duration + "s";
      document.getElementById("label-stiffness").textContent = stiffness;
      document.getElementById("label-bounce").textContent = bounce;

      // Inject dynamically tuned CSS properties into document stylesheet values
      document.documentElement.style.setProperty('--spring-duration', duration + 's');
      document.documentElement.style.setProperty('--spring-stiffness', stiffness);
      document.documentElement.style.setProperty('--spring-bounce', bounce);

      // Compose bezier approximation of customized spring settings
      const computedBezier = calculateBezierValue(parseFloat(stiffness), parseFloat(bounce));
      
      const formulaArea = document.getElementById("css-formula");
      formulaArea.textContent = ".spring-element {\n  transition: transform " + duration + "s cubic-bezier(" + computedBezier + ");\n}";
    }

    // Mathematical approximation for bezier curves representing different spring limits
    function calculateBezierValue(stiffness, bounce) {
      const x1 = (0.2 + (stiffness / 400) * 0.14).toFixed(2);
      const y1 = (1.2 + bounce * 0.5).toFixed(2);
      const x2 = (0.6 - (stiffness / 400) * 0.1).toFixed(2);
      return x1 + ", " + y1 + ", " + x2 + ", 1";
    }

    // Switch active display module panel tab sets
    function switchTab(tabId) {
      currentTab = tabId;
      const tabs = ["spring", "stagger", "tilt"];
      
      tabs.forEach(t => {
        const pane = document.getElementById("pane-" + t);
        const btn = document.getElementById("t-" + t);
        if (t === tabId) {
          pane.classList.remove("hidden");
          btn.className = "px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 transition";
        } else {
          pane.classList.add("hidden");
          btn.className = "px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition";
        }
      });

      if (tabId === "stagger") {
        refreshStaggerSequence();
      }
    }

    // Launch targeted animations on physical sandbox simulator box
    function runTriggerAnim(style) {
      const target = document.getElementById("target-spring");
      if (isTransitioningNow) return;
      isTransitioningNow = true;

      if (style === "ping") {
        target.style.transform = "scale(1.23) translateY(-12px)";
        setTimeout(() => {
          target.style.transform = "scale(1) translateY(0)";
          isTransitioningNow = false;
        }, parseFloat(document.getElementById("slider-duration").value) * 1000);
      } else if (style === "rotate") {
        target.style.transform = "rotate(180deg) scale(0.9)";
        setTimeout(() => {
          target.style.transform = "rotate(0deg) scale(1)";
          isTransitioningNow = false;
        }, parseFloat(document.getElementById("slider-duration").value) * 1000);
      } else if (style === "scale") {
        target.style.transform = "scale(0.8) skewX(-10deg)";
        setTimeout(() => {
          target.style.transform = "scale(1.15) skewX(5deg)";
          setTimeout(() => {
            target.style.transform = "scale(1) skewX(0deg)";
            isTransitioningNow = false;
          }, parseFloat(document.getElementById("slider-duration").value) * 500);
        }, parseFloat(document.getElementById("slider-duration").value) * 500);
      }
    }

    // Refresh dynamic staggered modules sequence list
    function refreshStaggerSequence() {
      const grid = document.getElementById("stagger-grid");
      grid.innerHTML = "";
      
      staggerPresets.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "stagger-item bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 relative hover:border-slate-700 transition duration-300";
        div.style.animationDelay = (index * 0.1) + "s";
        
        div.innerHTML = '<div class="flex items-center justify-between">' +
            '<div class="p-1.5 bg-' + item.col + '-500/10 text-' + item.col + '-400 rounded-lg text-[10px] w-7 h-7 flex items-center justify-center">' +
              '<i data-lucide="' + item.icon + '" class="w-4 h-4"></i>' +
            '</div>' +
            '<span class="text-[9px] font-mono-custom text-slate-500 uppercase font-bold text-slate-500">NODE #0' + item.id + '</span>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-xs font-semibold text-white">' + item.title + '</h4>' +
            '<span class="text-[10px] text-slate-400">' + item.subtitle + '</span>' +
          '</div>' +
          '<div class="mt-2 text-xs font-mono-custom text-emerald-400 font-bold bg-[#090d16] p-1.5 rounded text-center border border-slate-900">' + item.value + '</div>';
        grid.appendChild(div);
      });
      lucide.createIcons();
    }

    // Attach 3D dynamic cursor tilting parameters
    function setupTiltEvents(elementId) {
      const card = document.getElementById(elementId);
      
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        
        // Tilt intensity parameters
        const tiltX = -((rect.height / 2 - y) / midY) * 12;
        const tiltY = ((rect.width / 2 - x) / midX) * 12;
        
        card.style.transform = "perspective(500px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) scale3d(1.02, 1.02, 1.02)";
        card.style.boxShadow = "0 20px 30px rgba(0,0,0,0.5)";
      });
      
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        card.style.boxShadow = "none";
      });
    }

    setupTiltEvents("card1");
    setupTiltEvents("card2");

    // Dynamic Ripple Spawning Click Listener 
    document.addEventListener("click", e => {
      const btn = e.target.closest(".ripple-btn");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const d = Math.max(rect.width, rect.height);

      circle.style.width = circle.style.height = d + 'px';
      circle.style.left = e.clientX - rect.left - d/2 + 'px';
      circle.style.top = e.clientY - rect.top - d/2 + 'px';
      circle.classList.add("ripple-wave");

      btn.appendChild(circle);
      setTimeout(() => {
        circle.remove();
      }, 600);
    });

    function triggerFeedback(type) {
      if (type === 'info') {
        alert("Micro-interaction Active Feed: Dynamic push event generated inside sandboxed animation frame router.");
      } else {
        alert("Spark Event Triggered: High velocity ripple simulated on physical device nodes.");
      }
    }

    function copyCSSFormula() {
      const copyText = document.getElementById("css-formula");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      alert("Successful: Physics CSS formula copied to clipboard!");
    }

    // Boot Initialization parameters
    updatePhysicsVariables();
  </script>
</body>
</html>`,
      analysis: {
        layoutStyle: "Double segment panel layout integrating modular sidebar metrics control sliders and central viewport animation simulators.",
        colors: ["#020617 (Deep Slate Space)", "#6366F1 (Indigo Interactive Core)", "#10B981 (Active Ingress Emerald)"],
        typography: "Space Grotesk headers and buttons paired with Space-efficient Monospace system gauges.",
        keyComponents: [
          "Real-time dynamic physics spring tension & elastic kinetic ranges",
          "Tabbed display module selectors switching active testing suites",
          "Interactive physics responsive elastic custom action box",
          "Dynamic auto-incrementing sequencing grid list with customized offsets",
          "Spatial mathematical 3D cursor tilt containers with custom coordinates"
        ]
      }
    }
  }
];
