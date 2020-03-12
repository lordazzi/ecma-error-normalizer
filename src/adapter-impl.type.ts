import { ICustomErrorAdapter } from './custom-error-adapter.interface';

export type AdapterImpl = new (...args: any[]) => ICustomErrorAdapter<any>;
