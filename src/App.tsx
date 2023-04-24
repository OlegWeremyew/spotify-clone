import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";
import {useEffect, useRef, useState} from "react";
import {BasePopover, BaseToast} from "./components/common";
import {Nullable} from "./types";

export const App = () => {

  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(true)

  const contentWrapperRef = useRef<HTMLDivElement | null>(null)
  const toastRef = useRef<Nullable<any>>(null)

  const toggleScrolling = (isEnable: boolean): void => {
    setIsScrollingEnabled(isEnable)
  }

  const handleScrolling = (event: WheelEvent): void => {
    if (isScrollingEnabled) return

    event.preventDefault()
    event.stopPropagation()
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
        <TheSidebar/>
        <TheSidebarOverlay/>
        <div
          ref={contentWrapperRef}
          className="flex-1 overflow-auto"
        >
          <TheHeader/>
          <TheMain toggleScrolling={toggleScrolling} showToast={showToast}/>
        </div>
      </div>
      <TheRegistration/>

      <BaseToast ref={toastRef}/>
      <BasePopover/>
    </>
  );
}
