import {MouseEvent, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Nullable} from "../../types";
import {ClickPositionType, ReturnUseContextMenuType} from "./types";

const clickPosition: ClickPositionType = {
  x: 0,
  y: 0
}

export const useContextMenu = (): ReturnUseContextMenuType => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);

  const contextMenuRef = useRef<Nullable<HTMLUListElement>>(null)

  const openContextMenu = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    clickPosition.x = event.clientX
    clickPosition.y = event.clientY

    setIsContextMenuOpen(true);
  }

  const closeContextMenu = (): void => {
    setIsContextMenuOpen(false);
  }

  const updateContextMenuHorizontalPosition = (): void => {
    if (!contextMenuRef.current) return

    const menuWidth = contextMenuRef.current?.offsetWidth
    const shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x

    contextMenuRef.current.style.left = shouldMoveLeft
      ? `${clickPosition.x - menuWidth}px`
      : `${clickPosition.x}px`
  }

  const updateContextMenuVerticalPosition = (): void => {
    if (!contextMenuRef.current) return

    const menuHeight = contextMenuRef.current?.offsetHeight
    const shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y

    contextMenuRef.current.style.top = shouldMoveUp
      ? `${clickPosition.y - menuHeight}px`
      : `${clickPosition.y}px`
  }

  const updateContextMenuPosition = (): void => {
    if (!contextMenuRef.current) return

    updateContextMenuHorizontalPosition()
    updateContextMenuVerticalPosition()
  }

  useLayoutEffect(() => {
    if (isContextMenuOpen) {
      updateContextMenuPosition()
    }
  })

  useEffect(() => {
    if (!isContextMenuOpen) return

    const handleClickAway = ({target}: UIEvent): void => {

      if (!contextMenuRef.current?.contains(target as Node)) {
        closeContextMenu()
      }
    }

    const handleEsc = ({key}: KeyboardEvent): void => {
      if (key === "Escape") {
        closeContextMenu()
      }
    }

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  return {openContextMenu, isContextMenuOpen, contextMenuRef}
}