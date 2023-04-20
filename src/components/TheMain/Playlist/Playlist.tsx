import {FC, useState, MouseEvent, useRef, forwardRef, useLayoutEffect, useEffect} from "react";
import {PlaylistCover} from "./PlaylistCover";
import {PlaylistButtonPlay} from "./PlaylistButtonPlay";
import {PlaylistTitle} from "./PlaylistTitle";
import {PlaylistDescription} from "./PlaylistDescription";
import {PlaylistContextMenu} from "./PlaylistContextMenu";
import {SubMenuItem} from "./types";
import {Nullable} from "../../../types";

const generateContentMenuItems = (isAlternate: boolean = false): SubMenuItem[] => {
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

export interface IList {
  classes: string
  title: string
  description: string
  coverUrl: string
  toggleScrolling: (isEnable: boolean) => void
}

export type ClickPositionType = {
  x: number
  y: number
}

const clickPosition: ClickPositionType = {
  x: 0,
  y: 0
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

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuItems, setContextMenuItems] = useState<SubMenuItem[]>(generateContentMenuItems())

  const contextMenuRef = useRef<Nullable<HTMLUListElement>>(null)

  const bgClasses = isContextMenuOpen ? 'bg-[#272727]' : 'bg-[#181818] hover:bg-[#272727]'

  const openContextMenu = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    clickPosition.x = event.clientX
    clickPosition.y = event.clientY

    setIsContextMenuOpen(true);
  }

  const closeContextMenu = (): void => {
    setIsContextMenuOpen(false);
  }

  const updateContextMenuHorizontalPosition = (): void => {
    if (!contextMenuRef.current) return

    const menuWidth = contextMenuRef.current?.offsetWidth
    const shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x

    contextMenuRef.current.style.left = shouldMoveLeft
      ? `${clickPosition.x - menuWidth}px`
      : `${clickPosition.x}px`
  }

  const updateContextMenuVerticalPosition = (): void => {
    if (!contextMenuRef.current) return

    const menuHeight = contextMenuRef.current?.offsetHeight
    const shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y

    contextMenuRef.current.style.top = shouldMoveUp
      ? `${clickPosition.y - menuHeight}px`
      : `${clickPosition.y}px`
  }

  const updateContextMenuPosition = (): void => {
    if (!contextMenuRef.current) return

    updateContextMenuHorizontalPosition()
    updateContextMenuVerticalPosition()
  }

  useLayoutEffect(() => {
    toggleScrolling(!isContextMenuOpen)

    if (isContextMenuOpen) {
      updateContextMenuPosition()
    }
  })

  useEffect(() => {
    if (!isContextMenuOpen) return

    const handleClickAway = ({target}: Event): void => {

      if (!contextMenuRef.current?.contains(target as Node)) {
        closeContextMenu()
      }
    }

    const handleEsc = ({key}: KeyboardEvent): void => {
      if (key === "Escape") {
        closeContextMenu()
      }
    }

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  useEffect(() => {

    function handleAltKeydown({key}: KeyboardEvent): void {
      if (key === 'Alt' && isContextMenuOpen) setContextMenuItems(generateContentMenuItems(true));
    }

    function handleAltKeyup({key}: KeyboardEvent): void {
      if (key === 'Alt' && isContextMenuOpen) setContextMenuItems(generateContentMenuItems(false));
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
          ref={contextMenuRef}
          menuItems={contextMenuItems}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </a>
  );
})
