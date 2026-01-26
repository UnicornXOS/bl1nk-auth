"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  largeText: boolean;
  setLargeText: (enabled: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
  voiceNavigation: boolean;
  setVoiceNavigation: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [voiceNavigation, setVoiceNavigation] = useState(false);

  useEffect(() => {
    // Load accessibility preferences
    const stored = {
      highContrast:
        localStorage.getItem("accessibility-highContrast") === "true",
      largeText: localStorage.getItem("accessibility-largeText") === "true",
      reduceMotion:
        localStorage.getItem("accessibility-reduceMotion") === "true",
      voiceNavigation:
        localStorage.getItem("accessibility-voiceNavigation") === "true",
    };

    setHighContrast(stored.highContrast);
    setLargeText(stored.largeText);
    setReduceMotion(stored.reduceMotion);
    setVoiceNavigation(stored.voiceNavigation);

    // Check system preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion && !stored.reduceMotion) {
      setReduceMotion(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    // Apply accessibility classes
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("large-text", largeText);
    root.classList.toggle("reduce-motion", reduceMotion);
    root.classList.toggle("voice-navigation", voiceNavigation);

    // Store preferences
    localStorage.setItem("accessibility-highContrast", highContrast.toString());
    localStorage.setItem("accessibility-largeText", largeText.toString());
    localStorage.setItem("accessibility-reduceMotion", reduceMotion.toString());
    localStorage.setItem(
      "accessibility-voiceNavigation",
      voiceNavigation.toString(),
    );
  }, [highContrast, largeText, reduceMotion, voiceNavigation]);

  // Voice navigation functionality
  useEffect(() => {
    if (!voiceNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "v" && event.ctrlKey) {
        event.preventDefault();
        speakCurrentElement();
      }
    };

    const speakCurrentElement = () => {
      const activeElement = document.activeElement;
      if (activeElement) {
        const text =
          activeElement.textContent ||
          activeElement.getAttribute("aria-label") ||
          "ไม่พบข้อความ";
        speak(text);
      }
    };

    const speak = (text: string) => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "th-TH"; // Thai language
        utterance.rate = 0.8;
        utterance.pitch = 1;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [voiceNavigation]);

  const value = {
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reduceMotion,
    setReduceMotion,
    voiceNavigation,
    setVoiceNavigation,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
}
