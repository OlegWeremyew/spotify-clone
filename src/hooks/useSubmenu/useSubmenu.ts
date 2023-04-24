import {
  MenuStateType,
  PositionClassesType,
  PositionXClassType,
  PositionYClassType,
} from "../../components/TheMain/Playlist/PlaylistContextMenu/PlaylistContextMenuItemWithSubmenu";
import {SubMenuItem} from "../../components/TheMain/Playlist/types";
import {Nullable, TimeoutType} from "../../types";
import {MutableRefObject, useEffect, useRef, useState} from "react";

export type ReturnUseSubmenuType = {
  isOpen: boolean
  positionClasses: PositionClassesType
  items: Nullable<SubMenuItem[]>
  open: () => void
  close: () => void
}

export const useSubmenu = (
  items: Nullable<SubMenuItem[]>,
  closePreviousIfOpen: (startCloseTimer: Function) => void,
  ref: MutableRefObject<Nullable<HTMLLIElement>>
): ReturnUseSubmenuType => {

  const [state, setState] = useState<MenuStateType>({
    isOpen: false,
    positionClasses: 'top-0 left-full',
  })
  const closeTimer = useRef<TimeoutType>(undefined)

  const getPositionXClass = (): PositionXClassType => {
    if (!ref.current) return "left-full"

    const menuItem = ref.current
    const menuItemWidth = menuItem.offsetWidth
    const windowWidth = window.innerWidth
    const menuItemRightCoordinateX = menuItem?.getBoundingClientRect().right
    const shouldMoveLeft = menuItemWidth > windowWidth - menuItemRightCoordinateX

    return shouldMoveLeft ? 'right-full' : "left-full"
  }

  const getPositionYClass = (): PositionYClassType => {
    if (!ref.current || !items?.length) return "top-0"

    const menuItem = ref.current
    const menuHeight = menuItem?.offsetHeight * items.length
    const windowHeight = window.innerHeight
    const menuItemBottomCoordinateY = menuItem?.getBoundingClientRect().top
    const shouldMoveTUp = menuHeight > windowHeight - menuItemBottomCoordinateY

    return shouldMoveTUp ? 'bottom-0' : "top-0"
  }

  const getPositionClasses = (): PositionClassesType => {
    return `${getPositionYClass()} ${getPositionXClass()}`
  }

  const open = (): void => {
    setState({
      isOpen: true,
      positionClasses: getPositionClasses()
    })
  }

  const close = (): void => {
    closePreviousIfOpen(startCloseTimer);

    setState({
      ...state,
      isOpen: false,
    })
  }

  const startCloseTimer = (): void => {
    closeTimer.current = setTimeout(() => {
      close()
    }, 150)
  }

  const stopCloseTimer = (): void => {
    clearTimeout(closeTimer.current)
  }

  //unmounting component
  useEffect(() => stopCloseTimer)

  return {
    open,
    close,
    items,
    ...state,
  };
}