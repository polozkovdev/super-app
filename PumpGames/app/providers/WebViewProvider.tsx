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
			var offsetX = 0;
			var offsetY = 0;
			var element = canvas;
	
			// Traverse up the DOM tree to calculate cumulative offsets
			while (element) {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
				element = element.offsetParent;
			}
	
			var screenWidth = ${screenWidth};
			canvas.width = screenWidth;
			canvas.style.width = screenWidth + 'px';
			canvas.style.position = 'absolute';
			canvas.style.top = offsetY + 'px';
			canvas.style.left = offsetX + 'px';
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
