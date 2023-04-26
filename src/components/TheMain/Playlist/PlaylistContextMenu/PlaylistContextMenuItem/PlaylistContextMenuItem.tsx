import {FC} from "react";
import {IMenuItem} from "./types";

export const PlaylistContextMenuItem: FC<IMenuItem> = (
  {
    children: label,
    onMouseEnter: closePreviousSubmenuIfOpen,
    classes = '',
    onClick: handleClick = () => {
    }
  }) => (
  <li onMouseEnter={() => closePreviousSubmenuIfOpen()}>
    <button
      type="button"
      className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}
      onClick={handleClick}
    >
      {label}
    </button>
  </li>
);
