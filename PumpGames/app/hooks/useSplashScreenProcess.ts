import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

export const useSplashScreenHideProcess = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);
};

export const useSplashScreenPreventAutoHideProcess = () => {
  React.useLayoutEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
};
