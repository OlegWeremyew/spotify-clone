import {FC, MouseEvent, forwardRef, useState, useLayoutEffect} from "react";
import {useMenu} from "../../../hooks/useMenu";
import {PlaylistCover} from "./PlaylistCover";
import {PlaylistButtonPlay} from "./PlaylistButtonPlay";
import {PlaylistTitle} from "./PlaylistTitle";
import {PlaylistDescription} from "./PlaylistDescription";
import {PlaylistContextMenu} from "./PlaylistContextMenu";
import {IList, SubMenuItem} from "./types";
import {useEvent} from "../../../hooks/useEvent/useEvent";
import {TheModalRecommendations} from "../../TheModalRecommendations";
import {useModal} from "../../../hooks/useModal/useModal";
import {TheModalEmbedPlaylist} from "../../TheModalEmbedPlaylist";

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
            action: () => {
              menu.close();
              embedPlaylistModal.open();
            },
          },
        ],
      },
      {
        label: 'About recommendations',
        subMenuItems: null,
        action: () => {
          menu.close();
          recommendationsModal.open();
        },
      },
      {
        label: 'Open in Desktop app',
        subMenuItems: null,
      },
    ];
  }

  const [menuItems, setMenuItems] = useState<SubMenuItem[]>(generateMenuItems)

  const menu = useMenu(menuItems)
  const embedPlaylistModal = useModal();
  const recommendationsModal = useModal();

  useEvent('keydown', handleAltKeydown, menu.isOpen)
  useEvent('keyup', handleAltKeyup, menu.isOpen)

  const bgClasses = menu.isOpen
    ? 'bg-[#272727]'
    : 'bg-[#181818] hover:bg-[#272727]'

  useLayoutEffect(() => toggleScrolling(!menu.isOpen), [menu.isOpen])

  function handleAltKeydown({key}: KeyboardEvent): void {
    if (key === 'Alt') setMenuItems(generateMenuItems(true));
  }

  function handleAltKeyup({key}: KeyboardEvent): void {
    if (key === 'Alt') setMenuItems(generateMenuItems(false));
  }

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

      {recommendationsModal.isOpen && (
        <TheModalRecommendations onClose={recommendationsModal.close}/>
      )}
      {embedPlaylistModal.isOpen && (
        <TheModalEmbedPlaylist onClose={embedPlaylistModal.close}/>
      )}
    </a>
  );
})
