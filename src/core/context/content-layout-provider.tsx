import {
  createContext,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useUpdateEffect } from "primereact/hooks";

import { ContentDisplayLayout } from "~/core/constants/content";
import {
  getUserLayoutPreference,
  setUserLayoutPreference,
} from "~/core/utils/content-layout";

export const ContentLayoutContext = createContext<ContentLayoutContextValue>({
  selectedLayout: ContentDisplayLayout.GRID,
  setSelectedLayout: () => {},
});

/** Context provider to manage content layout in localstorage.
 * WARNING: THIS PROVIDER SHOULD BE ONLY RENDER ON CLIENT SIDE
 * */
export function ContentLayoutProvider({
  viewName,
  children,
}: ContentLayoutProviderProps) {
  const [selectedLayout, setSelectedLayout] = useState(
    getUserLayoutPreference(viewName),
  );

  /** Update user preferences when the selected layout changes */
  useUpdateEffect(() => {
    setUserLayoutPreference(viewName, selectedLayout);
  }, [selectedLayout]);

  return (
    <ContentLayoutContext.Provider
      value={{
        selectedLayout,
        setSelectedLayout,
      }}
    >
      {children instanceof Function
        ? children({ selectedLayout, setSelectedLayout })
        : children}
    </ContentLayoutContext.Provider>
  );
}

export type ContentLayoutContextValue = {
  /** The selected layout for content display. This can be either GRID or TABLE as defined in ContentDisplayLayout enum */
  selectedLayout: ContentDisplayLayout;
  /** Function to set the selected layout. This function updates the state of selectedLayout */
  setSelectedLayout: Dispatch<SetStateAction<ContentDisplayLayout>>;
};

type ContentLayoutProviderProps = {
  /** The name of the route for LocalStorage management. */
  viewName: string;
  /** React children nodes */
  children: ((context: ContentLayoutContextValue) => JSX.Element) | ReactNode;
};
