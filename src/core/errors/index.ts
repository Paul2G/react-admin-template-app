import type { ProblemDetails } from "~/core/types/fetch.ts";

export class MissingIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingIdError";
  }
}

export class NotOkResponseError extends Error {
  public type?: string;
  public title: string;
  public detail: string;
  public instance?: string;
  public status?: number;

  constructor(problemDetails: ProblemDetails) {
    super(problemDetails.title);
    this.name = "NotOkResponseError";

    this.type = problemDetails.type;
    this.title = problemDetails.title;
    this.detail = problemDetails.detail;
    this.instance = problemDetails.instance;
    this.status = problemDetails.status;
  }
}

export class NoValidSearchParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoValidSearchParamError";
  }
}
