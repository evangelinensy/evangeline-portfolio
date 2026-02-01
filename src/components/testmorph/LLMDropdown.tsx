"use client";

import { useState, useRef, useEffect } from "react";
import type { LLMProvider } from "./TestMorphChat";
import styles from "./testmorph.module.css";

interface LLMDropdownProps {
  selectedLLM: LLMProvider;
  onSelect: (llm: LLMProvider) => void;
  disabled?: boolean;
}

const LLM_OPTIONS: Array<{ value: LLMProvider; label: string }> = [
  { value: "gemini", label: "Gemini" },
  { value: "groq", label: "Groq" },
  { value: "huggingface", label: "Hugging Face" },
  { value: "cerebras", label: "Cerebras" },
];

export function LLMDropdown({
  selectedLLM,
  onSelect,
  disabled,
}: LLMDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = LLM_OPTIONS.find((opt) => opt.value === selectedLLM);

  const handleSelect = (llm: LLMProvider) => {
    onSelect(llm);
    setIsOpen(false);
  };

  return (
    <div className={styles.llmDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.llmDropdownTrigger} ${isOpen ? styles.open : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.llmDropdownText}>
          {selectedOption?.label || "Select AI"}
        </span>
        <svg
          className={styles.llmChevron}
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

      {isOpen && (
        <div className={styles.llmDropdownMenu} role="listbox">
          {LLM_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.llmOption} ${
                option.value === selectedLLM ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === selectedLLM}
            >
              <span className={styles.llmOptionLabel}>{option.label}</span>
              {option.value === selectedLLM && (
                <span className={styles.llmCheck}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
