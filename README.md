# UICode ✨ — AI Screenshot-to-Code Converter

UICode is an open-source, modern web developer assistant that instantly translates mockups, screenshots, hand-drawn wireframes, or cropped UI elements into production-ready, interactive **HTML with Tailwind CSS** code with live preview sandboxes. Powered by Google **Gemini 3.5 Flash**.

---

## 🚀 Key Features

- **Strict Elements-Only Focus**: Precision cropping support! Translate individual widgets or buttons without bloating with unwanted site blueprints.
- **Live Sandboxed Preview**: Play, click, or hover immediately within a high-security virtual iframe container.
- **Design Spec Extraction**: Reads and parses color swatches, typography styles, layout constraints, and component trees.
- **Dynamic Interactivity Support**: Generates custom vanilla Javascript inline hooks and bindings using Lucide Icons to make elements interactive instantly.
- **Modern Responsive Design**: Fluid system dark/light modes and fully responsive grid controls.

---

## 🔒 Security Best Practices

Before hosting or publishing your own instance of UICode publicly or to GitHub, please read our security checklist:

### 1. **Server-Side Proxy Client Routing**
- All API interactions with the `Google Gemini SDK` are routed through a secure backend proxy server (`/api/generate` defined in `server.ts`).
- **CRITICAL Security Rule**: Your `GEMINI_API_KEY` is read strictly on the server-side (`process.env.GEMINI_API_KEY`). It is **NEVER** exposed to the browser console, network logs, or source maps.

### 2. **Environment Variable Security**
- Never commit your active keys to Git.
- Rename `.env.example` to `.env` and fill in your keys locally. `.env` is already configured in `.gitignore` to prevent leaks.
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. **Production Frame Isolation**
- The live preview canvas iframe is sandboxed aggressively in `App.tsx` matching standard security constraints:
  ```html
  <iframe
    sandbox="allow-scripts allow-modals allow-same-origin"
  />
  ```
- This allows script execution within the generated layout (necessary for components like sliders, dropdown toggles, and carousel scripts) while strictly forbidding parent frame clickjacking, top-level cookie access, or direct storage modifications on the host document.

### 4. **Header Mitigations**
- Express endpoint headers include standard modern headers to reduce malicious vector surfaces:
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing exploits).
  - `X-XSS-Protection: 1; mode=block` (mitigates cross-site scripting attacks).
  - `Referrer-Policy: strict-origin-when-cross-origin` (restricts referrer leakage).
  - Suppression of Express runtime identities such as `X-Powered-By`.

---

## 📊 Search Engine Optimization (SEO)

UICode is fully SEO optimized, compliant with Google crawlers and index structures:
- **Responsive Meta viewport**: Ensures mobile and desktop index friendliness.
- **Micro-Structured SEO Metas**: Integrated OpenGraph (OG) and Twitter meta-tags for polished previews on platforms like Slack, Discord, LinkedIn, and Facebook.
- **Inline SVG Favicons**: Renders immediate high-quality vector favicons natively without requiring external assets.
- **Index Rules (`robots.txt`)**: Set up to allow global discovery while avoiding crawling of direct dynamic model generation endpoints (`/api/*`).

---

## 🛠️ Local Development & Deployment

### Prerequisite Dependencies:
- Node.js LTS version (v18+)
- npm / yarn / pnpm

### 1. Installation
Clone this repository and install necessary node packages:
```bash
npm install
```

### 2. Run the Server Locally
To boot the full-stack development environment:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Production Build
Prepare the bundle assets for high-performance server hosting:
```bash
npm run build
```
This bundles the Express server file (`server.ts`) via `esbuild` seamlessly into CJS inside global build outputs keeping cold starts fast.

To run the production build locally:
```bash
npm start
```

---

## 📄 License
This codebase is distributed under the MIT Open Source License. Feel free to copy, modify, and distribute as you see fit!
