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
			className='flex-1 pt-[11] pb-[6] pl-[10] pr-[10]'
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
