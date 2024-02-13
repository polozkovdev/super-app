export interface IButton {
	size?: "md" | "sm"
	className?: string
	isArrow?: boolean
	iconLeftPath?: string
	iconRightPath?: any
	icon?: {
		path: string
		position: "left" | "right"
	}
	onPress: () => void
}
