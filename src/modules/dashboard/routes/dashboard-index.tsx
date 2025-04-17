import { getFixedT } from "i18next";

import { ViewLayout } from "~/core/components/view-layout";

import { getUserLocalePreference } from "~/layouts/utils/locales.ts";

export function loader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  return { meta: { title: t("router:dashboard") } };
}

export default function DashboardIndex() {
  return (
    <ViewLayout>
      <ViewLayout.Section>{"Dashboard"}</ViewLayout.Section>
    </ViewLayout>
  );
}
