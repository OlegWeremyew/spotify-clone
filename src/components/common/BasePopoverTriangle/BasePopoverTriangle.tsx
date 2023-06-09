import {FC} from "react";
import {ITriangle} from "./types";

export const BasePopoverTriangle: FC<ITriangle> = ({side}) => {
  if (side === 'top') {
    return (
      <div
        className="w-20 h-20 absolute -left-4 -top-20 flex justify-center items-end overflow-hidden pointer-events-none">
        <div className="w-3 h-3 bg-[#0e72ea] translate-y-1/2 rotate-45 shadow-3xl pointer-events-auto"/>
      </div>
    );
  }

  return (
    <div
      className="w-20 h-20 absolute -top-4 -left-20 flex justify-end items-center overflow-hidden pointer-events-none">
      <div className="w-3 h-3 bg-[#0e72ea] translate-x-1/2 rotate-45 shadow-3xl pointer-events-auto"/>
    </div>
  );
}
