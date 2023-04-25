import {FC, ReactNode, MouseEvent, useRef} from "react";
import {Nullable} from "../../../../types";

type NavItemType = {
  classes: string,
  icon: ReactNode,
  children: string,
  onClick: (target: Nullable<HTMLSpanElement>) => void,
}

export const NavItem: FC<NavItemType> = (
  {
    classes,
    icon,
    children: label,
    onClick,
  }) => {

  const labelRef = useRef<Nullable<HTMLSpanElement>>(null)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    onClick(labelRef.current)
  }

  return (
    <a href="/GitHub/spotify/public" className={classes} onClick={handleClick}>
      {icon}
      <span ref={labelRef} className="ml-4 text-sm font-semibold">{label}</span>
    </a>
  );
}
