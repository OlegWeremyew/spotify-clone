import {FC} from "react";
import {IListDescription} from "./types";

export const PlaylistDescription: FC<IListDescription> = ({description}) => (
  <p className="text-sm text-[#b3b3b3] line-clamp-2">
    {description}
  </p>
);
