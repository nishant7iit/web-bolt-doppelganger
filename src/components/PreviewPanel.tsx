import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  RotateCcw, 
  ExternalLink, 
  Smartphone, 
  Tablet, 
  Monitor,
  Globe,
  Settings,
  Maximize2,
  RefreshCw
} from "lucide-react";

export const PreviewPanel = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [url, setUrl] = useState("http://localhost:3000");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPreviewStyles = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[812px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full h-full";
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="h-full bg-preview-background flex flex-col">
      {/* Preview Toolbar */}
      <div className="h-12 bg-editor-panel border-b border-editor-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3 flex-1">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <div className="bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground flex-1 max-w-md">
            {url}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Device Toggles */}
          <div className="flex items-center border border-border rounded-md">
            <Button 
              variant={viewMode === "desktop" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 px-3 rounded-r-none border-r border-border"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "tablet" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 px-3 rounded-none border-r border-border"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "mobile" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 px-3 rounded-l-none"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="w-px h-6 bg-border" />
          
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-muted overflow-auto">
        <div className="h-full w-full flex items-center justify-center p-4">
          <div 
            className={`bg-white border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${getPreviewStyles()} max-w-full max-h-full`}
          >
            {/* Mock App Preview */}
            <div className="w-full h-full flex flex-col">
              {/* Mock Browser Chrome (for desktop) */}
              {viewMode === "desktop" && (
                <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-gray-600 ml-2">localhost:3000</div>
                </div>
              )}
              
              {/* App Content */}
              <ScrollArea className="flex-1">
                <div className="p-8 min-h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
                  <div className="max-w-2xl mx-auto text-center">
                    {/* Logo */}
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">B</div>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                      Welcome to Bolt.new Clone
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      This is a fully functional React application built with Vite. 
                      Experience the power of modern web development.
                    </p>
                    
                    {/* Interactive Counter */}
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-8 inline-block">
                      <div className="flex items-center gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                          Count: 0
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                          Reset
                        </button>
                      </div>
                    </div>
                    
                    {/* Theme Toggle */}
                    <div className="mb-8">
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                        Switch to dark theme
                      </button>
                    </div>
                    
                    {/* Links */}
                    <div className="flex justify-center gap-6 text-sm">
                      <a href="#" className="text-blue-500 hover:text-blue-700 underline">
                        Learn Vite
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700 underline">
                        Learn React
                      </a>
                      <a href="#" className="text-blue-500 hover:text-blue-700 underline">
                        Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-8 bg-editor-panel border-t border-editor-border flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Connected
          </span>
          <span>{viewMode} view</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Last updated: just now</span>
          <span>Build: success</span>
        </div>
      </div>
    </div>
  );
};