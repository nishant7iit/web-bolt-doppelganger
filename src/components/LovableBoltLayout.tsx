import { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { WorkspacePanel } from "./WorkspacePanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const LovableBoltLayout = () => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedFile, setSelectedFile] = useState<string>("src/App.tsx");

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Chat */}
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <ChatPanel />
        </ResizablePanel>
        
        <ResizableHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
        
        {/* Right Panel - Workspace (Code/Preview Toggle) */}
        <ResizablePanel defaultSize={65} minSize={50}>
          <WorkspacePanel 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};