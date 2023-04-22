import {FC, MouseEvent, forwardRef, useState, useEffect, useLayoutEffect} from "react";
import {PlaylistCover} from "./PlaylistCover";
import {PlaylistButtonPlay} from "./PlaylistButtonPlay";
import {PlaylistTitle} from "./PlaylistTitle";
import {PlaylistDescription} from "./PlaylistDescription";
import {PlaylistContextMenu} from "./PlaylistContextMenu";
import {SubMenuItem} from "./types";
import {useContextMenu} from "../../../hooks";

export interface IList {
  classes: string
  title: string
  description: string
  coverUrl: string
  toggleScrolling: (isEnable: boolean) => void
}

const generateMenuItems = (isAlternate: boolean = false): SubMenuItem[] => {
  return [
    {
      label: 'Add to Your Library',
      subMenuItems: null,
    },
    {
      label: 'Share',
      subMenuItems: [
        {
          label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
          subMenuItems: null,
          classes: 'min-w-[150px]',
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
}

export const Playlist: FC<IList> = forwardRef((
  {
    classes,
    coverUrl,
    title,
    description,
    toggleScrolling,
  }
) => {
  const {
    openContextMenu: openMenu,
    isContextMenuOpen: isMenuOpen,
    contextMenuRef: menuRef
  } = useContextMenu()

  const [contextMenu, setContextMenu] = useState<SubMenuItem[]>(generateMenuItems())

  const bgClasses = isMenuOpen
    ? 'bg-[#272727]'
    : 'bg-[#181818] hover:bg-[#272727]'

  useLayoutEffect(() => toggleScrolling(!isMenuOpen), [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleAltKeydown({key}: KeyboardEvent): void {
      if (key === 'Alt') setContextMenu(generateMenuItems(true));
    }

    function handleAltKeyup({key}: KeyboardEvent): void {
      if (key === 'Alt') setContextMenu(generateMenuItems(false));
    }

    document.addEventListener('keydown', handleAltKeydown);
    document.addEventListener('keyup', handleAltKeyup);

    return () => {
      document.removeEventListener('keydown', handleAltKeydown);
      document.removeEventListener('keyup', handleAltKeyup);
    };
  });


  return (
    <a
      href="/"
      className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
      onClick={(event: MouseEvent) => event.preventDefault()}
      onContextMenu={openMenu}
    >
      <div className="relative">
        <PlaylistCover url={coverUrl}/>
        <PlaylistButtonPlay/>
      </div>
      <PlaylistTitle title={title}/>
      <PlaylistDescription description={description}/>

      {isMenuOpen && (
        <PlaylistContextMenu
          ref={menuRef}
          menuItems={contextMenu}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </a>
  );
})
