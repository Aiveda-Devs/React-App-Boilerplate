import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutQuery } from 'src/services/user.service'
import { logout } from 'src/shared/utils/Common.Utils'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, isFetching, isSuccess } = useLogoutQuery()

    useEffect(() => {
        localStorage.removeItem('nm-corp-token')
        dispatch(logout())
        navigate('/auth/login')
    }, [])

    return <></>
}

export default Logout
