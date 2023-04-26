import {useEffect} from "react";
import {Nullable} from "../../types";

export type EventNameType = 'keydown' | 'keyup' | 'mousedown' | 'resize' | 'wheel'

export const useEvent = (
  name: EventNameType,
  handler: (event: any) => void,
  shouldHandle: (() => boolean) | boolean = () => true,
  target: Document | Window | Nullable<HTMLDivElement> = document,
): void => {

  useEffect(() => {
    const handle = shouldHandle instanceof Function ? shouldHandle() : true

    if (!handle) return

    target?.addEventListener(name, handler);

    return () => target?.removeEventListener(name, handler);
  })
}