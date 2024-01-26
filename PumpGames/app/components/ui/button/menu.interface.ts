export interface IButton {
	size?: "md" | "sm"
	isArrow?: boolean
	iconLeftPath?: string
	iconRightPath?: string
	icon?: {
		path: string
		position: "left" | "right"
	}
	onPress: () => void
}
