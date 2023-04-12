import {FC} from "react";

type Props = {
  children: string
}

export const FooterListItem: FC<Props> = ({children: label}) => {
  return (
    <li>
      <a href="/GitHub/spotify/public" className="text-[11px] hover:underline py-2">
        {label}
      </a>
    </li>
  );
}
