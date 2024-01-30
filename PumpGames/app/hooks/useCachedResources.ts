import { useFonts } from "expo-font"

export default function useCachedResources() {
	const [loadedFonts] = useFonts({
		"CP-Regular": require("@/assets/fonts/CrimsonPro-Regular.ttf"),
		"DM-Medium": require("@/assets/fonts/DMSans_Medium.ttf"),
		"DM-SemiBold": require("@/assets/fonts/DMSans_SemiBold.ttf")
	})

	return loadedFonts
}
