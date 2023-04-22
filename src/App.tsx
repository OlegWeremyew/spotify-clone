import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";
import {useEffect, useRef, useState} from "react";

export const App = () => {

  const contentWrapperRef = useRef<HTMLDivElement | null>(null)
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(true)

  const toggleScrolling = (isEnable: boolean): void => {
    setIsScrollingEnabled(isEnable)
  }

  const handleScrolling = (event: WheelEvent): void => {
    if (isScrollingEnabled) return

    event.preventDefault()
    event.stopPropagation()
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
          <TheMain toggleScrolling={toggleScrolling}/>
        </div>
      </div>
      <TheRegistration/>
    </>
  );
}
