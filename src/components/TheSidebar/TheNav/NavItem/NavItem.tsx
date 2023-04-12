import {FC, ReactNode} from "react";

type NavItemType = {
  classes: string,
  icon: ReactNode,
  children: string,
}

export const NavItem: FC<NavItemType> = (
  {
    classes,
    icon,
    children: label,
  }
) => {
  return (
    <a href="/GitHub/spotify/public" className={classes}>
      {icon}
      <span className="ml-4 text-sm font-semibold">{label}</span>
    </a>
  );
}
