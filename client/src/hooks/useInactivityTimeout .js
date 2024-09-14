import { useEffect, useRef, useCallback } from "react";

// Default timeout of 30 minutes
function useInactivityTimeout(callback, timeout = 30 * 60000) {
  const timeoutRef = useRef(null);

  const resetTimer = useCallback(() => {
    // Clear the existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      callback();
    }, timeout);
  }, [callback, timeout]);

  useEffect(() => {
    // Define the events to listen for to detect user activity
    const events = [
      "mousemove",
      "click",
      "keypress",
      "scroll",
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
    ];

    // Reset the timer on any of these events
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Initial timer start
    resetTimer();

    // Cleanup function to remove event listeners and clear timeout
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return { resetTimer };
}

export default useInactivityTimeout;
