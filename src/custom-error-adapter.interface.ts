import { IErrorNormalized } from './error-normalized.interface';

export interface ICustomErrorAdapter<OriginalErrorObject> {

  /**
   * This will help to identify the error origin in the issue.
   * Adapters with the same name will override and overwrite the existing ones.
   */
  name: string;

  /**
   * This method will check if the error is registred as something normalizable
   *
   * @param throwable
   * every throwable thing in ecmascript
   */
  typeCheck(throwable: unknown): throwable is OriginalErrorObject;

  /**
   * Here you say to us how this thrown structure will
   * turn into something we can understand.
   *
   * @param error
   */
  normalize(error: OriginalErrorObject): IErrorNormalized;
}
