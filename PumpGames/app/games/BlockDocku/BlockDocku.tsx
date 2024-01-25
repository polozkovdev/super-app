import { GAMES_URI } from "@/constants/app.constants"
import WebViewProvider from "@/providers/WebViewProvider"
import React from "react"

const BlockDocku = () => {
	return <WebViewProvider uri={GAMES_URI.BlockDocku} />
}

export default BlockDocku
