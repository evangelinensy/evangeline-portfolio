"use client";

import { useState, useEffect } from "react";

function getGreeting(): string {
  return "Thanks for visiting from";
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function getCityFromTimezone(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Extract city from timezone string (e.g., "America/Los_Angeles" -> "Los Angeles")
    const city = timeZone.split("/").pop()?.replace(/_/g, " ") || "Local Time";
    return city;
  } catch {
    return "Local Time";
  }
}

export function TimezoneGreeting() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("Loading...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTimeAndGreeting = () => {
      const now = new Date();
      setTime(formatTime(now));
      setGreeting(getGreeting());
    };

    // Set location (only once)
    setCity(getCityFromTimezone());

    // Update time immediately
    updateTimeAndGreeting();

    // Update time every minute
    const interval = setInterval(updateTimeAndGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="h-[18px]" /> {/* Placeholder for greeting label */}
        <div className="h-[40px]" /> {/* Placeholder for capsule */}
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center gap-3">
      {/* Greeting Label */}
      <span
        className="text-[13px] font-medium tracking-[-0.01em]"
        style={{
          color: "#4D4D63",
          fontFamily: "Sequel Sans Book Body, Sequel Sans, sans-serif"
        }}
      >
        {greeting}
      </span>

      {/* Location Capsule */}
      <div
        className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 transition-transform duration-200 hover:scale-[1.02]"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Icon */}
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #E9E9EB 0%, #D1D1D6 100%)",
            color: "#8E8E93",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        {/* Content */}
        <div
          className="flex items-baseline gap-1.5"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          <span
            className="text-sm font-semibold tracking-[-0.02em]"
            style={{ color: "#111111" }}
          >
            {city}
          </span>
          <span
            className="text-sm font-normal tracking-[-0.01em]"
            style={{ color: "#8E8E93" }}
          >
            {time}
          </span>
        </div>

        {/* Live Dot - CSS animation instead of framer-motion */}
        <div
          className="ml-1 h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "#34C759" }}
        />
      </div>
    </section>
  );
}
