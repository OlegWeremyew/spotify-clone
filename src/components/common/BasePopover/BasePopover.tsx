import React, {FC, useEffect, useRef, useState} from 'react';
import {BaseButton} from "../BaseButton";
import {Nullable} from "../../../types";

export const BasePopover: FC<any> = () => {
  const [classes, setClasses] = useState<string>('');
  const ref = useRef<Nullable<HTMLDivElement>>(null);

  const hide = (): void => {
    setClasses('opacity-0 pointer-events-none');
  }

  useEffect(() => {
    function handleClickAway({target}: MouseEvent) {
      if (!ref?.current?.contains(target as Node)) {
        hide()
      }
    }

    document.addEventListener('mousedown', handleClickAway);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  return (
    <div
      className={`fixed top-[227px] left-[215px] z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 min-w-[330px] select-none transition duration-300 ${classes}`}
      ref={ref}
    >
      <h3 className="text-lg font-bold mb-2">Create a playlist</h3>
      <p className="text-xs">Log in to create and share playlists.</p>
      <div className="mt-6 text-right">
        <BaseButton onClick={hide}>Not now</BaseButton>
        <BaseButton primary>Log in</BaseButton>
      </div>
      <div
        className="w-20 h-20 absolute -top-4 -left-20 flex justify-end items-center overflow-hidden pointer-events-none">
        <div className="w-3 h-3 bg-[#0e72ea] translate-x-1/2 rotate-45 shadow-3xl pointer-events-auto"></div>
      </div>
    </div>
  );
};
