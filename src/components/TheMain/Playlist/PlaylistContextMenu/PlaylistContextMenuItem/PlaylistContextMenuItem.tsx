import {FC} from "react";

export interface IMenuItem {
  children: string
  onMouseEnter: () => void,
  classes?: string
}

export const PlaylistContextMenuItem: FC<IMenuItem> = (
  {
    children: label,
    onMouseEnter: closePreviousSubmenuIfOpen,
    classes = '',
  }) => {

  return (
    <li onMouseEnter={() => closePreviousSubmenuIfOpen()}>
      <button
        type="button"
        className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}
      >
        {label}
      </button>
    </li>
  );
}
