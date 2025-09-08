import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Square, 
  RotateCcw, 
  Download,
  Copy,
  MoreHorizontal
} from "lucide-react";

const mockCode = {
  "src/App.tsx": `import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Bolt.new Clone</h1>
        <p>This is a fully functional React application</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="counter-button"
        >
          Count: {count}
        </button>
      </header>
    </div>
  );
}

export default App;`,
  "src/main.tsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "package.json": `{
  "name": "bolt-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5"
  }
}`
};

interface EditorProps {
  selectedFile: string;
}

export const Editor = ({ selectedFile }: EditorProps) => {
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(mockCode[selectedFile as keyof typeof mockCode] || "// File not found");
  }, [selectedFile]);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate running
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="h-full bg-editor-background flex flex-col">
      {/* Toolbar */}
      <div className="h-10 bg-editor-panel border-b border-editor-border flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-foreground ml-2">{selectedFile}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <Square className="w-3 h-3 mr-1" />
            ) : (
              <Play className="w-3 h-3 mr-1" />
            )}
            {isRunning ? "Stop" : "Run"}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Download className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-auto">
        <pre className="text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap">
          <code className="language-tsx">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};