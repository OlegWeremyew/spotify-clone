import {FC, ForwardedRef, forwardRef, useEffect} from "react";
import {PlaylistContextMenuItem} from "./PlaylistContextMenuItem";
import {SubMenuItem} from "../types";

export interface IContextMenu {
  menuItems: SubMenuItem[]
  classes: string
  onClose?: () => void
  ref: ForwardedRef<HTMLUListElement>
}

//if callback ONCLOSE was not transferred
const mockFn = () => {
}

export const PlaylistContextMenu: FC<IContextMenu> = forwardRef((
  {
    classes,
    menuItems,
    onClose: handleClose = mockFn
  }, ref) => {


  useEffect(() => {
    if (!handleClose) return

    const handleClickAway = (event: MouseEvent) => {
      // @ts-ignore
      if (!ref.current?.contains(event.target as Node)) {
        handleClose()
      }
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  return (
    <ul className={classes} ref={ref}>
      {menuItems.map(({label, subMenuItems}: SubMenuItem) => (
        <PlaylistContextMenuItem key={label} subMenuItems={subMenuItems}>
          {label}
        </PlaylistContextMenuItem>
      ))}
    </ul>
  );
})
