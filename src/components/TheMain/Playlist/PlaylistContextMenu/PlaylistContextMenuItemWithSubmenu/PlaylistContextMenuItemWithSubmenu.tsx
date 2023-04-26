import {FC, useRef} from "react";
import {useSubmenu} from "hooks/useSubmenu";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {PlaylistContextMenu} from "../PlaylistContextMenu";
import {Nullable} from "types";
import {IMenuItemWithSubmenu} from "./types";

export const PlaylistContextMenuItemWithSubmenu: FC<IMenuItemWithSubmenu> = (
  {
    children: label,
    subMenuItems = [],
    onMouseEnter: closePreviousSubmenuIfOpen,
  }
) => {
  const ref = useRef<Nullable<HTMLLIElement>>(null)
  const refMock = useRef<Nullable<HTMLUListElement>>(null)

  const submenu = useSubmenu(subMenuItems, closePreviousSubmenuIfOpen,  ref)

  const bgClass = submenu.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]'

  return (
    <li
      className="relative"
      ref={ref}
      onMouseEnter={submenu.open}
      onMouseLeave={submenu.close}
    >
      <button
        type="button"
        className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}
      >
        {label} <ChevronRightIcon className="h-4 w-4"/>
      </button>
      {submenu.isOpen && (
        <PlaylistContextMenu
          ref={refMock}
          menuItems={submenu.items}
          classes={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default absolute ${submenu.positionClasses}`}
        />
      )}
    </li>
  );
}
