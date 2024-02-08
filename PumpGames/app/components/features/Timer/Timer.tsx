import StartStop from "@/components/features/Timer/StartStop/StartStop"
import Handler from "@/components/ui/handler/Handler"
import TextComponent from "@/components/ui/text/TextComponent"
import React, { useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"

interface TimerProps {
	initialTime?: number // Initial time for the timer in milliseconds
}

const Timer: React.FC<TimerProps> = ({ initialTime = 0 }) => {
	const [currentTime, setCurrentTime] = useState<number>(initialTime)
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const startTimer = () => {
		if (!isRunning) {
			setIsRunning(true)
			intervalRef.current = setInterval(() => {
				setCurrentTime(prevTime => prevTime + 1000)
			}, 1000)
		}
	}

	const pauseTimer = () => {
		if (isRunning && intervalRef.current) {
			setIsRunning(false)
			clearInterval(intervalRef.current)
		}
	}

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60000)
		const seconds = ((time % 60000) / 1000).toFixed(0)
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`
	}
	return (
		<View className='flex-row space-x-[14px] items-center'>
			<Handler className='bg-red-950 pl-[24px] pr-[24px] bg-[#3F1210]/10 text-primary'>
				<TextComponent className='text-[40px] leading-[40px]'>
					{formatTime(currentTime)}
				</TextComponent>
			</Handler>
			<TouchableOpacity onPress={isRunning ? pauseTimer : startTimer}>
				<StartStop isRunning={isRunning} />
			</TouchableOpacity>
		</View>
	)
}

export default Timer
