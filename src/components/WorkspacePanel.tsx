import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";
import { PreviewPanel } from "./PreviewPanel";
import { FileExplorer } from "./FileExplorer";
import { Terminal } from "./Terminal";
import { 
  Code2, 
  Eye, 
  Terminal as TerminalIcon,
  FolderTree,
  Settings,
  Play,
  Square
} from "lucide-react";

interface WorkspacePanelProps {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  selectedFile: string;
  onFileSelect: (file: string) => void;
}

export const WorkspacePanel = ({ 
  activeTab, 
  onTabChange, 
  selectedFile, 
  onFileSelect 
}: WorkspacePanelProps) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header with tabs and controls */}
      <div className="h-14 bg-editor-panel border-b border-editor-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as "preview" | "code")}>
            <TabsList className="bg-background border border-border">
              <TabsTrigger value="preview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Code2 className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className={showFileExplorer ? "bg-accent" : ""}
          >
            <FolderTree className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTerminal(!showTerminal)}
            className={showTerminal ? "bg-accent" : ""}
          >
            <TerminalIcon className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer Sidebar */}
        {showFileExplorer && (
          <div className="w-64 border-r border-editor-border">
            <FileExplorer 
              selectedFile={selectedFile} 
              onFileSelect={onFileSelect}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Content */}
          <div className={`flex-1 ${showTerminal ? "border-b border-editor-border" : ""}`}>
            {activeTab === "preview" ? (
              <PreviewPanel />
            ) : (
              <CodeEditor selectedFile={selectedFile} />
            )}
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="h-64 border-t border-editor-border">
              <Terminal onClose={() => setShowTerminal(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};