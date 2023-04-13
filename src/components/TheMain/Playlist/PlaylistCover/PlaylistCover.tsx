import {FC} from "react";

export interface IListCover {
    url: string
}

export const PlaylistCover: FC<IListCover> = ({ url }) => {
    return (
        <img
            src={url}
            className="rounded shadow-lg"
            alt={url}
            title={url}
        />
    );
}
