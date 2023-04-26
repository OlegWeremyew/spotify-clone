import {FC} from "react";
import {IListTitle} from "./types";

export const PlaylistTitle: FC<IListTitle> = ({title}) => (
  <h3 className="mt-4 mb-1 font-semibold tracking-wide capitalize">
    {title}
  </h3>
);
