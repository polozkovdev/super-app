import Handler from "@/components/ui/handler/Handler"
import React from "react"
import { Image } from "react-native"

interface IStartStopProps {
	isRunning: boolean
}

const StartStop = ({ isRunning }: IStartStopProps) => {
	return (
		<Handler>
			<Image
				className={`w-6 h-6 ${isRunning ? "ml-0" : "ml-[6px]"}`}
				resizeMode='contain'
				source={
					isRunning
						? require("@/assets/ui/pause.png")
						: require("@/assets/ui/play.png")
				}
			/>
		</Handler>
	)
}

export default StartStop
