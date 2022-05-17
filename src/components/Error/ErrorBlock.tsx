import { FC } from "react";
import { Stack, useDeskproAppTheme } from "@deskpro/app-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Props } from "./types";
import "./ErrorBlock.css";


export const ErrorBlock: FC<Props> = ({ text }) => {
  const { theme } = useDeskproAppTheme();

  return (
      <Stack className="error-block" style={{ backgroundColor: theme.colors.red100 }}>
        <FontAwesomeIcon icon={faExclamation} style={{ marginRight: "6px" }} />
        <div className="error-block-messages">
          {Array.isArray(text) ? text.map((msg, idx) => (
              <div className="error-block-message" key={idx}>{msg}</div>
          )) : text}
        </div>
      </Stack>
  );
};
