import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setHideNav } from 'src/store/features/general.feature'

interface Props {}

function RouteTracker(props: Props): any {
    // Libraries
    const location = useLocation()
    const dispatch = useDispatch()

    return null // This component doesn't render anything to the DOM
}

export default RouteTracker
