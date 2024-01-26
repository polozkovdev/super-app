import Header from "@/components/ui/layout/header/Header"
import { AppConstants } from "@/constants/app.constants"
import { FC, PropsWithChildren } from "react"
import { View } from "react-native"

interface ILayoutProps {
	isHeader?: boolean
}

const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
	children,
	isHeader = true
}) => {
	return (
		<View
			className='flex-1 pt-[16] pb-[16] pl-[12] pr-[12]'
			style={{
				backgroundColor: AppConstants.primaryBackground
			}}
		>
			{isHeader && <Header />}
			{children}
		</View>
	)
}

export default Layout
