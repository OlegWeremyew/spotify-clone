import React, {FC, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {BaseButton} from "../BaseButton";
import {Nullable} from "../../../types";

export interface IBasePopover {
  ref: ForwardedRef<{ show: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null) => void, }>
}

const HIDDEN_CLASSES = 'opacity-0 translate-x-1 pointer-events-none'

export const BasePopover: FC<IBasePopover> = forwardRef((_, ref) => {
  const [classes, setClasses] = useState<string>(HIDDEN_CLASSES);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [target, setTarget] = useState<Nullable<HTMLSpanElement>>(null)
  const nodeRef = useRef<Nullable<HTMLDivElement>>(null);

  useImperativeHandle(ref, () => ({
    show,
  }))

  const show = (title: string, description: string, nextTarget: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null): void => {

    if (target === nextTarget) {
      return
    }

    moveTo(nextTarget, offset)
    setClasses('');
    setTarget(nextTarget)
    setTitle(title);
    setDescription(description);
  }

  const hide = (): void => {
    setTarget(null)
    setClasses(HIDDEN_CLASSES);
  }

  const moveTo = (target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null): void => {
    if (!nodeRef.current || !target) return

    if (!offset) {
      const {top, right, height} = target.getBoundingClientRect();

      offset = {
        top: top - (height / 3) * 2,
        left: right + 30,
      };
    }

    nodeRef.current.style.top = `${offset.top}px`;
    nodeRef.current.style.left = `${offset.left}px`;
  }

  useEffect(() => {
    if (!target) return

    function handleClickAway(event: MouseEvent) {
      if (target?.parentNode?.contains(event?.target as Node)) return

      if (!nodeRef?.current?.contains(event.target as Node)) {
        hide()
      }
    }

    document.addEventListener('mousedown', handleClickAway);

    return () => document.removeEventListener('mousedown', handleClickAway);
  });

  return (
    <div
      className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none transition duration-300 ${classes}`}
      ref={nodeRef}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-xs">{description}</p>
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
});
