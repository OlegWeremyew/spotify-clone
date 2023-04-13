import {FC} from "react";
import {ChevronRightIcon} from "@heroicons/react/outline";
import {PlaylistContextMenu} from "../PlaylistContextMenu";
import {SubMenuItem} from "../../types";

export interface IMenuItem {
    children: string
    subMenuItems?: SubMenuItem[] | null
}

export const PlaylistContextMenuItem: FC<IMenuItem> = ({children: label, subMenuItems}) => {
    if (subMenuItems) {
        return (
            <li className="relative">
                <button
                    type="button"
                    className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center peer"
                >
                    {label} <ChevronRightIcon className="h-4 w-4"/>
                </button>
                <PlaylistContextMenu
                    menuItems={subMenuItems}
                    classes="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default invisible peer-hover:visible hover:visible"
                />
            </li>
        );
    }

    return (
        <li>
            <button className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
                {label}
            </button>
        </li>
    );
}
