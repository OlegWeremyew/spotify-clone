import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";
import {useEffect, useRef, useState} from "react";
import {BasePopover, BaseToast} from "./components/common";
import {Nullable} from "./types";

export const App = () => {

  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(true)

  const contentWrapperRef = useRef<HTMLDivElement | null>(null)
  const toastRef = useRef<Nullable<{ show: (message: string) => void, }>>(null)
  const popoverRef = useRef<Nullable<{ show: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: { top: number, left: number } | null) => void, }>>(null)

  const toggleScrolling = (isEnable: boolean): void => {
    setIsScrollingEnabled(isEnable)
  }

  const handleScrolling = (event: WheelEvent): void => {
    if (isScrollingEnabled) return

    event.preventDefault()
    event.stopPropagation()
  }

  function showPopover(
    title: string,
    description: string,
    target: Nullable<HTMLSpanElement>,
    offset: { top: number, left: number } | null
  ): void {
    if (!popoverRef.current) return

    popoverRef.current.show(title, description, target, offset)
  }

  function showToast(message: string): void {
    if (!toastRef.current) return

    toastRef.current.show(message)
  }

  useEffect(() => {
    if (!contentWrapperRef.current) return

    const contentWrapper = contentWrapperRef.current
    contentWrapper.addEventListener('wheel', handleScrolling)

    return () => contentWrapper.removeEventListener('wheel', handleScrolling)
  })

  return (
    <>
      <div className="flex grow overflow-auto">
        <TheSidebar showPopover={showPopover}/>
        <TheSidebarOverlay/>
        <div
          ref={contentWrapperRef}
          className="flex-1 overflow-auto"
        >
          <TheHeader/>
          <TheMain
            toggleScrolling={toggleScrolling}
            showToast={showToast}
          />
        </div>
      </div>
      <TheRegistration/>

      <BaseToast ref={toastRef}/>
      <BasePopover ref={popoverRef}/>
    </>
  );
}
