import { useState } from "react";

/** Opener composable that provides open/close state and methods to change it */
export function useOpener(
  /** Default open state */
  defaultOpen: boolean = false,
) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const setOpen = () => {
    setIsOpen(true);
  };

  const setClose = () => {
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return {
    /** The boolean that indicates whether the component is open. */
    isOpen,
    /** The function that should be called to open the component. */
    setOpen,
    /** The function that should be called to close the component. */
    setClose,
    /** The function that should be called to toggle the component's open state. */
    toggleOpen,
  };
}
