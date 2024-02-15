import GameCategories from "@/components/features/GameCategories/GameCategories"
import GameList from "@/components/features/GameList/GameList"
import Button from "@/components/ui/button/Button"
import Layout from "@/components/ui/layout/Layout"
import TextComponent from "@/components/ui/text/TextComponent"
import { AppConstants, CATEGORIES_LIST } from "@/constants/app.constants"
import React, { useState } from "react"
import { ScrollView, View } from "react-native"

const Games = ({ navigation }: any) => {
	const [category, setCategory] = useState(CATEGORIES_LIST[0])
	return (
		<View
			style={{
				flex: 1
			}}
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: AppConstants.primaryBackground }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					borderWidth: 0,
					alignItems: "center"
				}}
			>
				<Layout>
					<View
						className='items-center justify-center w-full md:pb-[100px]'
						style={{
							height: "100%"
						}}
					>
						<View className='mb-[20px] w-full md:mb-[40px]'>
							<TextComponent type='title'>Games</TextComponent>
						</View>
						<View className='mb-[30px] w-full md:hidden'>
							<TextComponent>
								Unlock your potential with{"\n"} Mighty brain games
							</TextComponent>
						</View>
						<View className='mb-[50px] w-full'>
							<GameCategories category={category} setCategory={setCategory} />
						</View>
						<View className='mb-[40px] w-full hidden md:flex'>
							<TextComponent>
								Unlock your potential with{"\n"} Mighty brain games
							</TextComponent>
						</View>
						<View className='flex-row space-x-2 items-center justify-center w-full max-w-[100%] overflow-hidden mb-[50px]'>
							<View className='h-[2px] w-full bg-[#3F1210]/10' />
							<View
								className={`pt-1 pb-1 pl-4 pr-4 border-[#3F1210]/10 border-[1px] rounded-full`}
							>
								<TextComponent
									className={`text-[18px] font-subtitle text-primary`}
								>
									Free games
								</TextComponent>
							</View>
							<View className='h-[2px] w-full bg-[#3F1210]/10' />
						</View>
						<GameList category={category} navigation={navigation} />
						<View className='mt-auto shadow-[black]/10 shadow-sm md:shadow-none hidden md:block'>
							<Button
								children='Start playing'
								isArrow
								onPress={() => navigation.navigate("Games")}
							/>
						</View>
					</View>
				</Layout>
				<View className='absolute bottom-4 left-0 right-0 shadow-[black]/10 shadow-sm md:hidden'>
					<Button
						children='Start playing'
						iconLeftPath='@/assets/ui/unlock.png'
						onPress={() => alert("unlock")}
					/>
				</View>
			</ScrollView>
		</View>
	)
}
export default Games
