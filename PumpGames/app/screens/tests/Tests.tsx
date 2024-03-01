import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { ScrollView, View } from "react-native"

const Tests = ({ navigation }: any) => {
	return (
		<View
			style={{
				flex: 1
			}}
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}
				contentContainerStyle={{
					flexGrow: 1,
					position: "relative",
					justifyContent: "center",
					borderWidth: 0,
					alignItems: "center"
				}}
			>
				<Layout navigation={navigation}>
					<View
						className='items-center w-full md:pb-[100px]'
						style={{
							height: "100%"
						}}
					>
						<TextComponent>Tests</TextComponent>
					</View>
				</Layout>
			</ScrollView>
		</View>
	)
}
export default Tests
