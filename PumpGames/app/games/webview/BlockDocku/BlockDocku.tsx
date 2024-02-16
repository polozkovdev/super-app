import { GAMES_URI } from "@/constants/app.constants"
import gameWrapper from "@/hoc/gameWrapper"
import WebViewProvider from "@/providers/WebViewProvider"
import { observer } from "mobx-react-lite"
import React from "react"
import { Platform } from "react-native"

const BlockDocku = () => {
	if (Platform.OS === "web") {
		return (
			<div
				style={{
					maxWidth: 700,
					maxHeight: 1000,
					width: "100%",
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: "auto",
					marginBottom: "auto",
					height: "100%"
				}}
			>
				<iframe
					src={GAMES_URI.BlockDocku}
					height='100%'
					width='100%'
					frameBorder='0'
				/>
			</div>
		)
	}
	return <WebViewProvider uri={GAMES_URI.BlockDocku} />
}

export default gameWrapper({
	Component: observer(BlockDocku),
	Name: "Block Puzzle"
})
