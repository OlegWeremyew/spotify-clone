import {MutableRefObject, useLayoutEffect} from "react";
import {ClickPositionType, ReturnUsePositionType} from "./types";
import {Nullable} from "../../types";

const clickPosition: ClickPositionType = {
  x: 0,
  y: 0,
}

export const usePosition = (
  ref: MutableRefObject<Nullable<HTMLUListElement>>,
  isOpen: boolean,
): ReturnUsePositionType => {

  const updateHorizontalPosition = (): void => {
    if (!ref.current) return

    const xPos = clickPosition.x

    const menuWidth = ref.current?.offsetWidth
    const shouldMoveLeft = menuWidth > window.innerWidth - xPos

    ref.current.style.left = shouldMoveLeft
      ? `${xPos - menuWidth}px`
      : `${xPos}px`
  }

  const updateVerticalPosition = (): void => {
    if (!ref.current) return

    const yPos = clickPosition.y

    const menuHeight = ref.current?.offsetHeight
    const shouldMoveUp = menuHeight > window.innerHeight - yPos

    ref.current.style.top = shouldMoveUp
      ? `${yPos - menuHeight}px`
      : `${yPos}px`
  }

  const updateMenuPosition = (): void => {
    if (!ref.current) return

    updateHorizontalPosition()
    updateVerticalPosition()
  }

  useLayoutEffect(() => {
    if (isOpen) {
      updateMenuPosition()
    }
  })

  function move(x: number, y: number) {
    clickPosition.x = x
    clickPosition.y = y
  }

  return move
}
