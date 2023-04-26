import {TheHeader, TheMain, TheRegistration, TheSidebar, TheSidebarOverlay} from "./components";
import {useRef, useState} from "react";
import {BasePopover, BaseToast} from "./components/common";
import {Nullable, OffsetType} from "./types";
import {useEvent} from "./hooks/useEvent/useEvent";
import {Events} from "./enums";

export const App = () => {

  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(true)

  const contentWrapperRef = useRef<Nullable<HTMLDivElement>>(null)
  const toastRef = useRef<Nullable<{ show: (message: string) => void, }>>(null)
  const popoverRef = useRef<Nullable<{
    show: (
      title: string,
      description: string,
      target: Nullable<HTMLSpanElement>,
      offset: OffsetType,
    ) => void,
  }>>(null)

  useEvent(Events.WHEEL, handleScrolling, true, contentWrapperRef.current)

  const toggleScrolling = (isEnable: boolean): void => {
    setIsScrollingEnabled(isEnable)
  }

  function handleScrolling(event: WheelEvent): void {
    if (isScrollingEnabled) return

    event.preventDefault()
    event.stopPropagation()
  }

  function showPopover(
    title: string,
    description: string,
    target: Nullable<HTMLSpanElement>,
    offset: OffsetType
  ): void {
    if (!popoverRef.current) return

    popoverRef.current.show(title, description, target, offset)
  }

  function showToast(message: string): void {
    if (!toastRef.current) return

    toastRef.current.show(message)
  }

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
