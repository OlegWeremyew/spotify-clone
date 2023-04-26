import {useState} from "react";
import {ReturnType} from "./types";

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
