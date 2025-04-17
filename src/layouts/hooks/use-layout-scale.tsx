import { useContext } from "react";

import { ScaleContext } from "~/layouts/context/layout-provider";

export function useLayoutScale() {
  const { selectedScale, setSelectedScale } = useContext(ScaleContext);

  if (!selectedScale?.key) {
    throw Error("No Scale context was found");
  }

  return { selectedScale, setSelectedScale };
}
