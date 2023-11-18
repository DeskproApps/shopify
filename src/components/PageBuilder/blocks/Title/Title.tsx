import get from "lodash/get";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import { Title as TitleSDK } from "@deskpro/app-sdk";
import { ShopifyLogo } from "../../../common";
import type { FC } from "react";

type Props = {
  value: string,
  icon?: string,
  link?: string,
};

const Title: FC<Props> = ({ value, icon, link,  ...props }) => {
  const linkIcon = !icon
    ? <ShopifyLogo/>
    : get(faIcons, [icon]) || <ShopifyLogo/>;

  return (
    <TitleSDK
      title={value}
      {...(!link ? {} : { icon: linkIcon })}
      {...(!link ? {} : { link })}
      {...props}
    />
  );
};

export { Title };
