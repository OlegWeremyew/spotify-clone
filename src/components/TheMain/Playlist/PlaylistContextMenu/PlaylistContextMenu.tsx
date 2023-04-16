import {FC, ForwardedRef, forwardRef} from "react";
import {PlaylistContextMenuItem} from "./PlaylistContextMenuItem";
import {SubMenuItem} from "../types";

export interface IContextMenu {
  menuItems: SubMenuItem[]
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
      {menuItems.map(({label, subMenuItems}: SubMenuItem) => (
        <PlaylistContextMenuItem key={label} subMenuItems={subMenuItems}>
          {label}
        </PlaylistContextMenuItem>
      ))}
    </ul>
  );
})
