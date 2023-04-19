import {FC, ForwardedRef, forwardRef} from "react";
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

  let closePreviousSubmenu: any = null;

  function closePreviousSubmenuIfOpen(closeSubmenu = null) {
    if (closePreviousSubmenu) {
      closePreviousSubmenu();
    }

    closePreviousSubmenu = closeSubmenu;
  }

  return (
    <ul ref={ref} className={classes}>
      {menuItems?.map(({label, subMenuItems, alternateLabel, classes}: SubMenuItem) => {
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
              classes={classes}
              alternateLabel={alternateLabel}
              onMouseEnter={closePreviousSubmenuIfOpen}
            >
              {label}
            </PlaylistContextMenuItem>
          )
      })}
    </ul>
  );
})
