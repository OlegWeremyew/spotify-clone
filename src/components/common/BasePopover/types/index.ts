import {ForwardedRef} from "react";
import {Nullable, OffsetType} from "../../../../types";

export interface IBasePopover {
  ref: ForwardedRef<{ show: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: OffsetType) => void, }>
}