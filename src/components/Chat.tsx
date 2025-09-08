import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  Terminal, 
  Sparkles,
  User,
  Bot
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatProps {
  onToggleTerminal: () => void;
}

export const Chat = ({ onToggleTerminal }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI assistant. I can help you build, debug, and improve your web application. What would you like to create today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I understand you want to work on your project. I can help you with code modifications, debugging, and implementing new features. What specific changes would you like to make?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full bg-chat-background flex flex-col">
      {/* Header */}
      <div className="h-10 bg-editor-panel border-b border-editor-border flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2"
          onClick={onToggleTerminal}
        >
          <Terminal className="w-3 h-3" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message.content}
            </div>
            
            {message.type === "user" && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-editor-border">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-chat-input border-border"
            disabled={isLoading}
          />
          <Button 
            size="sm" 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};