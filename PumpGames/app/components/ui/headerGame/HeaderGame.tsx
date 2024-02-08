import MuteUnmuteToggle from "@/components/features/MuteUnmuteToggle/MuteUnmuteToggle"
import Progress from "@/components/features/Progress/Progress"
import InfoTooltip from "@/components/features/Tooltip/Tooltip"
import React, { FC, PropsWithChildren } from "react"
import { View } from "react-native"

interface IHeaderGameProps {}

const HeaderGame: FC<PropsWithChildren<IHeaderGameProps>> = ({ children }) => {
	return (
		<View className='flex-row space-x-[10px] items-center'>
			<Progress />
			<View className='flex-row'>
				<InfoTooltip text='Some text for tooltip' />

				<MuteUnmuteToggle onMute={() => {}} onUnmute={() => {}} />
			</View>
		</View>
	)
}

export default HeaderGame
