import {FC} from "react";

export interface IMenuItem {
  children: string
}

export const PlaylistContextMenuItem: FC<IMenuItem> = ({children: label}) => {

  return (
    <li>
      <button
        type="button"
        className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
        {label}
      </button>
    </li>
  );
}
