import {FC} from "react";
import {FooterListItem} from "./FooterListItem";
import {FOOTER_LIST} from "./data";

export const TheFooterList: FC = () => {
  return (
    <ul>
      {FOOTER_LIST.map((label: string) => (
        <FooterListItem key={label}>
          {label}
        </FooterListItem>
      ))}
    </ul>
  );
}

