import { GAMES_URI } from "@/constants/app.constants"
import WebViewProvider from "@/providers/WebViewProvider"
import React from "react"

const Man = () => {
	return <WebViewProvider uri={GAMES_URI.Cars} />
}

export default Man
