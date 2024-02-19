import TextComponent from "@/components/ui/text/TextComponent"
import { coreStore } from "@/store"
import { useFocusEffect } from "@react-navigation/native"
import { FC, PropsWithChildren, useCallback, useRef } from "react"
import { FlatList, Image, TouchableOpacity, View } from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

interface ILevelsProps {
	Game: IGame
	navigation?: any
}

const Levels: FC<PropsWithChildren<ILevelsProps>> = ({
	Game: { steps, currentStep, initialPaidStep, route },
	navigation
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const flatListRef = useRef<any>(null)
	const getItemLayout = (data: any, index: any) => {
		return {
			length: steps,
			offset: steps * index,
			index
		}
	}

	const scrollToIndex = () => {
		flatListRef.current.scrollToIndex({
			animated: true,
			index: currentStep
		})
	}

	useFocusEffect(
		useCallback(() => {
			scrollToIndex()
		}, [])
	)
	return (
		<View
			style={{
				flex: 1
			}}
			className={`${isDesktop ? "mb-[60px]" : "mb-[40px]"}`}
		>
			<TextComponent
				type='title'
				className={`
				font-subtitle
				 ${isDesktop ? "text-[40px] leading-[54px] mb-[50px]" : "text-[30px] leading-[45px] mb-[40px]"}
				`}
			>
				Level
			</TextComponent>
			<FlatList
				ref={flatListRef}
				data={new Array(steps).fill("").map((_, index) => index + 1)}
				horizontal
				initialScrollIndex={currentStep}
				getItemLayout={getItemLayout}
				keyExtractor={item => `${item}`}
				renderItem={({ item }) => {
					const isPrevLevel = item < currentStep
					const isCurrentLevel = item === currentStep
					const isFutureLevel = item > currentStep
					const source = isPrevLevel
						? require("@/assets/ui/completed.png")
						: isCurrentLevel
							? require("@/assets/ui/play_white.png")
							: require("@/assets/ui/lock.png")
					return (
						<TouchableOpacity
							className='mx-[10px]'
							onPress={() => {
								coreStore.updatePreviousRoute("Games")
								isCurrentLevel && navigation.navigate(route)
							}}
							style={{
								flex: 1
							}}
						>
							<View
								key={item}
								className={`
								w-[60px] h-[60px] rounded-full
								flex-row items-center justify-center
								border-[1.5px]
								${isPrevLevel && "bg-green border-[#18A300]"}
								${isCurrentLevel && "bg-[#E57300]/60 border-[#E57300] pl-[6px]"}
								${isFutureLevel && "bg-[#3F1210]/10 border-0"}
								`}
							>
								<Image
									className='h-[28px]'
									resizeMode='contain'
									source={source}
								/>
							</View>
							<TextComponent
								className={`
									${isPrevLevel && "text-green"}
									${isCurrentLevel && "text-[#E57300]/60"}
									${isFutureLevel && "text-[#3F1210]/10"}
								`}
								style={{
									fontFamily: "DM-Medium",
									marginTop: 10,
									fontSize: 20,
									lineHeight: 26
								}}
							>
								{item}
							</TextComponent>
						</TouchableOpacity>
					)
				}}
			/>
		</View>
	)
}

export default Levels
