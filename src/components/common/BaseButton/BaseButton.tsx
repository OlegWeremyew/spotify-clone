import {FC, ReactNode} from "react";

export interface IBaseButton {
  primary?: boolean
  classes?: string
  onClick?: () => void
  children: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const mock = (): void => {}

export const BaseButton: FC<IBaseButton> = (
  {
    primary = false,
    classes = "",
    onClick: handleClick = mock,
    children: label,
    type = 'button',
    disabled = false,
  }
) => {

  const typeClasses = primary
    ? 'bg-white hover:bg-gray-100 text-[#2e2e2e]'
    : 'text-white';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-semibold leading-5 py-[9px] px-[17px] sm:px-[38px] rounded-full hover:scale-105 ${typeClasses} ${classes}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}