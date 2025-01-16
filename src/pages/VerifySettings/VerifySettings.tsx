import { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { P5, TSpan, Stack, Button } from "@deskpro/deskpro-ui";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { getShopInfo } from "../../services/shopify";
import type { FC } from "react";
import type { Settings, Maybe } from "../../types";
import type { ShopInfo } from "../../services/shopify/types";

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();
  const [shopInfo, setShopInfo] = useState<Maybe<ShopInfo>>(null);
  const [settings, setSettings] = useState<Maybe<Settings>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const errorMessage = "Failed to connect to Shopify, settings seem to be invalid";
  const isCorrectSettings = useMemo(() => settings?.shop_name && settings?.access_token, [settings]);

  const onVerifySettings = useCallback(() => {
    if (!client || !isCorrectSettings) {
      return;
    }

    setIsLoading(true);
    setError("");
    setShopInfo(null);

    return getShopInfo(client, settings)
      .then(({ data }) => setShopInfo(data?.shop))
      .catch(() => setError(errorMessage))
      .finally(() => setIsLoading(false));
  }, [client, settings, errorMessage, isCorrectSettings]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!isCorrectSettings || isLoading}
      />
      {nbsp}
      {shopInfo
        ? <P5>Verified as {`${shopInfo.name} <${shopInfo.email}>`}</P5>
        : <Invalid type="p5">{error}</Invalid> 
      }
    </Stack>
  );
};

export { VerifySettings };
