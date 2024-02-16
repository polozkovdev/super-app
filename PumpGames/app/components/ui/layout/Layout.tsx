import Footer from "@/components/ui/footer/Footer"
import Header from "@/components/ui/layout/header/Header"
import TextComponent from "@/components/ui/text/TextComponent"
import { SHADOW } from "@/constants/app.constants"
import { DEFAULT_GAMES } from "@/navigation/navigation.types"
import { coreStore } from "@/store"
import { useRoute } from "@react-navigation/native"
import { FC, PropsWithChildren } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface ILayoutProps {
	isHeader?: boolean
	navigation?: any
}

const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
	children,
	isHeader = true,
	navigation
}) => {
	const route = useRoute()
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const isGame = DEFAULT_GAMES.some(i => i.route === route.name)
	const previousRoute = coreStore.getPreviousRoute()
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
				{isDesktop && !isGame && (
					<TouchableOpacity
						className={`
						z-[9999]
					absolute top-0 left-[30px]
				flex-row items-center justify-center gap-x-2 inline-flex
				 bg-white h-[40px] rounded-3xl
				 pl-[12px] py-[6] pr-[22px]
				  border-[1px] border-[black]/10
				`}
						onPress={() => {
							navigation.navigate(previousRoute ? previousRoute : "Today")
						}}
						style={SHADOW}
					>
						<Image
							className='w-4 h-4 rotate-180'
							resizeMode='contain'
							source={require("@/assets/ui/arrow_orange.png")}
						/>
						<TextComponent className='text-primary text-[20px] font-subtitle whitespace-nowrap'>
							Back
						</TextComponent>
					</TouchableOpacity>
				)}
				{children}
			</View>
			<View className={`${isDesktop ? "md:block" : "hidden"} w-full`}>
				<Footer />
			</View>
		</View>
	)
}

export default Layout
