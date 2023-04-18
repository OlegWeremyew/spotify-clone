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

  return (
    <ul ref={ref} className={classes}>
      {menuItems?.map(({label, subMenuItems}: SubMenuItem) => {
        return subMenuItems
          ? (
            <PlaylistContextMenuItemWithSubmenu key={label} subMenuItems={subMenuItems}>
              {label}
            </PlaylistContextMenuItemWithSubmenu>
          ) : (
            <PlaylistContextMenuItem key={label}>
              {label}
            </PlaylistContextMenuItem>
          )
      })
      }
    </ul>
  );
})
