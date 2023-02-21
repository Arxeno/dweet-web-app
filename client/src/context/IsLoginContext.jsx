import { createContext, useState } from 'react'

const IsLoginContext = createContext()

const IsLoginProvider = ({children}) => {
	const [isLogin, setIsLogin] = useState(false)

	const valueToShare = {
		isLogin: isLogin,
		setIsLogin: (bool) => {
			setIsLogin(bool)
		}
	}

	return (
		<IsLoginContext.Provider value={valueToShare}>{children}</IsLoginContext.Provider>
	)
}

export {IsLoginProvider}
export default IsLoginContext