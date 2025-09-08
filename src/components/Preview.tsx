import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  RotateCcw, 
  ExternalLink, 
  Smartphone, 
  Tablet, 
  Monitor,
  Globe
} from "lucide-react";

export const Preview = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [url, setUrl] = useState("http://localhost:3000");

  const getPreviewStyles = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Toolbar */}
      <div className="h-10 bg-editor-panel border-b border-editor-border flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <div className="bg-input border border-border rounded px-2 py-1 text-xs text-foreground flex-1 min-w-0">
            {url}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant={viewMode === "desktop" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-6 px-2"
            onClick={() => setViewMode("desktop")}
          >
            <Monitor className="w-3 h-3" />
          </Button>
          <Button 
            variant={viewMode === "tablet" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-6 px-2"
            onClick={() => setViewMode("tablet")}
          >
            <Tablet className="w-3 h-3" />
          </Button>
          <Button 
            variant={viewMode === "mobile" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-6 px-2"
            onClick={() => setViewMode("mobile")}
          >
            <Smartphone className="w-3 h-3" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-muted p-4 overflow-auto flex items-center justify-center">
        <div className={`bg-preview-background border border-border rounded-lg overflow-hidden ${getPreviewStyles()} max-w-full max-h-full`}>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Bolt.new Clone
              </h1>
              <p className="text-gray-600 mb-6">
                This is a fully functional React application
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                Count: 0
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};