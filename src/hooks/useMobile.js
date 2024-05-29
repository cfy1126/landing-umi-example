import { useState, useEffect } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 767px)");
    const listener = (event) => {
      setIsMobile(event.matches);
    };

    mediaQueryList.addListener(listener);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);

  return isMobile;
}
