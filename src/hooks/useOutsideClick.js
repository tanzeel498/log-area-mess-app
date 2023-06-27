import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const modalRef = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          //   console.log("Click outside");
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return modalRef;
}
