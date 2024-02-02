import { menuData } from "@/components/ui/layout/bottomMenu/menu.data"
import { AppConstants } from "@/constants/app.constants"
import { useAuth } from "@/hooks/useAuth"
import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { games, routes } from "@/navigation/routes"
import "@expo/match-media"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useMediaQuery } from "react-responsive"

const Stack = createNativeStackNavigator<TypeRootStackParamList>()
const Tab = createBottomTabNavigator()

const HomeTabs = ({ currentRoute }: { currentRoute?: string }) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	const desktopStyles = isDesktop
		? {
				position: "absolute",
				top: "14px",
				maxWidth: 440,
				width: "100%",
				borderRadius: "100px",
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: "#FFFFFF",
				marginLeft: "auto",
				marginRight: "auto"
			}
		: {}
	return (
		<Tab.Navigator
			initialRouteName='Today'
			screenOptions={({ route }) => {
				const isActive = currentRoute === route.name
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
					headerShown: false,
					tabBarShowLabel: false,
					tabBarHideOnKeyboard: true,
					tabBarItemStyle: {
						height: isDesktop ? 40 : 80
					},
					tabBarStyle: {
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
