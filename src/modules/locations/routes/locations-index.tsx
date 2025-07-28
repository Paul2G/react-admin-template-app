import { getFixedT } from "i18next";

import { ContentItemsProvider } from "~/core/context/content-items-provider";
import { ContentOptionsProvider } from "~/core/context/content-options-provider";
import { TheContent, ViewLayout } from "~/core/components";
import { LocationActions } from "~/modules/locations/components/location-actions";
import { LocationValueExtendedCell } from "~/modules/locations/components/location-value-extended-cell";
import { LocationsActions } from "~/modules/locations/components/locations-actions";

import { getUserLocalePreference } from "~/layouts/utils/locales";
import { getLocationsList } from "~/modules/locations/api";
import {
  defaultListableLocationsColumns,
  locationsFiltersConfigs,
  locationsTableColumns,
} from "~/modules/locations/data";
import { Location } from "~/modules/locations/type.ts";

export function loader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  return { meta: { title: t("router:locations.index") } };
}

export default function LocationsIndex() {
  return (
    <ContentOptionsProvider
      viewName="locations"
      filtersConfig={locationsFiltersConfigs}
      columnsConfig={locationsTableColumns}
      defaultListableColumns={defaultListableLocationsColumns}
    >
      <ContentItemsProvider itemsListGetter={getLocationsList}>
        <ViewLayout actionsSlot={<LocationsActions />}>
          <ViewLayout.Section>
            <TheContent<Location>
              selectable
              i18nNamespace="locations"
              itemActionsSlot={({ item }) => (
                <LocationActions item={item} className="flex gap-1" />
              )}
              valueExtendedCellSlot={(props) => (
                <LocationValueExtendedCell {...props} />
              )}
            />
          </ViewLayout.Section>
        </ViewLayout>
      </ContentItemsProvider>
    </ContentOptionsProvider>
  );
}
