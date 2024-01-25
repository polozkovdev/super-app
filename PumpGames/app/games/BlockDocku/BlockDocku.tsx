import React from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"

const BlockDocku = () => {
	return (
		<View className='flex-1'>
			<WebView
				className='w-[500] h-[800] flex-1 justify-center items-center scale-50'
				javaScriptEnabled={true}
				scrollEnabled={false}
				allowsFullscreenVideo={true}
				scalesPageToFit={true}
				source={{ uri: "https://pump-games.com/block-puzzle-game/index.html" }}
			/>
		</View>
	)
}

export default BlockDocku
