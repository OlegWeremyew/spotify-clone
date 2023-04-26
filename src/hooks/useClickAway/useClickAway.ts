import {RefObject} from "react";
import {Nullable} from "../../types";
import {useEvent} from "../useEvent/useEvent";
import {Events} from "enums/index";

export const useClickAway = (
  ref: Nullable<RefObject<HTMLDivElement | HTMLUListElement>>,
  handler: () => void,
  shouldHandle: (event: MouseEvent) => boolean = () => true,
): void => {
  useEvent(Events.MOUSE_DOWN, handleMousedown)

  function handleMousedown(event: MouseEvent): void {
    if (shouldHandle(event) && !ref?.current?.contains(event.target as Node)) {
      handler()
    }
  }
}
