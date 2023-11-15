import { useCallback } from "react";
import { Pill, Stack } from "@deskpro/deskpro-ui";
import {
  Link,
  Title,
  VerticalDivider,
  HorizontalDivider,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import {
  ShopifyLogo,
  TextBlockWithLabel,
} from "../../common";
import { getShippingStatusName, getShippingStatusColorSchema, getDate } from "../../../utils";
import type { FC, MouseEventHandler } from "react";
import type { Props } from "./types";

const OrderInfo: FC<Props> = ({
  id,
  createdAt,
  lineItems,
  linkOrder,
  onChangePage,
  displayFulfillmentStatus,
}) => {
  const { theme } = useDeskproAppTheme();
  const title = lineItems.map(({ title }) => title).join(' & ');
  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onChangePage && onChangePage(id);
  }, [onChangePage, id]);

  return (
    <>
      <Title
        title={(
          <Link href="#" onClick={onClick}>{title}</Link>
        )}
        icon={<ShopifyLogo/>}
        link={linkOrder}
      />
      <Stack align="stretch" style={{ marginBottom: 10 }}>
        <Stack grow={1}>
          <TextBlockWithLabel
            marginBottom={0}
            label="Date"
            text={getDate(createdAt)}
          />
        </Stack>
        <VerticalDivider width={1} />
        <Stack grow={1}>
          <TextBlockWithLabel
            marginBottom={0}
            label="Status"
            text={(
              <>
                <Pill
                  textColor={theme.colors.white}
                  backgroundColor={getShippingStatusColorSchema(theme, displayFulfillmentStatus)}
                  label={getShippingStatusName(displayFulfillmentStatus)}
                />
              </>
            )}
          />
        </Stack>
      </Stack>
      <HorizontalDivider style={{ marginBottom: 9 }}/>
    </>
  );
}

export { OrderInfo };
