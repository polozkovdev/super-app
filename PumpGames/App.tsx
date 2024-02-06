import { AppConstants } from "@/constants/app.constants"
import Wrapper from "@/index"
import AuthProvider from "@/providers/AuthProvider"
import { ModalProvider } from "@/providers/ModalProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
// @ts-ignore
import { NativeWindStyleSheet } from "nativewind"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<SafeAreaView
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: AppConstants.primaryBackground
						}}
					>
						<ModalProvider>
							<Wrapper />
						</ModalProvider>
					</SafeAreaView>
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar style='light' />
		</QueryClientProvider>
	)
}

NativeWindStyleSheet.setOutput({
	default: "native"
})
