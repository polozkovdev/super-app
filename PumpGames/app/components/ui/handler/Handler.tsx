import React, { FC, PropsWithChildren } from "react"
import { View } from "react-native"

interface IHandlerProps {
	className?: string
	style?: any
}

const Handler: FC<PropsWithChildren<IHandlerProps>> = ({
	children,
	className,
	style
}) => {
	return (
		<View
			style={style}
			className={`flex-row items-center justify-center rounded-[34px]
				 bg-white shadow-[black]/10 shadow-sm min-w-[60px] min-h-[60px] ${className}`}
		>
			{children}
		</View>
	)
}

export default Handler
