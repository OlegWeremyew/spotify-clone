import {FC, useEffect, useState} from "react";

export interface IMenuItem {
  children: string
  onMouseEnter: () => void,
  alternateLabel?: string
  classes?: string
}

export const PlaylistContextMenuItem: FC<IMenuItem> = (
  {
    children: originalLabel,
    onMouseEnter: closePreviousSubmenuIfOpen,
    alternateLabel = '',
    classes = '',
  }) => {

  const [label, setLabel] = useState<string>(originalLabel);

  useEffect(() => {
    if (!alternateLabel) return;

    function handleAltKeydown({key}: KeyboardEvent) {
      if (key === 'Alt') setLabel(alternateLabel);
    }

    function handleAltKeyup({key}: KeyboardEvent) {
      if (key === 'Alt') setLabel(originalLabel);
    }

    document.addEventListener('keydown', handleAltKeydown);
    document.addEventListener('keyup', handleAltKeyup);

    return () => {
      document.removeEventListener('keydown', handleAltKeydown);
      document.removeEventListener('keyup', handleAltKeyup);
    };
  });

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
