import Footer from "@/components/ui/footer/Footer"
import Header from "@/components/ui/layout/header/Header"
import { DEFAULT_GAMES } from "@/navigation/navigation.types"
import { useRoute } from "@react-navigation/native"
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
	const route = useRoute()
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const isGame = DEFAULT_GAMES.some(i => i.route === route.name)
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
				${isDesktop && !isGame ? "mt-[180px] w-full" : "mt-[48px]"}
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
