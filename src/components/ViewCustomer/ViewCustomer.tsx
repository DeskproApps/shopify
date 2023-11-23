import get from "lodash/get";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Stack, Tag, Toggle } from "@deskpro/deskpro-ui";
import { Property } from "@deskpro/app-sdk";
import { getTagColorSchema } from "../../utils";
import { Container, DPNormalize } from "../common";
import type { FC } from "react";
import type { DeskproTheme, AnyIcon } from "@deskpro/deskpro-ui";
import type { CustomerType } from "../../services/shopify/types";
import type { Maybe } from "../../types";

type Props = {
  theme: DeskproTheme,
  customer: Maybe<CustomerType>,
};

const ViewCustomer: FC<Props> = ({ customer, theme }) => {
  return (
    <Container>
      <Property
        label="Email"
        text={get(customer, ["email"], "-") || "-"}
      />
      <Property
        label="Phone number"
        text={get(customer, ["phone"], "-") || "-"}
      />
      <Property
        label="Tags"
        text={(
          <Stack gap={6} wrap="wrap">
            {customer?.tags.map((tag) => (
              <Tag
                key={tag}
                color={{
                  ...getTagColorSchema(theme, tag),
                  textColor: theme.colors.grey100,
                }}
                label={tag}
                closeIcon={faTimes as AnyIcon}
              />
            ))}
          </Stack>
        )}
      />
      <Property
        label="Receive Marketing Email"
        text={(
          <Toggle
            disabled
            label="Yes"
            checked={get(customer, ["emailMarketingConsent", "marketingState"]) === "SUBSCRIBED"}
          />
        )}
      />
      <Property
        label="Customer Note"
        text={<DPNormalize text={get(customer, ["note"])}/>}
      />
    </Container>
  );
};

export { ViewCustomer };
