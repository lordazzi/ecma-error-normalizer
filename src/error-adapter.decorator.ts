import { ICustomErrorAdapter } from './custom-error-adapter.interface';
import { ErrorConverter } from './error.converter';

export function ErrorAdapter(): (adapterClass: new (...args: any[]) => ICustomErrorAdapter<unknown>) => void {
  return function (adapterClass: new (...args: any[]) => ICustomErrorAdapter<unknown>): void {
    const adapterInstance = new (adapterClass);
    const errorConverter: {
      errorNormalizer?: {
        [name: string]: ICustomErrorAdapter<unknown>
      };
    } = (new ErrorConverter() as {});


    errorConverter.errorNormalizer = errorConverter.errorNormalizer || {};
    errorConverter.errorNormalizer[adapterInstance.name] = adapterInstance;
  };
}
