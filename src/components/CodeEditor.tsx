import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Copy, 
  Download,
  MoreHorizontal,
  Search,
  Replace,
  ZoomIn,
  ZoomOut
} from "lucide-react";

const mockCode = {
  "src/App.tsx": `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={\`App \${theme}\`}>
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        
        <h1>Welcome to Bolt.new Clone</h1>
        
        <p>
          This is a fully functional React application built with Vite.
        </p>
        
        <div className="counter-section">
          <button 
            onClick={() => setCount(count + 1)}
            className="counter-button"
            type="button"
          >
            Count: {count}
          </button>
          
          <button 
            onClick={() => setCount(0)}
            className="reset-button"
            type="button"
          >
            Reset
          </button>
        </div>
        
        <div className="theme-toggle">
          <button onClick={toggleTheme} className="theme-button">
            Switch to {theme === 'light' ? 'dark' : 'light'} theme
          </button>
        </div>
        
        <div className="links">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            Learn Vite
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;`,
  
  "src/main.tsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,

  "src/index.css": `body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.counter-button, .reset-button, .theme-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
  margin: 0.5em;
}

.counter-button:hover, .reset-button:hover, .theme-button:hover {
  border-color: #646cff;
}`,

  "package.json": `{
  "name": "bolt-new-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`
};

interface CodeEditorProps {
  selectedFile: string;
}

export const CodeEditor = ({ selectedFile }: CodeEditorProps) => {
  const [code, setCode] = useState("");
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    setCode(mockCode[selectedFile as keyof typeof mockCode] || "// File not found or empty");
  }, [selectedFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const getLanguageFromFile = (filename: string) => {
    const ext = filename.split('.').pop();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return 'typescript';
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'text';
    }
  };

  return (
    <div className="h-full bg-editor-background flex flex-col">
      {/* Editor Toolbar */}
      <div className="h-10 bg-editor-panel border-b border-editor-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{selectedFile}</span>
          <span className="text-xs text-muted-foreground">
            {getLanguageFromFile(selectedFile)}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Search className="w-3 h-3 mr-1" />
            Find
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Replace className="w-3 h-3 mr-1" />
            Replace
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            onClick={() => setFontSize(Math.max(10, fontSize - 1))}
          >
            <ZoomOut className="w-3 h-3" />
          </Button>
          <span className="text-xs text-muted-foreground px-1">{fontSize}px</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            onClick={() => setFontSize(Math.min(24, fontSize + 1))}
          >
            <ZoomIn className="w-3 h-3" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleCopy}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Download className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <pre 
            className="text-foreground font-mono leading-relaxed whitespace-pre-wrap"
            style={{ fontSize: `${fontSize}px` }}
          >
            <code className={`language-${getLanguageFromFile(selectedFile)}`}>
              {code}
            </code>
          </pre>
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="h-6 bg-editor-panel border-t border-editor-border flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>LF</span>
          <span>{getLanguageFromFile(selectedFile)}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>{code.split('\n').length} lines</span>
        </div>
      </div>
    </div>
  );
};