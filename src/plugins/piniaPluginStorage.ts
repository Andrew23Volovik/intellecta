import type { PiniaPluginContext } from 'pinia';

export type TPersistStrategy = {
  key?: string;
  paths?: string[];
};

export type TPersistOptions = {
  enabled: true;
  strategies?: TPersistStrategy[];
};

type TStore = PiniaPluginContext['store'];
type TPartialState = Partial<TStore['$state']>;

declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: TPersistOptions;
  }
}

export const updateStorage = (strategy: TPersistStrategy, store: TStore): void => {
  const storage: Storage = localStorage;
  const storeKey: string = strategy.key || store.$id;

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((obj, key) => {
      obj[key] = store.$state[key];
      return obj;
    }, {} as TPartialState);

    storage.setItem(storeKey, JSON.stringify(partialState));
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state));
  }
};
export default ({ options, store }: PiniaPluginContext): void => {
  if (options.persist?.enabled) {
    const defaultStrategy: TPersistStrategy[] = [
      {
        key: store.$id,
      },
    ];

    const strategies = options.persist?.strategies?.length ? options.persist?.strategies : defaultStrategy;

    strategies.forEach((strategy: TPersistStrategy): void => {
      const storage: Storage = localStorage;
      const storeKey: string = strategy.key || store.$id;
      const storageRes: string | null = storage.getItem(storeKey);

      if (storageRes) {
        store.$patch(JSON.parse(storageRes));
        updateStorage(strategy, store);
      }
    });

    store.$subscribe((): void => {
      strategies.forEach((strategy: TPersistStrategy): void => {
        updateStorage(strategy, store);
      });
    });
  }
};
