import {FC, useState, MouseEvent} from "react";
import {PlaylistCover} from "./PlaylistCover";
import {PlaylistButtonPlay} from "./PlaylistButtonPlay";
import {PlaylistTitle} from "./PlaylistTitle";
import {PlaylistDescription} from "./PlaylistDescription";
import {PlaylistContextMenu} from "./PlaylistContextMenu";
import {SubMenuItem} from "./types";

const menuItems: SubMenuItem[] = [
    {
        label: 'Add to Your Library',
        subMenuItems: null,
    },
    {
        label: 'Share',
        subMenuItems: [
            {
                label: 'Copy link to playlist',
                subMenuItems: null,
            },
            {
                label: 'Embed playlist',
                subMenuItems: null,
            },
        ],
    },
    {
        label: 'About recommendations',
        subMenuItems: null,
    },
    {
        label: 'Open in Desktop app',
        subMenuItems: null,
    },
];

export interface IList {
    classes: string,
    title: string,
    description: string,
    coverUrl: string,
}

export const Playlist: FC<IList> = (
    {
        classes,
        coverUrl,
        title,
        description,
    }
) => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    const openContextMenu = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        setIsContextMenuOpen(true);
    }

    const closeContextMenu = (): void => {
        setIsContextMenuOpen(false);
    }

    return (
        <a
            href="/"
            className={`relative p-4 rounded-md bg-[#181818] hover:bg-[#272727] duration-200 group ${classes}`}
            onContextMenu={openContextMenu}
        >
            <div className="relative">
                <PlaylistCover url={coverUrl}/>
                <PlaylistButtonPlay/>
            </div>
            <PlaylistTitle title={title}/>
            <PlaylistDescription description={description}/>

            {isContextMenuOpen && (
                <PlaylistContextMenu
                    menuItems={menuItems}
                    classes="absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10"
                    onClose={closeContextMenu}
                />
            )}
        </a>
    );
}
