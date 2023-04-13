import {FC} from "react";

export interface IListDescription {
    description: string
}

export const PlaylistDescription: FC<IListDescription> = ({description}) => (
    <p className="text-sm text-[#b3b3b3] line-clamp-2">
        {description}
    </p>
);
