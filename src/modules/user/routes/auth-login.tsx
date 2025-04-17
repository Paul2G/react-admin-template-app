import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form, useLoaderData, useNavigate, useNavigation } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useUpdateEffect } from "primereact/hooks";
import { InputText } from "primereact/inputtext";

import { InputWrapper } from "~/core/components";

import projectConfig from "~/config/project-config.ts";
import { useHandleAction } from "~/core/hooks";
import { z } from "~/core/lib/zod-i18n.ts";
import { authLogin } from "~/modules/user/api";
import { setUserToken } from "~/modules/user/utils/token.client.ts";

export function loader() {
  return { redirect: false };
}

export default function AuthLogin() {
  const { redirect } = useLoaderData<any>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { handleAction, isFetching } = useHandleAction(authLogin, {
    onSuccess: (user) => {
      setUserToken(user.token);
      navigate(redirect ? redirect : "/tools");
    },
    successDetail: t("user:dialogs.loggedIn"),
  });

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FieldValues) {
    handleAction({ data: { email: data.email, password: data.password } });
  }

  useUpdateEffect(() => {
    if (isDirty) trigger().then();
  }, [i18n.language]);

  return (
    <Card
      className={clsx(
        "border-surface-100 w-[95%] max-w-md border border-solid p-4 sm:p-6",
        "animate-fade-up",
      )}
      header={
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <img
            src="assets/brand/logo.png"
            className="w-[9rem] max-w-[70%]"
            alt={projectConfig.name}
          />
          <span className="text-center text-lg font-semibold">{`${t("greetings.welcomeTo")} ${projectConfig.name}`}</span>
        </div>
      }
    >
      <Form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWrapper errorField={errors.email}>
          <InputText
            placeholder={t("user:attribs.email")}
            className="w-full"
            {...register("email")}
          />
        </InputWrapper>
        <InputWrapper errorField={errors.password}>
          <InputText
            type="password"
            placeholder={t("user:attribs.password")}
            className="w-full"
            {...register("password")}
          />
        </InputWrapper>
        <Button
          type="submit"
          label={t("user:actions.login")}
          loading={isFetching || navigation.state === "loading"}
          className="mt-2 w-full"
        />
      </Form>
    </Card>
  );
}
