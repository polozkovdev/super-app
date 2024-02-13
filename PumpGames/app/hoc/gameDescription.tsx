import GameCard from "@/components/ui/gameCard/GameCard"
import TextComponent from "@/components/ui/text/TextComponent"
import { FC, PropsWithChildren } from "react"
import { View } from "react-native"
import { useMediaQuery } from "react-responsive"

interface IGameDescriptionProps {
	source: any
	name: string
	category: string
	route: string
	navigation: any
}

const GameDescription: FC<PropsWithChildren<IGameDescriptionProps>> = ({
	source,
	name,
	category,
	route,
	navigation
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View>
			<View className={`${isDesktop ? "mb-[60px]" : "mb-[50px]"}`}>
				<GameCard
					source={source}
					name={name}
					category={category}
					route={route}
					navigation={navigation}
					isOverview={false}
				/>
			</View>
			<TextComponent
				type='title'
				className={`
				 ${isDesktop ? "text-[40px] leading-[54px]" : "text-[30px] leading-[45px]"}
				`}
			>
				Level
			</TextComponent>
		</View>
	)
}

export default GameDescription
