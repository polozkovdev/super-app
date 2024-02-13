import { AppConstants } from "@/constants/app.constants"
import Wrapper from "@/index"
import AuthProvider from "@/providers/AuthProvider"
import { ModalProvider } from "@/providers/ModalProvider"
import { coreStore, StoreProvider } from "@/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
// @ts-ignore
import { NativeWindStyleSheet } from "nativewind"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<StoreProvider value={coreStore}>
					<SafeAreaProvider>
						<SafeAreaView
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: AppConstants.primaryBackground
							}}
						>
							<ModalProvider>
								<GestureHandlerRootView style={{ flex: 1 }}>
									<Wrapper />
								</GestureHandlerRootView>
							</ModalProvider>
						</SafeAreaView>
					</SafeAreaProvider>
				</StoreProvider>
			</AuthProvider>
			<StatusBar style='light' />
		</QueryClientProvider>
	)
}

NativeWindStyleSheet.setOutput({
	default: "native"
})
