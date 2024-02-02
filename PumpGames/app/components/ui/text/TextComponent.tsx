import { cn } from "@/helpers/cn"
import React, { ReactNode } from "react"
import { Text, TextProps } from "react-native"

interface ITextComponentProps extends TextProps {
	type?: "title" | "text"
	children: ReactNode
}

const TextComponent: React.FC<ITextComponentProps> = ({
	type = "text",
	children,
	className,
	...props
}) => {
	const classname =
		type === "title"
			? "text-center text-[36px] leading-[38px] text-primary font-bold -tracking-title font-title md:text-[60px] md:leading-[62px]"
			: "text-center text-[24px] leading-[28px] text-secondary/80 -tracking-text font-text md:text-[28px] md:leading-[32px]"
	return (
		<Text className={cn(classname, className)} {...props}>
			{children}
		</Text>
	)
}

export default TextComponent
