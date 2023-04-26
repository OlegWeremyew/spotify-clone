import {XMarkIcon} from '@heroicons/react/24/outline';
import {FC, useEffect, useRef, MouseEvent, ReactElement} from "react";
import {Nullable} from "../../../types";
import {useEvent} from "../../../hooks/useEvent/useEvent";
import ReactDOM from "react-dom";
import {IBaseModal} from "./types";

export const BaseModal: FC<IBaseModal> = ({onClose: handleClose, children, classes}): ReactElement => {

  const ref = useRef<Nullable<HTMLDivElement>>(null);
  const contentRef = useRef<Nullable<HTMLDivElement>>(null);
  useEvent('keydown', handleEsc)

  const animate = (isClosing: boolean = false): void => {
    ref?.current?.classList.toggle('opacity-0', isClosing);
    contentRef?.current?.classList.toggle('-translate-y-10', isClosing);
  }

  const close = (): void => {
    animate(true);

    setTimeout(handleClose, 500);
  }

  function handleEsc({key}: KeyboardEvent): void {
    if (key === 'Escape') close();
  }

  useEffect(() => {
    setTimeout(animate);
  });

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500"
      role="dialog"
      ref={ref}
      onClick={close}
    >
      <div
        className={`flex flex-col relative text-white rounded-xl -translate-y-10 transition-transform duration-500 ${classes}`}
        ref={contentRef}
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <button
          type='button'
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8"/>
        </button>
        {children}
      </div>
    </div>
    , document.body)

}
