import { menuData } from "@/components/ui/layout/menu.data"
import { TypeNav } from "@/components/ui/layout/menu.interface"
import MenuItem from "@/components/ui/layout/MenuItem"
import { AppConstants } from "@/constants/app.constants"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface IBottomMenuProps {
	nav: TypeNav
	currentRoute?: string
}

const BottomMenu = ({ nav, currentRoute }: IBottomMenuProps) => {
	const { bottom } = useSafeAreaInsets()
	return (
		<View
			className='w-full flex-row items-center pt-5 justify-around h-[80]'
			style={{
				paddingBottom: bottom + 6,
				backgroundColor: AppConstants.primaryBackground
			}}
		>
			{menuData.map((item, index) => (
				<>
					<MenuItem
						key={item.path}
						item={item}
						nav={nav}
						currentRoute={currentRoute}
					/>
					{index + 1 !== menuData.length && (
						<View className='h-[40] w-[1] bg-primary opacity-25' />
					)}
				</>
			))}
		</View>
	)
}

export default BottomMenu
