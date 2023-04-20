import {FC, useEffect, useRef, useState} from "react";
import {ChevronRightIcon} from "@heroicons/react/outline";
import {PlaylistContextMenu} from "../PlaylistContextMenu";
import {SubMenuItem} from "../../types";
import {Nullable} from "../../../../../types";

export interface IMenuItemWithSubmenu {
  children: string
  subMenuItems?: Nullable<SubMenuItem[]>
  onMouseEnter: () => void
}

export type PositionXClassType = "left-full" | "right-full"
export type PositionYClassType = "top-0" | "bottom-0"
export type PositionClassesType = "top-0 left-full" | "top-0 right-full" | "bottom-0 left-full" | "bottom-0 right-full"
export type MenuStateType = {
  isOpen: boolean
  positionClasses: PositionClassesType
}
export type TimeoutType = ReturnType<typeof setTimeout> | undefined

export const PlaylistContextMenuItemWithSubmenu: FC<IMenuItemWithSubmenu> = (
  {
    children: label,
    subMenuItems = [],
  }
) => {

  const [menuState, setMenuState] = useState<MenuStateType>({
    isOpen: false,
    positionClasses: 'top-0 left-full',
  })

  const ref = useRef<Nullable<HTMLUListElement>>(null)
  const menuItemRef = useRef<Nullable<HTMLLIElement>>(null)
  const closeMenuTimer = useRef<TimeoutType>(undefined)
  const bgClass = menuState.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]'

  const getMenuPositionXClass = (): PositionXClassType => {
    if (!menuItemRef.current) return "left-full"

    const menuItem = menuItemRef.current
    const menuItemWidth = menuItem.offsetWidth
    const windowWidth = window.innerWidth
    const menuItemRightCoordinateX = menuItem?.getBoundingClientRect().right
    const shouldMoveLeft = menuItemWidth > windowWidth - menuItemRightCoordinateX

    return shouldMoveLeft ? 'right-full' : "left-full"
  }

  const getMenuPositionYClass = (): PositionYClassType => {
    if (!menuItemRef.current || !subMenuItems?.length) return "top-0"

    const menuItem = menuItemRef.current
    const menuHeight = menuItem?.offsetHeight * subMenuItems.length
    const windowHeight = window.innerHeight
    const menuItemBottomCoordinateY = menuItem?.getBoundingClientRect().top
    const shouldMoveTUp = menuHeight > windowHeight - menuItemBottomCoordinateY

    return shouldMoveTUp ? 'bottom-0' : "top-0"
  }

  const getMenuPositionClasses = (): PositionClassesType => {
    return `${getMenuPositionYClass()} ${getMenuPositionXClass()}`
  }

  const openMenu = (): void => {
    setMenuState({
      isOpen: true,
      positionClasses: getMenuPositionClasses()
    })
  }

  const closeMenu = (): void => {
    setMenuState({
      ...menuState,
      isOpen: false,
    })
  }

  const startCloseMenuTimer = (): void => {
    closeMenuTimer.current = setTimeout(() => {
      closeMenu()
    }, 150)
  }

  const stopCloseMenuTimer = (): void => {
    clearTimeout(closeMenuTimer.current)
  }

  //unmounting component
  useEffect(() => stopCloseMenuTimer)

  return (
    <li
      className="relative"
      ref={menuItemRef}
      onMouseEnter={openMenu}
      onMouseLeave={startCloseMenuTimer}
    >
      <button
        type="button"
        className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}
      >
        {label} <ChevronRightIcon className="h-4 w-4"/>
      </button>
      {menuState.isOpen && (
        <PlaylistContextMenu
          ref={ref}
          menuItems={subMenuItems}
          classes={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default absolute ${menuState.positionClasses}`}
        />
      )}
    </li>
  );
}
