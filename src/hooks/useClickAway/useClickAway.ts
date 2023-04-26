import {RefObject} from "react";
import {Nullable} from "../../types";
import {useEvent} from "../useEvent/useEvent";

export const useClickAway = (
  ref: Nullable<RefObject<HTMLDivElement | HTMLUListElement>>,
  handler: () => void,
  shouldHandle: (event: MouseEvent) => boolean = () => true,
): void => {
  useEvent('mousedown', handleMousedown)

  function handleMousedown(event: MouseEvent): void {
    if (shouldHandle(event) && !ref?.current?.contains(event.target as Node)) {
      handler()
    }
  }
}
