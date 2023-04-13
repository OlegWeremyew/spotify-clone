import {FC, useEffect} from "react";
import {PlaylistContextMenuItem} from "./PlaylistContextMenuItem";
import {SubMenuItem} from "../types";

export interface IContextMenu {
    menuItems: SubMenuItem[]
    classes: string
    onClose?: () => void
}

export const PlaylistContextMenu: FC<IContextMenu> = (
    {
        classes,
        menuItems,
        onClose = () => {
        },
    }
) => {

    useEffect(() => {
        document.addEventListener('mousedown', onClose);

        return () => {
            document.removeEventListener('mousedown', onClose);
        };
    });

    return (
        <ul className={classes}>
            {menuItems.map(({label, subMenuItems}: SubMenuItem) => (
                <PlaylistContextMenuItem key={label} subMenuItems={subMenuItems}>
                    {label}
                </PlaylistContextMenuItem>
            ))}
        </ul>
    );
}
