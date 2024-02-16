import StartStop from "@/components/features/Timer/StartStop/StartStop"
import Handler from "@/components/ui/handler/Handler"
import TextComponent from "@/components/ui/text/TextComponent"
import { coreStore } from "@/store"
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from "react"
import { TouchableOpacity, View } from "react-native"
import { IGame } from "types"

interface TimerProps {
	game: IGame
	setGame: Dispatch<SetStateAction<IGame>>
	timerStart: boolean
}

const Timer: React.FC<TimerProps> = ({ game, setGame, timerStart }) => {
	const [currentTime, setCurrentTime] = useState<number>(game.timer)
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
			coreStore.db.updateGame({ ...game, timer: currentTime })
			clearInterval(intervalRef.current)
		}
	}

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60000)
		const seconds = ((time % 60000) / 1000).toFixed(0)
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`
	}
	useEffect(() => {
		if (timerStart) {
			setIsRunning(true)
			intervalRef.current = setInterval(() => {
				setCurrentTime(prevTime => prevTime + 1000)
			}, 1000)
		}
	}, [timerStart])
	return (
		<View className='flex-row space-x-[14px] items-center'>
			<Handler className='pl-[24px] pr-[24px] bg-[#3F1210]/10 text-primary w-[140px]'>
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
