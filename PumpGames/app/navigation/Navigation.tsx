import BottomMenu from "@/components/ui/layout/BottomMenu"
import { useAuth } from "@/hooks/useAuth"
import PrivateNavigation from "@/navigation/PrivateNavigation"
import { useNavigationContainerRef } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"

const Navigation = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)
	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)
		const listener = navRef.addListener("state", () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)
		return () => {
			navRef.removeListener("state", listener)
		}
	}, [])
	return (
		<>
			<NavigationContainer ref={navRef}>
				<PrivateNavigation />
				{user && currentRoute && (
					<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
				)}
			</NavigationContainer>
		</>
	)
}
export default Navigation
