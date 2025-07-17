import {
    Box,
    Button,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import * as C from '../../shared/styles/Color'
import IconifyIcon from 'src/shared/components/Icon'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'

// CSS
import './index.css'
import { useAppSelector } from 'src/store'

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    background: C.theme,
    borderRadius: '5px',
    margin: '10px 10px 20px',
})

const Image = styled('img')({
    borderRadius: '50%',
    border: '1px solid white',
    cursor: 'pointer',
})

const Appbar = () => {
    // responsive
    const SM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    // Libraries
    const navigate = useNavigate()

    // Menu Config

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: any) => {
        Cookies.get('token')
            ? setAnchorEl(event.currentTarget)
            : navigate('/auth/login')
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // Store Data

    const companyName = useAppSelector(
        (state) => state.userConfig?.config?.companyName
    )

    const currentDate = dayjs()

    // Get the day of the week (0-6, where 0 is Sunday)
    const dayName = currentDate.format('dddd')

    // Get the current time (hours, minutes, seconds)
    const [currentTime, setCurrentTime] = useState(currentDate.format('HH:mm'))

    // Get the current date in the format "Month Day, Year"
    const formattedDate = currentDate.format('MMMM DD, YYYY')

    // Hide Side Panel

    const hideSidePanel = () => {
        let hide: boolean = false

        if (window.location.pathname.includes('/apps/interview')) {
            hide = true
        }

        return hide
    }

    useEffect(() => {
        const id = setInterval(() => {
            const currentDate = dayjs()
            const formattedTime = currentDate.format('HH:mm')
            setCurrentTime(formattedTime)
        }, 60000)

        return () => {
            clearInterval(id)
        }
    }, [])

    return (
        <StyledBox hidden={hideSidePanel()}>
            <Typography
                className="ml-10 mr-10 tw-flex tw-flex-row tw-items-center"
                sx={{
                    fontWeight: '100',
                    color: C.white,
                }}
                fontSize={SM ? 15 : 24}
            >
                <span className="tw-pr-1 ">Welcome to Watsonhive</span>
            </Typography>

            <Box className="mr-5 tw-flex tw-items-center">
                <p hidden={SM} className="tw-px-3 flex">
                    <span className="tw-px-1">{currentTime}</span>
                    <span className="tw-px-1">&bull;</span>
                    <span className="tw-px-1 offBlack">{dayName}</span>
                    <span className="tw-px-1 offBlack">{formattedDate}</span>
                </p>
                <Fragment>
                    {/* <Avatar
                        skin="filled"
                        color="primary"
                        className="w-42 h-42 f-18 mr-10"
                    >
                        {getInitials(false ? 'John Doe' : 'John Doe')}
                    </Avatar> */}
                    <Image
                        className="w-46"
                        src={'/user-image.png'}
                        alt="user-img"
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            aria-hidden="true"
                            className="flex align-center pt-10 pb-10"
                            onClick={() => {
                                navigate('/apps/hr/profile')
                                handleClose()
                            }}
                        >
                            <IconifyIcon
                                className="offBlack mr-12"
                                icon={'mdi:user-circle'}
                            />
                            <span className="f-14 w-100">Profile</span>
                        </MenuItem>

                        <MenuItem
                            className="flex align-center pt-10 pb-10"
                            onClick={() => {
                                navigate('/auth/logout')
                                handleClose()
                            }}
                        >
                            <IconifyIcon
                                className="offBlack mr-12"
                                icon="tabler:logout"
                            />
                            <span className="f-14">Logout</span>
                        </MenuItem>
                    </Menu>
                </Fragment>
            </Box>
        </StyledBox>
    )
}

export default Appbar
