import {Nullable, TimeoutType} from "../../types";
import {RefObject, useEffect, useRef, useState} from "react";
import {MIN_DESKTOP_WIDTH} from "../../constants";
import {debounce} from "../../utils/debounce";

type ReturnType = {
  move: (target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null) => void
  target: Nullable<HTMLSpanElement>
  setTarget: (target: Nullable<HTMLSpanElement>) => void
  isSmallScreen: boolean
}

const isCurrentWindowWidthSmall = (): boolean => window.innerWidth < MIN_DESKTOP_WIDTH
const isCurrentWindowWidthBig = (): boolean => window.innerWidth >= MIN_DESKTOP_WIDTH

export const usePopoverPosition = (ref: Nullable<RefObject<HTMLDivElement>>, screenChangeCallback: () => void): ReturnType => {

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(isCurrentWindowWidthSmall)
  const [target, setTarget] = useState<Nullable<HTMLSpanElement>>(null)
  let changeWidthTimer = useRef<TimeoutType>(undefined)

  const screenHasBecomeSmall = (): boolean => isCurrentWindowWidthSmall() && !isSmallScreen
  const screenHasBecomeBig = (): boolean => isCurrentWindowWidthBig() && isSmallScreen

  useEffect(() => {
    function handleResize(): void {
      if (!screenHasBecomeSmall() && !screenHasBecomeBig()) return

      screenChangeCallback()
      clearTimeout(changeWidthTimer.current)

      changeWidthTimer.current = setTimeout(() => {
        setIsSmallScreen(isCurrentWindowWidthSmall)
      }, 300)

    }

    const debounceResize = debounce.bind(null, handleResize, 300)

    window.addEventListener('resize', debounceResize);

    return () => window.removeEventListener('resize', debounceResize)
  })

  const calculateTargetOffset = (target: Nullable<HTMLSpanElement>): { top: number, left: number } | null => {
    if (!target) return null

    const {top, right, height, left} = target.getBoundingClientRect();

    return {
      top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
      left: isSmallScreen ? left : right + 30,
    };
  }

  const move = (target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null): void => {
    if (!ref?.current) return
    offset = offset || calculateTargetOffset(target);

    ref.current.style.top = `${offset?.top}px`;
    ref.current.style.left = `${offset?.left}px`;

    setTarget(target);
  }

  return {move, target, setTarget, isSmallScreen}
}
