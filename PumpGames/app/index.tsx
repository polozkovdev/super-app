import Loading from "@/components/screens/loading/Loading"
import { setPresetScreenHeight } from "@/helpers/scaleHelper"
import Navigation from "@/navigation/Navigation"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import {
	useSafeAreaFrame,
	useSafeAreaInsets
} from "react-native-safe-area-context"

const Wrapper = () => {
	const insets = useSafeAreaInsets()
	const frame = useSafeAreaFrame()

	const [isDone, setIsDone] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const { height } = Dimensions.get("window")

		if (height - frame.height > 200) {
			setPresetScreenHeight(height - insets.top - insets.bottom)
		} else {
			setPresetScreenHeight(frame.height - insets.top - insets.bottom)
		}
	}, [frame.height, insets.top, insets.bottom, isDone])

	const onStartClick = () => {
		setIsLoading(false)
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
