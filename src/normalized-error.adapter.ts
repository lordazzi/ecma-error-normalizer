import { ICustomErrorAdapter } from './custom-error-adapter.interface';
import { IErrorNormalized } from './error-normalized.interface';

/**
 * Implement the ICustomErrorAdapter interface.
 */
export class NormalizedErrorAdapter implements ICustomErrorAdapter<IErrorNormalized> {

  /**
   * Include a single name to your adapter
   */
  name = 'normalized-error';

  typeCheck(thrown: any): thrown is IErrorNormalized {
    if (thrown instanceof Object) {
      const attributeNameIsString = typeof thrown.name === 'string';
      const hasAttributeOriginalInformation = 'originalInformation' in thrown;
      const attributeTypeIsString = typeof thrown.type === 'string';
      const hasMessages = thrown.messages instanceof Array;
      const attributeTechinicalMessagesExists = 'techinicalMessages' in thrown;

      if (
        attributeNameIsString &&
        hasAttributeOriginalInformation &&
        attributeTypeIsString &&
        hasMessages &&
        attributeTechinicalMessagesExists
      ) {
        return true;
      }
    }

    return false;
  }

  normalize(normalized: IErrorNormalized): IErrorNormalized {
    return normalized;
  }
}
