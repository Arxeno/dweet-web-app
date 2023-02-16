import { useParams } from 'react-router-dom'

const Profile = () => {
	let { userId } = useParams()

  return (
    <div>{userId}'s Page</div>
  )
}

export default Profile;