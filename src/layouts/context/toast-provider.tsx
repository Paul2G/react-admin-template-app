import {
  createContext,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext<{
  toast: MutableRefObject<Toast | null>;
} | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const toastRef = useRef<Toast | null>(null);

  return (
    <ToastContext.Provider value={{ toast: toastRef }}>
      {children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
}

type ToastProviderProps = {
  children: ReactNode;
};
