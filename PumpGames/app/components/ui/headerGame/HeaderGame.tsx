import MuteUnmuteToggle from "@/components/features/MuteUnmuteToggle/MuteUnmuteToggle"
import Progress from "@/components/features/Progress/Progress"
import InfoTooltip from "@/components/features/Tooltip/Tooltip"
import Back from "@/components/ui/back/Back"
import React, { FC, PropsWithChildren } from "react"
import { View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface IHeaderGameProps {
	navigation?: any
}

const HeaderGame: FC<PropsWithChildren<IHeaderGameProps>> = ({
	navigation,
	children
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View className='flex-row space-x-[10px] justify-center items-center relative z-10'>
			{isDesktop && <Back navigation={navigation} />}
			<Progress />
			<View className='flex-row items-center bg-white h-[34px] rounded-[24px] px-[10px] shadow-[black]/10 shadow-sm'>
				<InfoTooltip text='Some info message for tooltip' />
				<View className='flex-row items-center justify-center h-[14px] w-[1px] bg-primary/10 ml-[6px] mr-[8px]' />
				<MuteUnmuteToggle onMute={() => {}} onUnmute={() => {}} />
			</View>
		</View>
	)
}

export default HeaderGame
