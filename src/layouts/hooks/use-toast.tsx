import { useContext, type MutableRefObject } from "react";
import { Toast } from "primereact/toast";

import { ToastContext } from "~/layouts/context/toast-provider";

export function useToast() {
  const toastContext = useContext(ToastContext);

  return toastContext?.toast?.current as MutableRefObject<Toast>["current"];
}
