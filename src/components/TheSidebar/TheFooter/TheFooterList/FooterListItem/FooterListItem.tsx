import {FC} from "react";
import {IListItem} from "./types";

export const FooterListItem: FC<IListItem> = ({children: label}) => {
  return (
    <li>
      <a href="/GitHub/spotify/public" className="text-[11px] hover:underline py-2">
        {label}
      </a>
    </li>
  );
}
