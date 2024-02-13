/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		letterSpacing: {
			title: "2px",
			text: "1px"
		},
		extend: {
			colors: {
				orange: "#E57300",
				secondary: "#522725",
				accent: "#9B4AFF",
				primary: "#3F1210",
				borderGreen: "#18A300",
				green: "#5FD34B",
				white: "#FFFFFF",
				primaryBackground: "#F8F4E8",
				black: "#000000"
			}
		},
		fontFamily: {
			title: ["DM-SemiBold"],
			subtitle: ["DM-Medium"],
			text: ["CP-Regular"]
		}
	},
	plugins: []
}
