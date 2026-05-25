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

## 🔒 Security & Architecture

UICode is architected to prioritize server-side routing and client frame isolation:

- **Server-Side API Routing**: All interactions with the underlying models go through Express endpoints on the server. No client-side code exposes private configurations or API keys.
- **Aggressive Sandbox Constraints**: Code previews run in isolated sandboxes to protect client browser environments.
- **Fingerprinting Protection**: Express header headers are hardened natively to suppress internal software tracking signatures.

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

To run the production build locally:
```bash
npm start
```

---

## 📄 License
This codebase is distributed under the MIT Open Source License. Feel free to copy, modify, and distribute as you see fit!

