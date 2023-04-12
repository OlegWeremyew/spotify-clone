import {FC} from "react";
import {FooterListItem} from "./FooterListItem";

const list = ['Cookies', 'Privacy']

export const TheFooterList: FC = () => {
  return (
    <ul>
      {list.map((label: string) => (
        <FooterListItem key={label}>
          {label}
        </FooterListItem>
      ))}
    </ul>
  );
}

