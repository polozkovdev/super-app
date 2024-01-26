import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import { Text, View } from "react-native"

const Today = ({ navigation }: any) => {
	return (
		<Layout>
			<View className='flex-1 justify-center items-center'>
				<Text className='mb-4 text-3xl font-semibold'>Today</Text>
				<View className='mb-6'>
					<Button
						isArrow
						onPress={() => navigation.navigate("BlockDocku")}
						children='Start playing BlockDocku'
					/>
				</View>
				<Button
					isArrow
					onPress={() => navigation.navigate("Man")}
					children='Start playing Man'
				/>
				<Button
					isArrow
					onPress={() => navigation.navigate("BlickPuzzle")}
					children='Start playing BlickPuzzle'
				/>
			</View>
		</Layout>
	)
}
export default Today
