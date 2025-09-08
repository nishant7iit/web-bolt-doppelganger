import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Editor } from "./Editor";
import { Preview } from "./Preview";
import { Chat } from "./Chat";
import { Terminal } from "./Terminal";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const BoltLayout = () => {
  const [selectedFile, setSelectedFile] = useState<string>("src/App.tsx");
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar selectedFile={selectedFile} onFileSelect={setSelectedFile} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - Editor + Terminal */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={showTerminal ? 70 : 100} minSize={40}>
                <Editor selectedFile={selectedFile} />
              </ResizablePanel>
              
              {/* Terminal */}
              {showTerminal && (
                <>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={30} minSize={20}>
                    <Terminal onClose={() => setShowTerminal(false)} />
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Right Panel - Preview + Chat */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Preview */}
              <ResizablePanel defaultSize={70} minSize={40}>
                <Preview />
              </ResizablePanel>
              
              <ResizableHandle />
              
              {/* Chat */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <Chat onToggleTerminal={() => setShowTerminal(!showTerminal)} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};