import {FC, ReactNode} from "react";

export interface IBaseButton {
  primary?: boolean
  accent?: boolean
  classes?: string
  onClick?: () => void
  children: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const mock = (): void => {
}

export const BaseButton: FC<IBaseButton> = (
  {
    primary = false,
    accent = false,
    classes = "",
    onClick: handleClick = mock,
    children: label,
    type = 'button',
    disabled = false,
  }
) => {

  let typeClasses = 'text-white leading-5 py-[14px] px-[17px] sm:px-[38px]';

  if (primary) {
    typeClasses = 'bg-white hover:bg-gray-100 text-[#2e2e2e] leading-5 py-[14px] px-[17px] sm:px-[38px]';
  }

  if (accent) {
    typeClasses = 'bg-[#1bd760] hover:bg-[#1cdf63] text-black py-1 px-4 uppercase leading-normal';
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-semibold leading-5 py-[14px] px-[17px] sm:px-[38px] rounded-full hover:scale-105 ${typeClasses} ${classes}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
