import {
  HomeIcon,
  SearchIcon,
  ViewBoardsIcon,
  PlusCircleIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import {FC, ReactNode} from "react";
import {NavItem} from "./NavItem/NavItem";
import {Nullable} from "../../../types";

type NavItemType = {
  label: string,
  classes: string,
  icon: ReactNode,
  action?: (target: Nullable<HTMLSpanElement>) => void
}

const activeNavItemClasses =
  'flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded';
const navItemClasses =
  'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300';

export interface ITheNav {
  showPopover: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null) => void
}

const mock = () => {}

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
      icon: <SearchIcon className="h-6 w-6"/>,
    },
    {
      label: 'Your Library',
      classes: `${navItemClasses} mb-6`,
      icon: <ViewBoardsIcon className="h-6 w-6"/>,
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

        const LEFT_SHIFT = 125
        const {top, right, height} = target.getBoundingClientRect()
        const offset = {top: top - (height / 3) * 2, left: right + LEFT_SHIFT}

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
      {navItems.map(({label, classes, icon, action = mock}: NavItemType) => (
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
