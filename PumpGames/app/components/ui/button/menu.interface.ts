export interface IButton {
	size?: "md" | "sm"
	className?: string
	isArrow?: boolean
	iconLeftPath?: string
	iconRightPath?: string
	icon?: {
		path: string
		position: "left" | "right"
	}
	onPress: () => void
}
