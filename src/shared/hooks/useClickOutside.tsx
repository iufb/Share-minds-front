import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void,
) {
  useEffect(() => {
    const listener = (e: Event) => {
      if (!ref.current || ref.current.contains((e.target as Node) || null)) {
        return;
      }
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
