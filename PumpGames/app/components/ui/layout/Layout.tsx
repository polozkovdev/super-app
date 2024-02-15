import Footer from "@/components/ui/footer/Footer"
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
			className='p-0 max-w-[1420px] relative mx-auto px-[12px]'
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%"
			}}
		>
			{isHeader && !isDesktop && <Header />}
			<View
				style={{ flex: 1 }}
				className={`
				${isDesktop ? "mt-[180px] w-full" : "mt-[48px]"}
			`}
			>
				{children}
			</View>
			<View className={`${isDesktop ? "md:block" : "hidden"} w-full`}>
				<Footer />
			</View>
		</View>
	)
}

export default Layout
