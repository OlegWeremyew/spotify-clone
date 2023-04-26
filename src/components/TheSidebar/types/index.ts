import {Nullable, OffsetType} from "../../../types";

export interface ITheSidebar {
  showPopover: (title: string, description: string, target: Nullable<HTMLSpanElement>, offset: OffsetType) => void
}
