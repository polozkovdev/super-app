export interface IButton {
	size?: "md" | "sm"
	isArrow?: boolean
	icon?: {
		path: string
		position: "left" | "right"
	}
	onPress: () => void
}
