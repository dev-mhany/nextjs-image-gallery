import { useRef, useEffect, useState } from "react";

/**
 * Check if an element is in viewport
 */
export default function useVisibility<Element extends HTMLElement>(): [
  Boolean,
  React.RefObject<Element>
] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<Element>();

  useEffect(() => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(currentElement.current);
    return () => {
      observer.disconnect();
    };
  }, [currentElement]);

  return [isVisible, currentElement];
}
