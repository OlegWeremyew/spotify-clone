import {FC, MouseEvent, forwardRef, useState, useEffect, useLayoutEffect} from "react";
import {useMenu} from "../../../hooks/useMenu";
import {PlaylistCover} from "./PlaylistCover";
import {PlaylistButtonPlay} from "./PlaylistButtonPlay";
import {PlaylistTitle} from "./PlaylistTitle";
import {PlaylistDescription} from "./PlaylistDescription";
import {PlaylistContextMenu} from "./PlaylistContextMenu";
import {SubMenuItem} from "./types";

export interface IList {
  classes: string
  title: string
  description: string
  coverUrl: string
  toggleScrolling: (isEnable: boolean) => void
  showToast: (message: string) => void
}

export const Playlist: FC<IList> = forwardRef((
  {
    classes,
    coverUrl,
    title,
    description,
    toggleScrolling,
    showToast,
  }
) => {
  const generateMenuItems = (isAlternate: boolean = false): SubMenuItem[] => {
    return [
      {
        label: 'Add to Your Library',
        subMenuItems: null,
        action: () => {
          menu.close()
          document.querySelector<HTMLAnchorElement>('nav a:nth-child(4)')?.click();
        },
      },
      {
        label: 'Share',
        subMenuItems: [
          {
            label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
            subMenuItems: null,
            classes: 'min-w-[150px]',
            action: () => {
              navigator.clipboard.writeText(title).then(() => {
                showToast('Link copy to clipboard')
                menu.close()
              })
            }
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

  const [menuItems, setMenuItems] = useState<SubMenuItem[]>(generateMenuItems)
  const menu = useMenu(menuItems)

  const bgClasses = menu.isOpen
    ? 'bg-[#272727]'
    : 'bg-[#181818] hover:bg-[#272727]'

  useLayoutEffect(() => toggleScrolling(!menu.isOpen), [menu.isOpen])

  useEffect(() => {
    if (!menu.isOpen) return

    function handleAltKeydown({key}: KeyboardEvent): void {
      if (key === 'Alt') setMenuItems(generateMenuItems(true));
    }

    function handleAltKeyup({key}: KeyboardEvent): void {
      if (key === 'Alt') setMenuItems(generateMenuItems(false));
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
      onContextMenu={menu.open}
    >
      <div className="relative">
        <PlaylistCover url={coverUrl}/>
        <PlaylistButtonPlay/>
      </div>
      <PlaylistTitle title={title}/>
      <PlaylistDescription description={description}/>

      {menu.isOpen && (
        <PlaylistContextMenu
          ref={menu.ref}
          menuItems={menu.items}
          classes="fixed divide-y divide-[#3e3e3e]"
        />
      )}
    </a>

  );
})
