import {useState} from "react";

export type ReturnType = {
  open: () => void
  close: () => void
  isOpen: boolean
}

export const useModal = (): ReturnType => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open(): void {
    setIsOpen(true);
  }

  function close(): void {
    setIsOpen(false);
  }

  return {open, close, isOpen}
}
