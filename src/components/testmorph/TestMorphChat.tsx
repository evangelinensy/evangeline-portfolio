"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatInput } from "./ChatInput";
import { ConversationBubble } from "./ConversationBubble";
import { LLMDropdown } from "./LLMDropdown";
import styles from "./testmorph.module.css";

export type LLMProvider = "gemini" | "groq" | "huggingface" | "cerebras";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

interface ConversationHistoryItem {
  role: string;
  parts: Array<{ text: string }>;
}

interface TestMorphChatProps {
  placeholder?: string;
  selectedText?: string;
  onClearSelectedText?: () => void;
  loaderVariant?: "dots" | "eyes";
}

export function TestMorphChat({ placeholder = "Ask AI", selectedText, onClearSelectedText, loaderVariant = "dots" }: TestMorphChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState<LLMProvider>("gemini");
  const [isExpanded, setIsExpanded] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  // Expand when there are messages
  useEffect(() => {
    if (messages.length > 0) {
      setIsExpanded(true);
    }
  }, [messages.length]);

  const sendMessage = useCallback(
    async (content: string, contextText?: string) => {
      if (!content.trim() || isLoading) return;

      // If there's selected text context, include it in the message
      const fullContent = contextText
        ? `Regarding this text: "${contextText}"\n\n${content.trim()}`
        : content.trim();

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: fullContent,
      };

      const assistantMessageId = `assistant-${Date.now()}`;
      const loadingMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        isLoading: true,
      };

      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsLoading(true);

      try {
        // Build conversation history for context
        const conversationHistory: ConversationHistoryItem[] = messages
          .filter((m) => !m.isLoading)
          .map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: selectedLLM,
            message: fullContent,
            conversationHistory,
          }),
        });

        // Check if response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "API not available. Deploy to Netlify for full functionality."
          );
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get response");
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: data.response, isLoading: false }
              : m
          )
        );
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content:
                    error instanceof Error
                      ? `Sorry, I encountered an error: ${error.message}`
                      : "Sorry, something went wrong. Please try again.",
                  isLoading: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, selectedLLM]
  );

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleExpand = () => {
    if (messages.length > 0) {
      setIsExpanded(true);
    }
  };

  return (
    <div className={styles.testmorphContainer}>
      {/* Conversation Panel */}
      {isExpanded && messages.length > 0 && (
        <div className={styles.conversationPanel}>
          <div className={styles.conversationHeader}>
            <button
              className={styles.collapseButton}
              onClick={handleCollapse}
              aria-label="Collapse conversation"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className={styles.conversationContent} ref={conversationRef}>
            {messages.map((message) => (
              <ConversationBubble
                key={message.id}
                role={message.role}
                content={message.content}
                isLoading={message.isLoading}
                loaderVariant={loaderVariant}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className={styles.chatInputWrapper}>
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
          hasMessages={messages.length > 0}
          onExpand={handleExpand}
          isExpanded={isExpanded}
          placeholder={placeholder}
          selectedText={selectedText}
          onClearSelectedText={onClearSelectedText}
          leftSlot={
            <LLMDropdown
              selectedLLM={selectedLLM}
              onSelect={setSelectedLLM}
              disabled={isLoading}
            />
          }
        />
      </div>
    </div>
  );
}
