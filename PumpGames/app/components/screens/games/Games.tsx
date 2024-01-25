import BlockDocku from "@/games/BlockDocku/BlockDocku"
import { Text, View } from "react-native"

const Games = () => {
	return (
		<View className='flex-1 items-center justify-center w-full h-full'>
			<Text className='text-white'>top</Text>
			<BlockDocku />
			<Text className='text-white'>bot</Text>
		</View>
	)
}
export default Games
