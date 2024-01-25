import Header from "@/components/ui/layout/header/Header"
import { AppConstants } from "@/constants/app.constants"
import { FC, PropsWithChildren } from "react"
import { View } from "react-native"

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<View
			className='flex-1 pt-[11] pb-[6] pl-[10] pr-[10]'
			style={{
				backgroundColor: AppConstants.primaryBackground
			}}
		>
			<Header />
			{children}
		</View>
	)
}

export default Layout
