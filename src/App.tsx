import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";
import {useEffect, useRef, useState} from "react";

export function App() {

  const contentWrapperRef = useRef<any | null>(null)
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(true)

  function handleScrolling(event: any) {
    if (isScrollingEnabled) return

    event.preventDefault()
    event.stopPropagation()
  }

  function toggleScrolling(isEnable: boolean) {
    setIsScrollingEnabled(isEnable)
  }

  useEffect(() => {
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
