import React from "react"
import { Dimensions, Platform, View } from "react-native"
import { WebView } from "react-native-webview"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").width

interface IWebViewProviderProps {
	uri: string
}

const WebViewProvider = ({ uri }: IWebViewProviderProps) => {
	const injectedJavaScript = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
	return (
		<View className='flex-1 justify-center items-center'>
			{Platform.OS === "web" ? (
				<iframe src={uri} width='100%' height='100%' />
			) : (
				<WebView
					style={{
						width: deviceWidth,
						resizeMode: "cover",
						flex: 1
					}}
					source={{ uri }}
					scalesPageToFit={false}
					onMessage={event => {
						console.log("event: ", event)
					}}
					injectedJavaScript={injectedJavaScript}
				/>
			)}
		</View>
	)
}

export default WebViewProvider
