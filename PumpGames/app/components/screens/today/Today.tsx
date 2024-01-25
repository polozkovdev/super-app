import Button from "@/components/ui/button/Button"
import { Text, View } from "react-native"

const Today = ({ navigation }: any) => {
	return (
		<View className='flex-1 justify-center items-center'>
			<Text>Today</Text>
			<Button
				isArrow
				onPress={() => navigation.navigate("BlockDocku")}
				children='Start playing BlockDocku'
			/>
			<Button
				isArrow
				onPress={() => navigation.navigate("Man")}
				children='Start playing Man'
			/>
		</View>
	)
}
export default Today
