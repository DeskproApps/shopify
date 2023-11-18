import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { GenerateBlock } from "./GenerateBlock";
import { defaultBlocksMap } from "./blocks";
import type { FC } from "react";
import type { PageBuilderProps } from "./types";

const PageBuilder: FC<PageBuilderProps> = ({
  store,
  config: { structure, blocks },
  blocksMap,
}) => {
  if (!Array.isArray(structure) ||isEmpty(structure)) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: wrong config - empty structure");
    return null;
  }

  if (isEmpty(blocks)) {
    // eslint-disable-next-line no-console
    console.error("PageBuilder: wrong config - empty block");
    return null;
  }

  return (
    <>
      {structure.map((blockName) => {
        const name = blockName[0];
        const blockConfig = get(blocks, name);
        const blockType = get(blockConfig, ["type"]);
        const Component = get(blocksMap || defaultBlocksMap, [blockType]);

        return (
          <GenerateBlock
            key={name}
            blockName={name}
            blockConfig={blockConfig}
            Component={Component}
            store={store}
          />
        );
      })}
    </>
  );
};

export { PageBuilder };
