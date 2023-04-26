import {FC} from "react";
import {IListCover} from "./types";

export const PlaylistCover: FC<IListCover> = ({url}) => (
  <img
    src={url}
    className="rounded shadow-lg"
    alt={url}
    title={url}
  />
);

