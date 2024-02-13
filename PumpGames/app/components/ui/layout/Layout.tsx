import Header from "@/components/ui/layout/header/Header"
import { FC, PropsWithChildren } from "react"
import { View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface ILayoutProps {
	isHeader?: boolean
}

const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
	children,
	isHeader = true
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View
			// className='pt-[16] pb-[16] pl-[12] pr-[12]'
			className='p-0 max-w-[1420px] relative mx-auto'
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%"
			}}
		>
			{isHeader && <Header />}
			<View
				style={{ flex: 1 }}
				className={`
				${isDesktop ? "mt-[180px]" : "mt-[48px]"}
			`}
			>
				{children}
			</View>
		</View>
	)
}

export default Layout
