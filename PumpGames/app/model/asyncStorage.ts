import * as SecureStore from 'expo-secure-store';

export class StorageAsync {
  constructor() {}

  updateUserVisitedCount = (): Promise<number> => {
    return SecureStore.getItemAsync('counter_launch').then((value) => {
      const counter = parseInt(value || '0', 10) + 1;

      return SecureStore.setItemAsync('counter_launch', counter.toString()).then(() => counter);
    });
  };

  isLakedApp = (): Promise<string | null> => {
    return SecureStore.getItemAsync('do_you_like').then((value) => value);
  };

  likeApp = (isLiked: boolean): Promise<void> => {
    return SecureStore.setItemAsync('do_you_like', isLiked ? 'true' : 'false');
  };

  isRatedApp = (): Promise<boolean> => {
    return SecureStore.getItemAsync('is_rated').then((value) => value === 'true');
  };

  rateApp = (): Promise<void> => {
    return SecureStore.setItemAsync('is_rated', 'true');
  };
}

const asyncStorage = new StorageAsync();

export default asyncStorage;
