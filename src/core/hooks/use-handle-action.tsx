import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { confirmDialog } from "primereact/confirmdialog";

import { NotOkResponseError } from "~/core/errors";
import { useToast } from "~/layouts/hooks/use-toast";

/** Its main purpose is to handle the resolution states of a promise through a try...catch and to show feedback to the user through `toast`'s in cases of error and success.*/
export function useHandleAction<T, S>(
  action: (props: S) => Promise<T>,
  options: ActionOptions<T, S> = {},
) {
  const {
    requireConfirm = false,
    onSuccess = () => {},
    onError = () => {},
    onFinish = () => {},
    successDetail,
    successSummary,
    errorDetail,
    errorSummary,
    confirmTitle,
    confirmMessage,
    confirmRejectLabel,
    confirmAcceptLabel,
  } = options;

  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  const confirmation = (props: S) => {
    confirmDialog({
      header: confirmTitle ?? t("dialogs.requiredConfirmation"),
      message: confirmMessage ?? `${t("dialogs.areYouSureContinue")}`,
      rejectLabel: confirmRejectLabel ?? t("dialogs.cancel"),
      acceptLabel: confirmAcceptLabel ?? t("dialogs.accept"),
      rejectClassName: "p-button-secondary p-button-outlined",
      acceptClassName: "p-button-danger",
      accept: () => handleAction(props),
      reject: () => {},
    });
  };

  const handleAction = async (props: S) => {
    setIsFetching(true);
    try {
      const data = await action(props);
      toast.show({
        life: 5000,
        severity: "success",
        summary: successSummary ?? "OK",
        detail: successDetail ?? t("dialogs.wasUpdated"),
      });
      onSuccess(data);
    } catch (error) {
      if (error instanceof NotOkResponseError) {
        onError(error);

        toast.show({
          life: 5000,
          severity: "error",
          summary: errorSummary ?? error.status ?? "Error",
          detail: errorDetail ?? error.message ?? t("dialogs.wasNotUpdated"),
        });

        if (error.status === 401 || error.status === 403) {
          navigate("/auth/login");
        }
      }
    } finally {
      setIsFetching(false);
      onFinish(props);
    }
  };

  return {
    /** The function that should be called to execute the handled action */
    handleAction: requireConfirm ? confirmation : handleAction,
    /** A reactive boolean that indicates if the action is being executed */
    isFetching,
  };
}

type ActionOptions<T, S> = {
  /** A function that will be executed after the action is successful. */
  onSuccess?: (result: T) => void;
  /** A function that will be executed after the action fails. */
  onError?: (error: Error) => void;
  /** A function that will be executed after the action is finished, regardless of the result. */
  onFinish?: (props?: S) => void;
  /** If true, a confirmation dialog will be shown before executing the action. */
  requireConfirm?: boolean;
  /** The detail message to be shown in the success toast. */
  successDetail?: string;
  /** The summary message to be shown in the success toast. */
  successSummary?: string;
  /** The detail message to be shown in the error toast. */
  errorDetail?: string;
  /** The summary message to be shown in the error toast. */
  errorSummary?: string;
  /** The title of the confirmation dialog. */
  confirmTitle?: string;
  /** The message of the confirmation dialog. */
  confirmMessage?: string;
  /** The label of the reject button in the confirmation dialog. */
  confirmRejectLabel?: string;
  /** The label of the accept button in the confirmation dialog. */
  confirmAcceptLabel?: string;
};
