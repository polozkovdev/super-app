import TextComponent from "@/components/ui/text/TextComponent"
import { PAGE_WIDTH } from "@/constants/app.constants"
import { FC, PropsWithChildren } from "react"
import { Image, View } from "react-native"
import { useMediaQuery } from "react-responsive"
import { IGame } from "types"

interface IBenefitsProps {
	Game: IGame
}

const Benefits: FC<PropsWithChildren<IBenefitsProps>> = ({
	Game: { benefits }
}) => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 724px)"
	})
	return (
		<View
			className={`
			${isDesktop ? "gap-[40px] mb-[80px] flex-row justify-center flex-wrap items-center" : `gap-[30px] mb-[30px] `}
		`}
			style={{
				maxWidth: isDesktop ? "100%" : PAGE_WIDTH,
				marginLeft: "auto",
				marginRight: "auto",
				flex: 1
			}}
		>
			{benefits.map(({ title, description, source }) => {
				return (
					<View
						key={title}
						className={`mx-auto md:mx-0 flex-row items-center md:w-[460px]`}
					>
						<View
							className={`rounded-full border-[1.5px] border-[#3F1210]/20
							 items-center justify-center flex-row
								${isDesktop ? "w-[50px] h-[50px] mr-[30px]" : "w-[60px] h-[60px] mr-[20px]"}
							`}
						>
							<Image
								className='h-[25px]'
								resizeMode='contain'
								source={source}
							/>
						</View>
						<View
							style={{
								flex: 1
							}}
						>
							<TextComponent className='text-left text-[24px]  text-primary'>
								{title}
							</TextComponent>
							<TextComponent className='text-left text-[18px] text-primary/60 font-subtitle'>
								{description}
							</TextComponent>
						</View>
					</View>
				)
			})}
		</View>
	)
}

export default Benefits
