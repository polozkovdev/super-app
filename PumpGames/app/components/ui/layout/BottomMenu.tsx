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
			style={{
				paddingTop: 5,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
				paddingBottom: bottom + 10,
				backgroundColor: AppConstants.primaryBackground
			}}
		>
			{menuData.map(item => (
				<MenuItem
					key={item.path}
					item={item}
					nav={nav}
					currentRoute={currentRoute}
				/>
			))}
		</View>
	)
}

export default BottomMenu
