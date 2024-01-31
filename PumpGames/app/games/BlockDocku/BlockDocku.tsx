import { GAMES_URI } from "@/constants/app.constants"
import WebViewProvider from "@/providers/WebViewProvider"
import React from "react"
import { Platform } from "react-native"

const BlockDocku = () => {
	if (Platform.OS === "web") {
		return <iframe src={GAMES_URI.BlockDocku} height='100%' frameBorder='0' />
	}
	return <WebViewProvider uri={GAMES_URI.BlockDocku} />
}

export default BlockDocku
