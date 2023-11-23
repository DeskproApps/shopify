import { HorizontalDivider, Search } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Customers, Buttons } from "./blocks";
import type { FC, ChangeEvent } from "react";
import type { CustomerType } from "../../services/shopify/types";

type Props = {
  isLoading: boolean,
  isSubmitting: boolean,
  isEditMode: boolean,
  onSave: () => void,
  onCancel: () => void,
  customers: CustomerType[],
  onChangeSearch: (q: string) => void,
  selectedCustomerId: CustomerType["id"],
  onChangeSelectedCustomer: (e: ChangeEvent<HTMLInputElement>) => void
};

const LinkCustomer: FC<Props> = ({
  onSave,
  onCancel,
  isLoading,
  customers,
  isEditMode,
  isSubmitting,
  onChangeSearch,
  selectedCustomerId,
  onChangeSelectedCustomer,
}) => {
  return (
    <>
      <Container>
        <Search onChange={onChangeSearch} isFetching={isLoading} />

        <Buttons
          selectedId={selectedCustomerId}
          isEditMode={isEditMode}
          onSave={onSave}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <Customers
          isLoading={isLoading}
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onChangeSelectedCustomer={onChangeSelectedCustomer}
        />
      </Container>
    </>
  );
};

export { LinkCustomer };
