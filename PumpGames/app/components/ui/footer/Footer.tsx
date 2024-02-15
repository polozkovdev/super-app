import TextComponent from "@/components/ui/text/TextComponent"
import { Image, View } from "react-native"

const Footer = () => {
	return (
		<View className='items-center w-[100%] md:flex-row md:flex md:justify-between md:mt-auto'>
			<View className='hidden md:flex'>
				<TextComponent className='font-[20px] leading-[28px] font-subtitle'>
					© Mighty Minds
				</TextComponent>
			</View>
			<View className='flex-1 items-center w-full mb-[40px] md:mb-0 md:flex-row md:flex md:justify-center opacity-60 md:opacity-50'>
				<View className='md:mr-10'>
					<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
						Trust & Safety
					</TextComponent>
					<View className='bg-primary h-[1.5px] opacity-10  md:hidden' />
				</View>
				<View className='md:mr-10'>
					<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
						Get help
					</TextComponent>
					<View className='bg-primary h-[1.5px] opacity-10  md:hidden' />
				</View>
				<View className='md:mr-10'>
					<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
						Share feedback
					</TextComponent>
					<View className='bg-primary h-[1.5px] opacity-10 md:hidden' />
				</View>
				<View>
					<TextComponent className='leading-[65px] text-[18px] font-subtitle'>
						Terms & Privacy
					</TextComponent>
				</View>
			</View>
			<Image
				className='mb-[60px] md:mb-0 w-[30px] h-[30px]'
				resizeMode='cover'
				source={require("@/assets/ui/logo_mini.png")}
			/>
		</View>
	)
}

export default Footer
