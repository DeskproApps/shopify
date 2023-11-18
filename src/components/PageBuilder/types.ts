import type { FC } from "react";
import type { Dict } from "../../types";

export type BlockSet = {
  type: string;
  label?: string,
  pathInStore?: string|string[],
  props?: { value?: unknown } & Dict<unknown>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockMap = Dict<FC<any>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = Dict<any>;

type Config = {
  structure: Array<string[]>,
  blocks: Record<string, BlockSet>,
};

export type BlockRules = {
  eq?: string,
};

export type PageBuilderProps = {
  config: Config,
  store?: Store,
  blocksMap?: BlockMap,
};
