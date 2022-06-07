import { sleep } from "./sleep";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type PromiseCallback<T> = (...args: any[]) => Promise<T>;

const retryUntilResolve = <T>(
    fn: PromiseCallback<T>,
    pause = 1000,
    retryCount = 0,
): PromiseCallback<T> => {
    return (...args) => {
        let retry = 0;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const run: () => Promise<any> = () =>
            fn(...args).catch((error) => {
                if (retryCount > 0 && retry >= retryCount) {
                    retry = 0;
                    throw error;
                }

                retry++;
                return sleep(pause).then(run);
            })

        return run();
    }
};

export { retryUntilResolve };
