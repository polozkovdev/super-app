import { AppConstants } from "@/constants/app.constants"
import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

const Loading = () => (
	<View style={[styles.container, styles.horizontal]}>
		<ActivityIndicator size='small' color={AppConstants.accent} />
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: AppConstants.primaryBackground
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
})

export default Loading
