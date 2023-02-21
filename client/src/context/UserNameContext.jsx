import { createContext, useState } from 'react'

const UserNameContext = createContext()

const UserNameProvider = ({children}) => {
	const [userName, setUserName] = useState(null)

	const valueToShare = {
		userName: userName,
		setUserName: (name) => {
			setUserName(name)
		}
	}

	return (
		<IsLoginContext.Provider value={valueToShare}>{children}</IsLoginContext.Provider>
	)
}

export {UserNameProvider}
export default UserNameContext