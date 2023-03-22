import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { ErrorBlock } from "../common";

type Props = Omit<FallbackProps, "error"> & {
    error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
    return (
        <ErrorBlock text={error?.message || undefined}/>
    );
};

export { ErrorFallback };
