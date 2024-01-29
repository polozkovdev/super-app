import React from "react"
import { Dimensions, View } from "react-native"
import { WebView } from "react-native-webview"

interface IWebViewProviderProps {
	uri: string
}

const WebViewProvider = ({ uri }: IWebViewProviderProps) => {
	const screenWidth = Dimensions.get("window").width

	const injectedJavaScript = `
    var canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.width = ${screenWidth};
      canvas.style.width = '${screenWidth}px';
      canvas.style.position = 'absolute';
    	canvas.style.top = '0';
    	canvas.style.left = '0';
    }
  `
	return (
		<View style={{ flex: 1 }}>
			<WebView
				source={{ uri }}
				style={{ flex: 1 }}
				injectedJavaScript={injectedJavaScript}
				javaScriptEnabled={true}
				domStorageEnabled={true}
			/>
		</View>
	)
}

export default WebViewProvider
