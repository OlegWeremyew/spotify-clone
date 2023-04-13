import {FC, useState, MouseEvent, useRef, forwardRef, useEffect} from "react";
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
  classes: string
  title: string
  description: string
  coverUrl: string
}

export type ClickPositionType = {
  x: null | number
  y: null | number
}

const clickPosition: ClickPositionType = {
  x: null,
  y: null
}

export const Playlist: FC<IList> = forwardRef((
  {
    classes,
    coverUrl,
    title,
    description,
  }
) => {

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const contextMenuRef = useRef<HTMLUListElement | null>(null)

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

  const updateContextMenuPosition = (): void => {
    if (contextMenuRef.current) {
      contextMenuRef.current.style.top = `${clickPosition.y}px`
      contextMenuRef.current.style.left = `${clickPosition.x}px`
    }
  }

  useEffect(() => {
    if (isContextMenuOpen) {
      updateContextMenuPosition()
    }
  })

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
          menuItems={menuItems}
          classes="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10"
          onClose={closeContextMenu}
        />
      )}
    </a>
  );
})
