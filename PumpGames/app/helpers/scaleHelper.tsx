import { Dimensions } from 'react-native';

const guidelineBaseHeight = 812;

export let PresetScreenHeight = Dimensions.get('window').height;

const verticalScale = (size: number) => {
  return (PresetScreenHeight / guidelineBaseHeight) * size;
};

const setPresetScreenHeight = (screenHeight: number) => {
  PresetScreenHeight = screenHeight;
};

export { verticalScale, setPresetScreenHeight };
