import MuteUnmuteToggle from "@/components/features/MuteUnmuteToggle/MuteUnmuteToggle"
import Progress from "@/components/features/Progress/Progress"
import InfoTooltip from "@/components/features/Tooltip/Tooltip"
import TextComponent from "@/components/ui/text/TextComponent"
import { SHADOW } from "@/constants/app.constants"
import React, { FC, PropsWithChildren } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

interface IHeaderGameProps {
	currentData: IGame
	navigation?: any
}

const HeaderGame: FC<PropsWithChildren<IHeaderGameProps>> = ({
	navigation,
	currentData,
	children
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View className='flex-row space-x-[10px] justify-center items-center relative z-10 mb-[14px]'>
			{isDesktop && (
				<TouchableOpacity
					className={`
				flex-row items-center justify-center gap-x-2 inline-flex mr-[20px]
				 bg-white h-[40px] rounded-3xl
				 pl-[12px] py-[6] pr-[22px]
				  border-[1px] border-[black]/10
				`}
					onPress={() => {
						navigation.navigate("GameOverview", { route: currentData.route })
					}}
					style={SHADOW}
				>
					<Image
						className='w-4 h-4 rotate-180'
						resizeMode='contain'
						source={require("@/assets/ui/arrow_orange.png")}
					/>
					<TextComponent className='text-primary text-[20px] font-subtitle whitespace-nowrap'>
						Back
					</TextComponent>
				</TouchableOpacity>
			)}
			<Progress
				steps={currentData.steps}
				currentState={currentData.currentStep}
			/>
			<View className='flex-row items-center bg-white h-[34px] rounded-[24px] px-[10px] shadow-[black]/10 shadow-sm'>
				<InfoTooltip text='Some info message for tooltip' />
				<View className='flex-row items-center justify-center h-[14px] w-[1px] bg-primary/10 ml-[6px] mr-[8px]' />
				<MuteUnmuteToggle onMute={() => {}} onUnmute={() => {}} />
			</View>
		</View>
	)
}

export default HeaderGame
