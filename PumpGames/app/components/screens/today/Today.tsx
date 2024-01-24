import Button from "@/components/ui/button/Button"
import { Text, View } from "react-native"

const Today = () => {
	return (
		<View className='flex-1 justify-center items-center'>
			<Text>Today</Text>
			<Button isArrow onPress={() => {}} children='Start playing' />
		</View>
	)
}
export default Today
