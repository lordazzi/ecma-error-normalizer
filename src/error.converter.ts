import { ICustomErrorAdapter } from './custom-error-adapter.interface';
import { IErrorNormalized } from './error-normalized.interface';

export class ErrorConverter {

  private static instance: ErrorConverter | null = null;

  private errorNormalizer: {
    [name: string]: ICustomErrorAdapter<unknown> | undefined
  } = {};

  constructor() {
    if (!ErrorConverter.instance) {
      ErrorConverter.instance = this;
    }

    return ErrorConverter.instance;
  }

  create(thrownError: unknown): IErrorNormalized | null {
    const foundAdapter = Object
      .keys(this.errorNormalizer)
      .map(key => this.errorNormalizer[key] || null)
      .find(adapter => this.checkAdapterByClassType(adapter, thrownError));

    if (foundAdapter) {
      const normalized = foundAdapter.normalize(thrownError);
      const mutableNormalized: { name: string, originalInformation: unknown } = normalized;
      mutableNormalized.name = foundAdapter.name;
      mutableNormalized.originalInformation = thrownError;

      return normalized;
    }

    return null;
  }

  private checkAdapterByClassType(
    adapter: ICustomErrorAdapter<unknown> | null, thrownError: unknown
  ): boolean {
    if (adapter) {
      return adapter.typeCheck(thrownError);
    }

    return false;
  }

}
