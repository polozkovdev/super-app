import { AppConstants } from "@/constants/app.constants"
import { setPresetScreenHeight } from "@/helpers/scaleHelper"
import useCachedResources from "@/hooks/useCachedResources"
import Navigation from "@/navigation/Navigation"
import { DEFAULT_GAMES } from "@/navigation/navigation.types"
import Loading from "@/screens/loading/Loading"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { Dimensions, View } from "react-native"
import {
	useSafeAreaFrame,
	useSafeAreaInsets
} from "react-native-safe-area-context"

const Wrapper = () => {
	const insets = useSafeAreaInsets()
	const frame = useSafeAreaFrame()
	const isCachedComplete = useCachedResources()

	const [isDone, setIsDone] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getOrCreateGamesData = async (): Promise<void> => {
			try {
				let gamesData = await AsyncStorage.getItem("Games")
				if (!gamesData) {
					const defaultGamesData = JSON.stringify(DEFAULT_GAMES)
					await AsyncStorage.setItem("Games", defaultGamesData)
					console.log("Default GamesTest created.")
					gamesData = defaultGamesData
				}
				console.log("Games data:", JSON.parse(gamesData))
			} catch (error) {
				console.error("Error getting or creating games data:", error)
			}
		}
		getOrCreateGamesData()
	}, [])
	useEffect(() => {
		const { height } = Dimensions.get("window")

		if (height - frame.height > 200) {
			setPresetScreenHeight(height - insets.top - insets.bottom)
		} else {
			setPresetScreenHeight(frame.height - insets.top - insets.bottom)
		}
	}, [frame.height, insets.top, insets.bottom, isDone])

	const onStartClick = () => setIsDone(true)
	useEffect(() => {
		if (isCachedComplete) {
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		}
	}, [isCachedComplete, setIsLoading])
	if (isLoading) {
		return (
			<View
				style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}
			>
				<Loading />
			</View>
		)
	}
	return <Navigation />
	// return isDone ? <Navigation /> : <Onboarding onStart={onStartClick} />
}

export default Wrapper
