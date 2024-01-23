import { AppConstants } from "@/constants/app.constants"
import { useAuth } from "@/hooks/useAuth"
import { TypeRootStackParamList } from "@/navigation/navigation.types"
import { routes } from "@/navigation/routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigation = () => {
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
			{routes.map(route => {
				return <Stack.Screen key={route.name} {...route} />
			})}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
