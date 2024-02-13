import TextComponent from "@/components/ui/text/TextComponent"
import { useFocusEffect } from "@react-navigation/native"
import { FC, PropsWithChildren, useCallback, useRef } from "react"
import { FlatList, Image, View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface ILevelsProps {
	steps: number
	currentStep: number
	initialPaidStep?: number
}

const Levels: FC<PropsWithChildren<ILevelsProps>> = ({
	steps,
	currentStep,
	initialPaidStep
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const flatListRef = useRef<any>(null)
	const getItemLayout = (data: any, index: any) => {
		return {
			length: 50,
			offset: 50 * index,
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
				ItemSeparatorComponent={() => <View className='w-[30px]' />}
				keyExtractor={item => `${item}`}
				renderItem={({ item, index }) => {
					const isPrevLevel = index < currentStep
					const isCurrentLevel = index === currentStep
					const isFutureLevel = index > currentStep
					const source = isPrevLevel
						? require("@/assets/ui/completed.png")
						: isCurrentLevel
							? require("@/assets/ui/play_white.png")
							: require("@/assets/ui/lock.png")
					return (
						<View>
							<View
								key={index}
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
								style={{
									fontFamily: "DM-Medium",
									marginTop: 10,
									fontSize: 20,
									lineHeight: 26
								}}
							>
								{item}
							</TextComponent>
						</View>
					)
				}}
			/>
		</View>
	)
}

export default Levels
