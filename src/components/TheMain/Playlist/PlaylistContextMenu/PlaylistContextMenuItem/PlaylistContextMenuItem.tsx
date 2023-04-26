import {FC} from "react";
import {IMenuItem} from "./types";
import {BaseButton} from "../../../../common";

export const PlaylistContextMenuItem: FC<IMenuItem> = (
  {
    children: label,
    onMouseEnter: closePreviousSubmenuIfOpen,
    classes = '',
    onClick: handleClick = () => {
    }
  }) => {

  return (
    <li onMouseEnter={() => closePreviousSubmenuIfOpen()}>
      <BaseButton
        type="button"
        classes={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}
        onClick={handleClick}
      >
        {label}
      </BaseButton>
    </li>
  );
}
