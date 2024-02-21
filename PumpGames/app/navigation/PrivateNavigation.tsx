import { menuData } from "@/components/ui/layout/bottomMenu/menu.data"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants, SHADOW } from "@/constants/app.constants"
import { useAuth } from "@/hooks/useAuth"
import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { games, routes } from "@/navigation/routes"
import { coreStore } from "@/store"
import "@expo/match-media"
import {
	BottomTabHeaderProps,
	createBottomTabNavigator
} from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Image, Pressable, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useMediaQuery } from "react-responsive"

const Stack = createNativeStackNavigator<TypeRootStackParamList>()
const Tab = createBottomTabNavigator()

const config = {
	animation: "spring",
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01
	}
}

const Header = ({
	route,
	options,
	navigation,
	layout
}: BottomTabHeaderProps) => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					minHeight: 44,
					marginTop: -44,
					shadowRadius: 50,
					shadowOffset: { width: 30, height: 30 },
					shadowColor: AppConstants.primaryBackground,
					shadowOpacity: 1,
					backgroundColor: AppConstants.primaryBackground
				}}
			/>
			<View
				style={{ flex: 1 }}
				className={`
			fixed top-[14px] left-0 right-0 max-w-[1420px] justify-between items-center
			mx-auto w-full flex-row
			`}
			>
				<View>
					<Image
						resizeMode='contain'
						source={require("@/assets/games/logo_mini_with_text.png")}
						style={{ width: 292, height: 40 }}
					/>
				</View>
				<View
					style={{
						height: 55,
						borderRadius: 100,
						paddingRight: 25,
						paddingLeft: 25,
						flexDirection: "row",
						alignItems: "center",
						marginLeft: "auto",
						marginRight: "auto",
						borderWidth: 1,
						borderColor: "rgba(0,0,0, .1)",
						...SHADOW,
						backgroundColor: "#FFFFFF"
					}}
					className='flex-row justify-between space-x-[40px]'
				>
					{menuData.map(({ icon, text, path }) => {
						const isGameOverview = route.name === "GameOverview"
						const isActive =
							isGameOverview && path === "Games" ? true : route.name === path
						return (
							<Pressable
								className='flex-row items-center justify-center gap-1 group h-[55px]'
								onPress={() => {
									coreStore.updatePreviousRoute(route.name)
									navigation.navigate(path)
								}}
							>
								<Svg
									width={icon.width}
									height={icon.height}
									viewBox={icon.viewBox}
									className={`${isActive ? "fill-[#E57300]" : "fill-[#522725]"} group-hover:fill-yellow-600`}
								>
									<Path d={icon.path} />
								</Svg>
								<Text
									className={`${isActive ? "text-orange" : "text-secondary"} text-[20px]`}
									style={{
										fontFamily: "DM-Medium"
									}}
								>
									{text}
								</Text>
							</Pressable>
						)
					})}
				</View>
				<View className='flex-row items-center justify-center h-[55px] space-x-[15px]'>
					<View className='flex-row min-w-[88px] rounded-[100px] items-center justify-center space-x-[10px] bg-[#FF6400]/10 h-full'>
						<Image
							className='w-[22px] h-[26px]'
							resizeMode='contain'
							source={require("@/assets/ui/fire.png")}
						/>
						<TextComponent className='text-primary text-center text-[22px]'>
							2
						</TextComponent>
					</View>
					<View
						className='bg-white rounded-full w-[55px] h-full items-center justify-center'
						style={SHADOW}
					>
						<Image
							className='w-[22px] h-[24px]'
							resizeMode='contain'
							source={require("@/assets/ui/bell.png")}
						/>
					</View>
					<View className='flex-1 items-center justify-center w-[55px] h-full'>
						<Image
							className='w-[55px] h-[55px]'
							resizeMode='contain'
							source={require("@/assets/ui/Start.png")}
						/>
					</View>
				</View>
			</View>
		</View>
	)
}
const HomeTabs = ({ currentRoute }: { currentRoute?: string }) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const desktopStyles = isDesktop
		? {
				position: "fixed",
				height: "55px",
				maxWidth: "522px",
				width: "100%",
				borderRadius: "100px",
				paddingTop: "20px",
				paddingRight: "25px",
				paddingBottom: "22px",
				paddingLeft: "25px",
				flexDirection: "row",
				alignItems: "center",
				gap: "20px",
				top: "40px",
				left: 0,
				right: 0,
				marginLeft: "auto",
				marginRight: "auto",
				borderWidth: "1px",
				borderColor: "rgba(0,0,0, .1)",
				boxShadow: "0 1px 3px rgba(0,0,0, .1)",
				backgroundColor: "#FFFFFF"
			}
		: {}
	return (
		<Tab.Navigator
			initialRouteName='Today'
			screenOptions={({ route }) => {
				const isGameOverview = currentRoute === "GameOverview"
				const isActive =
					isGameOverview && route.name === "Games"
						? true
						: currentRoute === route.name
				const menu = menuData.find(i => i.path === route.name)
				return {
					tabBarIcon: () => {
						if (isDesktop) {
							return (
								<View className='flex-row items-center justify-center gap-1'>
									<Svg
										width={menu?.icon.width}
										height={menu?.icon.height}
										viewBox={menu?.icon.viewBox}
										className={`${isActive ? "fill-[#E57300]" : "fill-[#522725]"}`}
									>
										<Path d={menu?.icon.path} />
									</Svg>
									<Text
										className={isActive ? "text-orange" : "text-secondary"}
										style={{
											fontFamily: "DM-Medium"
										}}
									>
										{menu?.text}
									</Text>
								</View>
							)
						}
						return (
							<View className='items-center justify-center gap-1'>
								<Svg
									width={menu?.icon.width}
									height={menu?.icon.height}
									viewBox={menu?.icon.viewBox}
									fill={isActive ? AppConstants.orange : AppConstants.secondary}
								>
									<Path d={menu?.icon.path} />
								</Svg>
								<Text
									className={isActive ? "text-orange" : "text-secondary"}
									style={{
										fontFamily: "DM-Medium"
									}}
								>
									{menu?.text}
								</Text>
							</View>
						)
					},
					headerShown: isDesktop,
					headerTitle: false,
					headerTransparent: true,
					tabBarShowLabel: isDesktop,
					tabBarHideOnKeyboard: true,
					tabBarItemStyle: {
						display: route.name === "GameOverview" ? "none" : "flex",
						height: isDesktop ? 40 : 80,
						minWidth: "90px"
					},
					tabBarStyle: {
						display: isDesktop ? "none" : "flex",
						zIndex: 50,
						marginHorizontal: "auto",
						maxWidth: isDesktop ? "1420px" : "400px",
						height: isDesktop ? 40 : 80,
						borderTopWidth: 0,
						backgroundColor: AppConstants.primaryBackground,
						...desktopStyles
					}
				}
			}}
		>
			{routes.map(route => (
				<Tab.Screen
					key={route.name}
					name={route.name}
					component={route.component}
					options={{
						header: props => <Header {...props} />
					}}
				/>
			))}
		</Tab.Navigator>
	)
}

const PrivateNavigation = ({ currentRoute }: { currentRoute?: string }) => {
	const { user } = useAuth()
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: AppConstants.primaryBackground
				}
			}}
		>
			<Stack.Screen name='Auth'>
				{props => <HomeTabs {...props} currentRoute={currentRoute} />}
			</Stack.Screen>
			{games.map(route => (
				<Stack.Screen key={route.name} {...route} />
			))}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
