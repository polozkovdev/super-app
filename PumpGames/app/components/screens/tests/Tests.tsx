import TextComponent from "@/components/ui/text/TextComponent"
import { View } from "react-native"

const Tests = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<TextComponent type='title'>Tests</TextComponent>
		</View>
	)
}
export default Tests
