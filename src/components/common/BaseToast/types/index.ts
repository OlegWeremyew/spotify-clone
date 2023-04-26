import {ForwardedRef} from "react";

export interface IBaseToast {
  ref: ForwardedRef<{ show: (message: string) => void }>
}