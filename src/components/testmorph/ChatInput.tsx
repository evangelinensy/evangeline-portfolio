"use client";

import { useState, useRef, useEffect, type KeyboardEvent, type ReactNode } from "react";
import styles from "./testmorph.module.css";

interface ChatInputProps {
  onSend: (message: string, selectedText?: string) => void;
  isLoading: boolean;
  hasMessages: boolean;
  onExpand: () => void;
  isExpanded: boolean;
  placeholder?: string;
  leftSlot?: ReactNode;
  selectedText?: string;
  onClearSelectedText?: () => void;
}

export function ChatInput({
  onSend,
  isLoading,
  hasMessages,
  onExpand,
  isExpanded,
  placeholder = "Ask AI",
  leftSlot,
  selectedText,
  onClearSelectedText,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = value.trim().length > 0;
  const showExpanded = isFocused || hasText;

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim(), selectedText);
    setValue("");
    onClearSelectedText?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`${styles.chatInputContainer} ${hasText ? styles.hasText : ""} ${
        showExpanded ? styles.expanded : ""
      }`}
    >
      {/* Top Row - LLM Dropdown and Close hint */}
      <div className={styles.chatTopRow}>
        <div className={styles.chatTopRowInner}>
          <div className={styles.chatLeftControls}>{leftSlot}</div>
          <div className={styles.chatCloseSection}>
            {hasMessages && !isExpanded && (
              <button
                className={styles.recentButton}
                onClick={onExpand}
                type="button"
              >
                Recent
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Selected Text Tag */}
      {selectedText && (
        <div className={styles.selectedTextRow}>
          <div className={styles.selectedTextTag}>
            <span className={styles.selectedTextContent}>
              {selectedText.length > 40 ? `${selectedText.slice(0, 40)}..` : selectedText}
            </span>
            <button
              type="button"
              className={styles.selectedTextClose}
              onClick={onClearSelectedText}
              aria-label="Remove selected text"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input Row */}
      <div className={styles.chatInputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={styles.chatInput}
          disabled={isLoading}
        />
      </div>

      {/* Bottom Row - Attach and Send buttons */}
      <div className={styles.chatBottomRow}>
        <div className={styles.chatBottomRowInner}>
        <div className={styles.chatLeftControls}>
          <button
            type="button"
            className={styles.attachButton}
            aria-label="Attach file"
            disabled
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.44 11.05L12.25 20.24C11.1228 21.3672 9.59699 22 8.00501 22C6.41303 22 4.88714 21.3672 3.76001 20.24C2.63288 19.1129 2.00006 17.587 2.00006 15.995C2.00006 14.403 2.63288 12.8771 3.76001 11.75L12.33 3.18C13.0806 2.42975 14.0925 2.00128 15.1475 2.00128C16.2026 2.00128 17.2144 2.42975 17.965 3.18C18.7153 3.93064 19.1437 4.94249 19.1437 5.9975C19.1437 7.05251 18.7153 8.06436 17.965 8.815L9.38501 17.395C9.00981 17.7702 8.50389 17.9844 7.97651 17.9844C7.44912 17.9844 6.94321 17.7702 6.56801 17.395C6.19281 17.0198 5.97862 16.5139 5.97862 15.9865C5.97862 15.4591 6.19281 14.9532 6.56801 14.578L14.748 6.40795"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.chatRightControls}>
          <button
            type="button"
            className={`${styles.sendButton} ${hasText ? styles.active : ""}`}
            onClick={handleSend}
            disabled={!hasText || isLoading}
            aria-label="Send message"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M12 5L5 12M12 5L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
