import React, {FC, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {TimeoutType} from "../../../types";
import {IBaseToast} from "./types";

export const BaseToast: FC<IBaseToast> = forwardRef((props, ref) => {

  const [message, setMessage] = useState<string>("")
  const [opacityClass, setOpacityClass] = useState<string>('opacity-0')
  const hideTimer = useRef<TimeoutType>(undefined)

  useImperativeHandle(ref, () => ({
    show: (message: string): void => {
      clearTimeout(hideTimer.current)
      setOpacityClass('opacity-1')

      setMessage(message)

      hideTimer.current = setTimeout(() => setOpacityClass('opacity-0'), 3000)
    },
  }))

  return (
    <div
      className={`fixed left-1/2 bottom-28 -translate-x-1/2 z-30 bg-[#2e76d0] text-white tracking-wide whitespace-nowrap rounded-lg shadow-3xl py-3 px-8 pointer-events-none transition-opacity duration-700 ${opacityClass}`}
    >
      {message}
    </div>
  );
})

