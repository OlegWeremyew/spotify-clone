import React, {FC, ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {BaseButton} from "../BaseButton";
import {Nullable} from "../../../types";
import {BasePopoverTriangle} from "../BasePopoverTriangle";
import {usePopoverPosition} from "../../../hooks/usePopoverPosition/usePopoverPosition";
import {useClickAway} from "../../../hooks/useClickAway/useClickAway";
import {IBasePopover} from "./types";

export const BasePopover: FC<IBasePopover> = forwardRef((_, ref) => {

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const nodeRef = useRef<Nullable<HTMLDivElement>>(null);
  const {move, target, setTarget, isSmallScreen} = usePopoverPosition(nodeRef, hide)
  const [classes, setClasses] = useState<string>(getHiddenClasses);

  useClickAway(nodeRef, hide, shouldHide)

  useImperativeHandle(ref, () => ({
    show,
  }))

  function shouldHide(event: MouseEvent): boolean {
    return !target?.parentNode?.contains(event.target as Node)
  }


  function getHiddenClasses(): string {
    const translateClasses = isSmallScreen ? 'translate-y-1' : 'translate-x-1'
    return `opacity-0 ${translateClasses} pointer-events-none`
  }

  const show = (title: string, description: string, nextTarget: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null): void => {

    if (target === nextTarget) return

    move(nextTarget, offset)

    setClasses('');
    setTitle(title);
    setDescription(description);
  }

  function hide(): void {
    setTarget(null)
    setClasses(getHiddenClasses);
  }

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

      <BasePopoverTriangle side={isSmallScreen ? 'top' : 'left'}/>
    </div>
  );
});
