import Loading from "@/components/screens/loading/Loading"
import { setPresetScreenHeight } from "@/helpers/scaleHelper"
import Navigation from "@/navigation/Navigation"
import * as Font from "expo-font"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import {
	useSafeAreaFrame,
	useSafeAreaInsets
} from "react-native-safe-area-context"

const Wrapper = () => {
	const insets = useSafeAreaInsets()
	const frame = useSafeAreaFrame()
	const {} = Font.useFonts({})

	const [secsLoading, setSecsLoading] = useState<number>(0)
	const [isDone, setIsDone] = useState<boolean>(false)
	const [isStart, setIsStart] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const { height } = Dimensions.get("window")

		if (height - frame.height > 200) {
			setPresetScreenHeight(height - insets.top - insets.bottom)
		} else {
			setPresetScreenHeight(frame.height - insets.top - insets.bottom)
		}
	}, [frame.height, insets.top, insets.bottom, isDone])

	useEffect(() => {
		if (secsLoading >= 2 || secsLoading >= 5) {
			setIsDone(true)
		}
	}, [secsLoading])

	useEffect(() => {
		const timerId = setInterval(() => {
			if (secsLoading >= 5) {
				clearInterval(timerId)
			} else setSecsLoading((s: number) => s + 0.2)
		}, 200)

		return () => timerId && clearInterval(timerId)
	}, [secsLoading])

	if (!isDone) {
		return null
	}

	const onStartClick = () => {
		setIsLoading(false)
		setIsStart(true)
	}
	// return <Navigation />

	// case with load
	return isLoading ? (
		<Loading isLoading={isLoading} onStart={onStartClick} />
	) : (
		<Navigation />
	)
}

export default Wrapper
