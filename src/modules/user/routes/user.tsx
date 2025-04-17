import { useTranslation } from "react-i18next";
import { useNavigate, useRouteLoaderData } from "react-router";
import { getFixedT } from "i18next";
import { Button } from "primereact/button";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { Tag } from "primereact/tag";

import { TagsList, ViewLayout } from "~/core/components";
import { LocaleSelector } from "~/layouts/components/header-main/locale-selector.tsx";
import { ThemeSelector } from "~/layouts/components/header-main/theme-selector.tsx";
import { OptionsBlock } from "~/modules/user/components/options-block.tsx";

import { useHandleAction } from "~/core/hooks";
import { getUserLocalePreference } from "~/layouts/utils/locales.ts";
import { authLogout } from "~/modules/user/api";
import type { User } from "~/modules/user/types.ts";
import { removeUserToken } from "~/modules/user/utils/token.client.ts";

export function loader() {
  const { language } = getUserLocalePreference();
  const t = getFixedT(language);

  return { meta: { title: t("router:myProfile") } };
}

export default function User() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useRouteLoaderData("tools").user as User;

  const { handleAction, isFetching } = useHandleAction(authLogout, {
    successDetail: t("user:dialogs.signOutSuccess"),
    onSuccess: () => {
      removeUserToken();
      navigate("/auth/login");
    },
  });

  return (
    <>
      <ViewLayout>
        <ViewLayout.Section variant="oneHalf">
          <div className="flex flex-col gap-4">
            <OptionsBlock title={t("user:basicInfo")}>
              <OptionsBlock.Row label={t("user:attribs.id")}>
                {user.info.id}
              </OptionsBlock.Row>
              <OptionsBlock.Row label={t("user:attribs.name")}>
                {user.info.name}
              </OptionsBlock.Row>
              <OptionsBlock.Row label={t("user:attribs.email")}>
                {user.info.email}
              </OptionsBlock.Row>
            </OptionsBlock>
            <OptionsBlock title={t("user:attribs.position")}>
              <OptionsBlock.Row
                label={t("user:attribs.role", { count: user.roles.length })}
              >
                <TagsList values={user.roles} />
              </OptionsBlock.Row>
              <OptionsBlock.Row
                label={t("user:attribs.permission", {
                  count: user.permissions.length,
                })}
                className="!items-start"
              >
                <Inplace pt={{ display: { className: "p-0" } }}>
                  <InplaceDisplay>
                    <Tag
                      severity="secondary"
                      value={t("user:actions.showPermission", {
                        count: user.permissions.length,
                      })}
                      icon="ph ph-eye"
                      className="cursor-pointer"
                    />
                  </InplaceDisplay>
                  <InplaceContent>
                    <TagsList
                      values={user.permissions}
                      className="justify-end"
                    />
                  </InplaceContent>
                </Inplace>
              </OptionsBlock.Row>
            </OptionsBlock>
          </div>
        </ViewLayout.Section>
        <ViewLayout.Section variant="oneHalf">
          <div className="flex flex-col gap-4">
            <OptionsBlock title={t("user:settings.account")}>
              <OptionsBlock.Row label={t("user:attribs.password")}>
                <Button
                  severity="secondary"
                  label={t("user:actions.updatePassword")}
                  icon="ph-bold ph-pen me-1"
                  size="small"
                  className="flex cursor-not-allowed items-center gap-1"
                  disabled
                />
              </OptionsBlock.Row>
            </OptionsBlock>
            <OptionsBlock title={t("user:settings.ui")}>
              <OptionsBlock.Row label={t("layout.theme")}>
                <ThemeSelector display="label" />
              </OptionsBlock.Row>
              <OptionsBlock.Row label={t("layout.language")}>
                <LocaleSelector display="label" />
              </OptionsBlock.Row>
            </OptionsBlock>
          </div>
        </ViewLayout.Section>
      </ViewLayout>
      <div className="flex justify-end">
        <Button
          severity="danger"
          label={t("user:actions.signOut")}
          icon="ph ph-sign-out text-xl me-1"
          className="w-fit"
          loading={isFetching}
          onClick={handleAction}
        />
      </div>
    </>
  );
}
