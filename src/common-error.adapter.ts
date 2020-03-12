import { ICustomErrorAdapter } from './custom-error-adapter.interface';
import { IErrorNormalized } from './error-normalized.interface';

/**
 * This decorator will make `CommonErrorAdapter` be visible to the ErrorConverter,
 * with out this, the class has no effect.
 * Implement the ICustomErrorAdapter interface.
 */
export class CommonErrorAdapter implements ICustomErrorAdapter<Error & { rejection: Error }> {

  /**
   * Include a single name to your adapter
   */
  name = 'thrown-error';

  /**
   * This method must check if the value should be normalized byt this class.
   * Return `true` for yes and `false` for no.
   * @param thrown
   */
  typeCheck(thrown: any): thrown is Error & { rejection: Error } {
    if (thrown instanceof Error || thrown && thrown.rejection instanceof Error) {
      return true;
    }

    return false;
  }

  /**
   * Here is how the XMLHttpRequest, the NaN, the thrown Error or anything else will be
   * converted into the normalized structure
   * @param error
   */
  normalize(error: Error & { rejection: Error }): IErrorNormalized {
    let stack = '';
    if (error.message && error.stack) {
      stack = `${error.message}\n\n${error.stack}`;
    }

    if (!stack && error.rejection && error.rejection.stack) {
      const message = error.message || error.rejection.message;
      stack = `The error was caught in an unhandled promise:\n${message}\n\n${error.rejection.stack}`;
    }

    return {
      name: 'don\'t matter, this property will be override with the name of this class',
      type: 'error',
      messages: ['Some unexpected error happen inside the application'],
      techinicalMessages: [stack],
      //  this property will be override with the error
      originalInformation: null
    };
  }
}
