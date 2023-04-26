import {RefObject, useEffect} from "react";
import {Nullable} from "../../types";

export const useClickAway = (
  ref: Nullable<RefObject<HTMLDivElement | HTMLUListElement>>,
  handle: () => void,
  shouldHandle: (event: MouseEvent) => boolean = () => true,
): void => {
  useEffect(() => {

    function handleMousedown(event: MouseEvent): void {
      if (shouldHandle(event) && !ref?.current?.contains(event.target as Node)) {
        handle()
      }
    }

    document.addEventListener('mousedown', handleMousedown);

    return () => document.removeEventListener('mousedown', handleMousedown)
  });
}