import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Minus, Square } from "lucide-react";

interface TerminalProps {
  onClose: () => void;
}

interface TerminalLine {
  type: "command" | "output" | "error";
  content: string;
  timestamp: Date;
}

export const Terminal = ({ onClose }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "Welcome to Bolt Terminal",
      timestamp: new Date(),
    },
    {
      type: "output", 
      content: "$ npm run dev",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "> vite",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "  VITE v4.4.5  ready in 342 ms",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "  ➜  Local:   http://localhost:3000/",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "  ➜  Network: use --host to expose",
      timestamp: new Date(),
    },
  ]);
  
  const [currentInput, setCurrentInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const newCommand: TerminalLine = {
      type: "command",
      content: `$ ${command}`,
      timestamp: new Date(),
    };

    let response: TerminalLine;
    
    switch (command.toLowerCase()) {
      case "clear":
        setLines([]);
        return;
      case "ls":
        response = {
          type: "output",
          content: "src/  public/  package.json  vite.config.ts  README.md",
          timestamp: new Date(),
        };
        break;
      case "npm run build":
        response = {
          type: "output",
          content: "Building for production...\n✓ built in 1.2s",
          timestamp: new Date(),
        };
        break;
      case "help":
        response = {
          type: "output",
          content: "Available commands: ls, clear, npm run dev, npm run build, help",
          timestamp: new Date(),
        };
        break;
      default:
        response = {
          type: "error",
          content: `Command not found: ${command}`,
          timestamp: new Date(),
        };
    }

    setLines(prev => [...prev, newCommand, response]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    }
  };

  return (
    <div className="h-full bg-terminal-background flex flex-col">
      {/* Header */}
      <div className="h-8 bg-editor-panel border-b border-editor-border flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-foreground">Terminal</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
            <Minus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
            <Square className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={onClose}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-3 overflow-auto font-mono text-sm text-terminal-foreground"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={`${
              line.type === "error" ? "text-destructive" : 
              line.type === "command" ? "text-primary" : 
              "text-terminal-foreground"
            }`}
          >
            {line.content.split('\n').map((text, lineIndex) => (
              <div key={lineIndex}>{text || "\u00A0"}</div>
            ))}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex items-center text-primary">
          <span className="mr-1">$</span>
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-terminal-foreground"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};