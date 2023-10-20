import { useEffect } from "react";

export function useRestorePosition(key: string) {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(key);
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem(key);
      }, 120);
    }
  }, []);
}
