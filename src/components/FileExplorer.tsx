import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Folder, 
  FolderOpen,
  Plus,
  Search,
  GitBranch,
  MoreHorizontal,
  Trash2
} from "lucide-react";

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
      { name: "App.css", type: "file", path: "src/App.css" },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          { name: "Header.tsx", type: "file", path: "src/components/Header.tsx" },
          { name: "Button.tsx", type: "file", path: "src/components/Button.tsx" },
          { name: "Modal.tsx", type: "file", path: "src/components/Modal.tsx" },
        ]
      },
      {
        name: "hooks",
        type: "folder",
        path: "src/hooks",
        children: [
          { name: "useAuth.ts", type: "file", path: "src/hooks/useAuth.ts" },
          { name: "useApi.ts", type: "file", path: "src/hooks/useApi.ts" },
        ]
      },
      {
        name: "utils",
        type: "folder",
        path: "src/utils",
        children: [
          { name: "helpers.ts", type: "file", path: "src/utils/helpers.ts" },
          { name: "constants.ts", type: "file", path: "src/utils/constants.ts" },
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
      { name: "logo.svg", type: "file", path: "public/logo.svg" },
    ]
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "vite.config.ts", type: "file", path: "vite.config.ts" },
  { name: "tsconfig.json", type: "file", path: "tsconfig.json" },
  { name: "tailwind.config.js", type: "file", path: "tailwind.config.js" },
  { name: "README.md", type: "file", path: "README.md" },
];

interface FileExplorerProps {
  selectedFile: string;
  onFileSelect: (file: string) => void;
}

export const FileExplorer = ({ selectedFile, onFileSelect }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "src/components"]));
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

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop();
    return <FileText className="w-4 h-4" />;
  };

  const FileTreeNode = ({ item, depth = 0 }: { item: FileTreeItem; depth?: number }) => {
    const isExpanded = expandedFolders.has(item.path);
    const isSelected = selectedFile === item.path;
    
    return (
      <div>
        <div
          className={`flex items-center gap-1 py-1.5 px-2 text-sm cursor-pointer hover:bg-sidebar-accent group transition-colors ${
            isSelected ? "bg-primary text-primary-foreground" : "text-sidebar-foreground"
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
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
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-400" />
              ) : (
                <Folder className="w-4 h-4 flex-shrink-0 text-blue-400" />
              )}
            </>
          ) : (
            <>
              <div className="w-4 flex-shrink-0" />
              {getFileIcon(item.name)}
            </>
          )}
          <span className="truncate flex-1">{item.name}</span>
          
          {/* File actions - show on hover */}
          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
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

  const filteredTree = searchQuery 
    ? mockFileTree.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockFileTree;

  return (
    <div className="h-full bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-sidebar-foreground">Explorer</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-8 text-xs bg-sidebar-accent border-sidebar-border"
          />
        </div>
        
        {/* Branch info */}
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
          <span className="text-green-400">●</span>
        </div>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {filteredTree.map((item) => (
            <FileTreeNode key={item.path} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};