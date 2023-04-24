import {MouseEvent, useEffect, useRef, useState} from "react";
import {Nullable} from "../../types";
import {ReturnUseContextMenuType} from "./types";
import {usePosition} from "../usePosition";
import {SubMenuItem} from "../../components/TheMain/Playlist/types";

export const useMenu = (items: SubMenuItem[]): ReturnUseContextMenuType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<Nullable<HTMLUListElement>>(null)
  const move = usePosition(ref, isOpen)

  const open = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    move(event.clientX, event.clientY)

    setIsOpen(true);
  }

  const close = (): void => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return

    const handleClickAway = ({target}: UIEvent): void => {

      if (!ref.current?.contains(target as Node)) {
        close()
      }
    }

    const handleEsc = ({key}: KeyboardEvent): void => {
      if (key === "Escape") {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  return {open, isOpen, ref, items, close}
}