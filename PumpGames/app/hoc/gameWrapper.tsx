import Timer from "@/components/features/Timer/Timer"
import Handler from "@/components/ui/handler/Handler"
import HeaderGame from "@/components/ui/headerGame/HeaderGame"
import Layout from "@/components/ui/layout/Layout"
import React from "react"
import { Image, View } from "react-native"

const gameWrapper =
	<C extends Object>({ Component }: any) =>
	(props: C) => {
		return (
			<View
				style={{
					flex: 1
				}}
			>
				<Layout isHeader={false}>
					<View
						style={{
							flex: 1
						}}
					>
						<HeaderGame />
						<Component />
					</View>
					<View className='flex-row space-x-[14px]'>
						<Timer />
						<Handler>
							<Image
								className={`w-6 h-6`}
								resizeMode='contain'
								source={require("@/assets/ui/back.png")}
							/>
						</Handler>
						<Handler>
							<Image
								className={`w-6 h-6`}
								resizeMode='contain'
								source={require("@/assets/ui/union.png")}
							/>
						</Handler>
					</View>
				</Layout>
			</View>
		)
	}

export default gameWrapper
