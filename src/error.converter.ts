import { AdapterImpl } from './adapter-impl.type';
import { ICustomErrorAdapter } from './custom-error-adapter.interface';
import { IErrorNormalized } from './error-normalized.interface';

export class ErrorConverter {

  private static instance: ErrorConverter | null = null;

  private adapters: {
    [name: string]: ICustomErrorAdapter<unknown> | undefined
  } = {};

  constructor(adapters: AdapterImpl[]) {
    if (!ErrorConverter.instance) {
      ErrorConverter.instance = this;
    }

    ErrorConverter.instance.adapters = this.generateAdapterMap(adapters);

    return ErrorConverter.instance;
  }

  private generateAdapterMap(adapters: AdapterImpl[]): {
    [name: string]: ICustomErrorAdapter<unknown> | undefined
  } {
    const adaptersMap: {
      [name: string]: ICustomErrorAdapter<unknown> | undefined
    } = {};

    adapters.forEach(adapterClazz => {
      const adapter = new adapterClazz();
      const hasAdapter = adaptersMap[adapter.name];
      if (hasAdapter) {
        console.warn(`You're overriding adapter ${hasAdapter.constructor.name} with ${adapterClazz.name}. ` +
          `They both have the name "${adapter.name}".`);
      }

      adaptersMap[adapter.name] = adapter;
    });

    return adaptersMap;
  }

  create(thrownError: unknown): IErrorNormalized | null {
    const foundAdapter = Object
      .keys(this.adapters)
      .map(key => this.adapters[key] || null)
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
