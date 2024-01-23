import { IUserInterface } from "@/types/user.interface"
import * as Splash from "expo-splash-screen"
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState
} from "react"

export type TypeUserState = IUserInterface | null

interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)

let ignore = Splash.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>({} as IUserInterface)
	useEffect(() => {
		let isMounted = false
		const getUserFromStorage = async () => {
			if (isMounted) {
				// get user from async storage and write to store
			}
			await Splash.hideAsync()
		}

		let ignore = getUserFromStorage()

		return () => {
			isMounted = false
		}
	}, [])
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
