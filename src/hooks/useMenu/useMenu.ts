import {MouseEvent, useRef, useState} from "react";
import {Nullable} from "../../types";
import {ReturnUseContextMenuType} from "./types";
import {usePosition} from "../usePosition";
import {SubMenuItem} from "../../components/TheMain/Playlist/types";
import {useClickAway} from "../useClickAway/useClickAway";
import {useEvent} from "../useEvent/useEvent";

export const useMenu = (items: SubMenuItem[]): ReturnUseContextMenuType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<Nullable<HTMLUListElement>>(null)
  const move = usePosition(ref, isOpen)
  useClickAway(ref, close, () => isOpen)
  useEvent('keydown', handleEsc, isOpen)

  const open = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    move(event.clientX, event.clientY)

    setIsOpen(true);
  }

  function close(): void {
    setIsOpen(false);
  }

  function handleEsc({key}: KeyboardEvent): void {
    if (key === "Escape") {
      close()
    }
  }

  return {open, isOpen, ref, items, close}
}
