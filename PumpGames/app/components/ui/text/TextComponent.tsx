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
			? "text-center text-[35px] text-primary font-bold -tracking-widest font-title"
			: "text-center text-[24px] text-secondary -tracking-widest font-text"
	return (
		<Text className={cn(classname, className)} {...props}>
			{children}
		</Text>
	)
}

export default TextComponent
