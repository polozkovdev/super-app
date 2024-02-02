import { menuData } from "@/components/ui/layout/bottomMenu/menu.data"
import { AppConstants } from "@/constants/app.constants"
import { useAuth } from "@/hooks/useAuth"
import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { games, routes } from "@/navigation/routes"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"

const Stack = createNativeStackNavigator<TypeRootStackParamList>()
const Tab = createBottomTabNavigator()

const HomeTabs = ({ currentRoute }: { currentRoute?: string }) => {
	const isDesktop = true
	const desktopStyleItem = {
		tabBarItemStyle: { height: 55 }
	}
	const desktopStyle = {
		position: "absolute",
		top: 0,
		maxWidth: 500,
		width: "100%",
		borderRadius: "100px",
		paddingTop: "14px",
		paddingBottom: "14px",
		paddingLeft: "24px",
		paddingRight: "24px",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		height: 55
	}
	return (
		<Tab.Navigator
			initialRouteName='Today'
			screenOptions={({ route }) => {
				const isActive = currentRoute === route.name
				const menu = menuData.find(i => i.path === route.name)
				return {
					tabBarIcon: () => {
						if (isDesktop) {
							console.log("isDestop")
							return (
								<View className='flex-row items-center justify-center gap-1'>
									<Svg
										width={menu?.icon.width}
										height={menu?.icon.height}
										viewBox={menu?.icon.viewBox}
										className={`${isActive ? "fill-[#E57300]" : "fill-[#522725]"} hover:fill-yellow-600`}
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
					tabBarItemStyle: { height: 80 },
					tabBarStyle: {
						height: 80,
						borderTopWidth: 0,
						// DESCTOP !!!!
						position: "absolute",
						top: 0,
						maxWidth: 500,
						width: "100%",
						borderRadius: "100px",
						// paddingTop: "14px",
						// paddingBottom: "14px",
						// paddingLeft: "24px",
						// paddingRight: "24px",
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "#FFFFFF"
						//////////
						// backgroundColor: AppConstants.primaryBackground
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
				headerTitle: () => (
					<View>
						<Text>headerTitle</Text>
					</View>
				),
				headerLeft: () => (
					<View>
						<Text>headerLeft</Text>
					</View>
				),
				headerRight: () => (
					<View>
						<Text>headerRight</Text>
					</View>
				),
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
