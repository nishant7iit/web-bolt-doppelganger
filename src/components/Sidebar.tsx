import { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Folder, 
  FolderOpen,
  Plus,
  Search,
  Settings,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileTreeItem {
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
  path: string;
}

const mockFileTree: FileTreeItem[] = [
  {
    name: "src",
    type: "folder",
    path: "src",
    children: [
      { name: "App.tsx", type: "file", path: "src/App.tsx" },
      { name: "main.tsx", type: "file", path: "src/main.tsx" },
      { name: "index.css", type: "file", path: "src/index.css" },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          { name: "Button.tsx", type: "file", path: "src/components/Button.tsx" },
          { name: "Header.tsx", type: "file", path: "src/components/Header.tsx" },
        ]
      }
    ]
  },
  {
    name: "public",
    type: "folder", 
    path: "public",
    children: [
      { name: "index.html", type: "file", path: "public/index.html" },
      { name: "favicon.ico", type: "file", path: "public/favicon.ico" },
    ]
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "vite.config.ts", type: "file", path: "vite.config.ts" },
  { name: "README.md", type: "file", path: "README.md" },
];

interface SidebarProps {
  selectedFile: string;
  onFileSelect: (file: string) => void;
}

export const Sidebar = ({ selectedFile, onFileSelect }: SidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const FileTreeNode = ({ item, depth = 0 }: { item: FileTreeItem; depth?: number }) => {
    const isExpanded = expandedFolders.has(item.path);
    const isSelected = selectedFile === item.path;
    
    return (
      <div>
        <div
          className={`flex items-center gap-1 py-1 px-2 text-sm cursor-pointer hover:bg-sidebar-accent ${
            isSelected ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground"
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.path);
            } else {
              onFileSelect(item.path);
            }
          }}
        >
          {item.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="w-4 h-4" />
            </>
          )}
          <span className="truncate">{item.name}</span>
        </div>
        
        {item.type === "folder" && isExpanded && item.children && (
          <div>
            {item.children.map((child) => (
              <FileTreeNode key={child.path} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-sidebar-foreground">bolt.new</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-7 text-xs bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          
          {mockFileTree.map((item) => (
            <FileTreeNode key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};