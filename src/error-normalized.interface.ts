/**
 * This is a proposal for an normalized error
 */
export interface IErrorNormalized {

  /**
   * Here is the adaptar name
   */
  readonly name: string;

  /**
   * The type will identify what should be done with the error. If it is a bussiness
   * error, I recommend extending this interface to a specific interface for business
   * errors, where a business error typing attribute must be included, so that the
   * software knows how to handle that non-conventional situation, something like this:
   *
   * ```typescript
   * interface IBusinessErrorNormalized<OriginalObject> {
   *
   *    // an enum goes nice here
   *    businessType?: 'session-timeout' | 'pending-admin-approval' | 'document-identification-is-mandatory';
   * }
   * ```
   *
   * In each case the Front-End system should do somenthing, like redirect the login, show a
   * password input to collect the admin password or a modal with an input to collect the user
   * document. If the property does not exists, the business error could work exactly as the error
   * type, but should not be considered a software defect and should not have techinical messages.
   */
  type: 'error' | 'warning' | 'business';

  /**
   * Here is the error message for the system user.
   * we recommend that each line break be an item in the array (this will make it
   * easier to wrap the paragraphs tag in an html structure).
   */
  messages: string[];

  /**
   * Any thing that could help the developer to understand what happen, like the
   * response and code of and http request, a stack trace, some specific information
   * include as a log about some logical error.
   * How this information will be displayed and whether it will be displayed does not
   * matter, the important thing is that it is available.
   */
  techinicalMessages: string[];

  /**
   * Original object responsible for the error
   */
  readonly originalInformation: any;

}
