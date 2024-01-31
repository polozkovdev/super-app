import Header from "@/components/ui/layout/header/Header"
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
			className='pt-[16] pb-[16] pl-[12] pr-[12]'
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%"
			}}
		>
			{isHeader && <Header />}
			{children}
		</View>
	)
}

export default Layout
