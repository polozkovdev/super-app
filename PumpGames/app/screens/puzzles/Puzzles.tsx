import TextComponent from "@/components/ui/text/TextComponent"
import { View } from "react-native"

const Puzzles = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<TextComponent type='title'>Puzzles</TextComponent>
		</View>
	)
}
export default Puzzles
