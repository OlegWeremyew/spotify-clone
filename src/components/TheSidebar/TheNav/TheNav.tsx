import {
  HomeIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  PlusCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {FC} from "react";
import {NavItem} from "./NavItem";
import {Nullable} from "../../../types";
import {MIN_DESKTOP_WIDTH, MOCK_DEFAULT_FUNCTION} from "../../../constants";
import {ITheNav, NavItemType} from "./types";

const activeNavItemClasses =
  'flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded';
const navItemClasses =
  'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300';

export const TheNav: FC<ITheNav> = ({showPopover}) => {

  const navItems: NavItemType[] = [
    {
      label: 'Home',
      classes: activeNavItemClasses,
      icon: <HomeIcon className="h-6 w-6"/>,
    },
    {
      label: 'Search',
      classes: navItemClasses,
      icon: <MagnifyingGlassIcon className="h-6 w-6"/>,
    },
    {
      label: 'Your Library',
      classes: `${navItemClasses} mb-6`,
      icon: <ViewColumnsIcon className="h-6 w-6"/>,
      action: (target: Nullable<HTMLSpanElement>) => {
        showPopover(
          'Enjoy Your Library',
          'Log in to see saved songs, podcasts, artists, and playlists in Your Library.',
          target,
          null,
        );
      },
    },
    {
      label: 'Create Playlist',
      classes: navItemClasses,
      icon: <PlusCircleIcon className="h-6 w-6"/>,
      action: (target: Nullable<HTMLSpanElement>) => {
        showPopover(
          'Create a playlist',
          'Log in to create and share playlists.',
          target,
          null,
        );
      },
    },
    {
      label: 'Liked Songs',
      classes: navItemClasses,
      icon: <HeartIcon className="h-6 w-6"/>,
      action: (target: Nullable<HTMLSpanElement>) => {
        if (!target) return

        let offset: { top: number, left: number } | null = null

        if (window.innerWidth >= MIN_DESKTOP_WIDTH) {
          const LEFT_SHIFT = 125
          const {top, right, height} = target.getBoundingClientRect()
          offset = {top: top - (height / 3) * 2, left: right + LEFT_SHIFT}
        }

        showPopover(
          'Enjoy your Liked Songs',
          "Log in to see all the songs you've liked in one easy playlist.",
          target,
          offset,
        );
      },
    },
  ];

  return (
    <nav>
      {navItems.map(({label, classes, icon, action = MOCK_DEFAULT_FUNCTION}: NavItemType) => (
        <NavItem
          key={label}
          classes={classes}
          icon={icon}
          onClick={action}
        >
          {label}
        </NavItem>
      ))}
    </nav>
  );
}
