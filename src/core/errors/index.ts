export class MissingIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingIdError";
  }
}

export class NotOkResponseError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "NotOkResponseError";
    this.status = status;
  }
}

export class NoValidSearchParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoValidSearchParamError";
  }
}
