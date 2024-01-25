import { menuData } from "@/components/ui/layout/menu.data"
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
	return (
		<Tab.Navigator
			initialRouteName='Today'
			screenOptions={({ route }) => {
				const isActive = currentRoute === route.name
				const menu = menuData.find(i => i.path === route.name)
				return {
					tabBarIcon: () => {
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
								<Text className={isActive ? "text-orange" : "text-secondary"}>
									{menu?.text}
								</Text>
							</View>
						)
					},
					tabBarShowLabel: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						backgroundColor: AppConstants.primaryBackground
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
