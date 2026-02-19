# Kinetix

Kinetix is an advanced educational platform aimed at making learning engaging through interactive components and a dedicated creative studio. It leverages the power of Astro, React, and modern web technologies to deliver a seamless and performant user experience.

## 🌟 Key Features

*   **Kinetix Studio**: A powerful in-browser content creation tool.
    *   **Layer-based Editing**: Manage scenes with a familiar layers panel.
    *   **Animated Components**: Drag-and-drop animated elements like Progress Bars, Typewriter Code blocks, and Counters.
    *   **Video Export**: Export your creations as WebM or MP4 videos directly from the browser (client-side rendering).
    *   **Real-time Preview**: Playback and scrub through your timeline.
*   **Education Hub**: A structured learning environment with courses and lessons.
*   **Interactive Blog**: Engaging content enhanced with custom components.
*   **Dark Mode**: Fully supported dark/light theme toggle.

## 🛠️ Tech Stack

*   **Framework**: [Astro](https://astro.build/) (v5)
*   **UI Library**: [React](https://react.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Nanostores](https://github.com/nanostores/nanostores)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Diagrams**: Mermaid, Markmap
*   **Video Export**: `html-to-image` + `downloadjs` + `canvas` recording techniques.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/kinetix.git
    cd kinetix
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:4321` in your browser.

## 🧞 Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 📂 Project Structure

```text
/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── studio/     # Studio-specific components (Layers, Sidebar, etc.)
│   │   └── ...
│   ├── content/        # Content collections (Blog, Education)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages (Routes)
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions and Studio Engine logic
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
