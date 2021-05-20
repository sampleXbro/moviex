import {getUser} from '../redux/slices/userSlice'
import {useAppDispatch, useAppSelector} from '../redux/hooks'

export default function Login() {
  const user = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()

  const getUserHandler = () => {
    dispatch(getUser())
  }

  return (
    <div>
      <button onClick={getUserHandler}>Get user</button>
      <p>{user.id}</p>
      <p>{user.email}</p>
    </div>
  );
};