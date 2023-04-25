import React, {FC, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {BaseButton} from "../BaseButton";
import {Nullable, TimeoutType} from "../../../types";
import {BasePopoverTriangle} from "../BasePopoverTriangle";
import {debounce} from "../../../utils/debounce";
import {MIN_DESKTOP_WIDTH} from "../../../constants";

export interface IBasePopover {
  ref: ForwardedRef<{ show: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null) => void, }>
}

const isCurrentWindowWidthSmall = (): boolean => window.innerWidth < MIN_DESKTOP_WIDTH
const isCurrentWindowWidthBig = (): boolean => window.innerWidth >= MIN_DESKTOP_WIDTH

export const BasePopover: FC<IBasePopover> = forwardRef((_, ref) => {

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(isCurrentWindowWidthSmall)
  const [classes, setClasses] = useState<string>(getHiddenClasses);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [target, setTarget] = useState<Nullable<HTMLSpanElement>>(null)
  const nodeRef = useRef<Nullable<HTMLDivElement>>(null);
  let changeWidthTimer = useRef<TimeoutType>(undefined)

  useImperativeHandle(ref, () => ({
    show,
  }))

  function getHiddenClasses(): string {
    const translateClasses = isSmallScreen ? 'translate-y-1' : 'translate-x-1'
    return `opacity-0 ${translateClasses} pointer-events-none`
  }

  const show = (title: string, description: string, nextTarget: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null): void => {

    if (target === nextTarget) return

    moveTo(offset ? offset : calculateTargetOffset(nextTarget))

    setClasses('');
    setTarget(nextTarget)
    setTitle(title);
    setDescription(description);
  }

  const hide = (): void => {
    setTarget(null)
    setClasses(getHiddenClasses);
  }

  const moveTo = (offset: { top: number, left: number } | null): void => {
    if (!nodeRef.current || !offset) return

    nodeRef.current.style.top = `${offset.top}px`;
    nodeRef.current.style.left = `${offset.left}px`;
  }

  const calculateTargetOffset = (target: Nullable<HTMLSpanElement>): { top: number, left: number } | null => {
    if (!target) return null

    const {top, right, height, left} = target.getBoundingClientRect();

    return {
      top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
      left: isSmallScreen ? left : right + 30,
    };
  }

  const screenHasBecomeSmall = (): boolean => isCurrentWindowWidthSmall() && !isSmallScreen
  const screenHasBecomeBig = (): boolean => isCurrentWindowWidthBig() && isSmallScreen

  useEffect(() => {

    function handleResize(): void {
      if (!screenHasBecomeSmall() && !screenHasBecomeBig()) return

      hide()
      clearTimeout(changeWidthTimer.current)

      changeWidthTimer.current = setTimeout(() => {
        setIsSmallScreen(isCurrentWindowWidthSmall)
      }, 300)

    }

    function handleClickAway(event: MouseEvent): void {
      if (target?.parentNode?.contains(event.target as Node)) return

      if (!nodeRef?.current?.contains(event.target as Node)) {
        hide()
      }
    }

    const debounceResize = debounce.bind(null, handleResize, 300)

    document.addEventListener('mousedown', handleClickAway);
    window.addEventListener('resize', debounceResize);

    return () => {
      document.removeEventListener('mousedown', handleClickAway)
      window.removeEventListener('resize', debounceResize)
    };
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

      <BasePopoverTriangle side={isSmallScreen ? 'top' : 'left'}/>
    </div>
  );
});
