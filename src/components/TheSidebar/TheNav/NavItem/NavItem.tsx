import {FC, MouseEvent, useRef} from "react";
import {Nullable} from "../../../../types";
import {INavItemType} from "./types";

export const NavItem: FC<INavItemType> = (
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
