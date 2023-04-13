import {FC} from "react";

export interface IListTitle {
    title: string
}

export const PlaylistTitle: FC<IListTitle> = ({title}) => {
    return (
        <h3 className="mt-4 mb-1 font-semibold tracking-wide capitalize">
            {title}
        </h3>
    );
}
