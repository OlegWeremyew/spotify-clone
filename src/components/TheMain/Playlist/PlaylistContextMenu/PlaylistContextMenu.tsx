import {FC, ForwardedRef, forwardRef, useRef} from "react";
import {PlaylistContextMenuItem} from "./PlaylistContextMenuItem";
import {SubMenuItem} from "../types";
import {Nullable} from "../../../../types";
import {PlaylistContextMenuItemWithSubmenu} from "./PlaylistContextMenuItemWithSubmenu";

export interface IContextMenu {
  menuItems: Nullable<SubMenuItem[]>
  classes: string
  ref: ForwardedRef<HTMLUListElement>
}

export const PlaylistContextMenu: FC<IContextMenu> = forwardRef((
  {
    classes,
    menuItems,
  }, ref) => {

  const closePreviousSubmenu = useRef<Nullable<Function>>(null);

  const closePreviousSubmenuIfOpen = (closeSubmenu: Nullable<Function> = null): void => {
    if (closePreviousSubmenu.current) {
      closePreviousSubmenu.current();
    }

    closePreviousSubmenu.current = closeSubmenu;
  }

  return (
    <ul
      ref={ref}
      className={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded cursor-default whitespace-nowrap z-10 shadow-3xl ${classes}`}
    >
      {menuItems?.map(({label, subMenuItems, action, classes: menuItemClasses}: SubMenuItem) => {
        return subMenuItems
          ? (
            <PlaylistContextMenuItemWithSubmenu
              key={label}
              subMenuItems={subMenuItems}
              onMouseEnter={closePreviousSubmenuIfOpen}
            >
              {label}
            </PlaylistContextMenuItemWithSubmenu>
          ) : (
            <PlaylistContextMenuItem
              key={label}
              classes={menuItemClasses}
              onMouseEnter={closePreviousSubmenuIfOpen}
              onClick={action}
            >
              {label}
            </PlaylistContextMenuItem>
          )
      })}
    </ul>
  );
})
