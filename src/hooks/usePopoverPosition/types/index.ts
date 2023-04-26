import {Nullable, OffsetType} from "types";

export type ReturnType = {
  move: (target: Nullable<HTMLSpanElement>, offset: OffsetType) => void
  target: Nullable<HTMLSpanElement>
  setTarget: (target: Nullable<HTMLSpanElement>) => void
  isSmallScreen: boolean
}
