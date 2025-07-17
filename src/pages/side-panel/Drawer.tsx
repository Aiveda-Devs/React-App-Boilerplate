// ** MUI Imports
import { useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiSwipeableDrawer, {
    SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer'

interface Props {
    navWidth: number
    navHover: boolean
    navVisible: boolean
    collapsedNavWidth: number
    hidden: any
    navigationBorderWidth: number
    settings: any
    children: any
    setNavHover: (values: boolean) => void
    setNavVisible: (value: boolean) => void
    navMenuProps: any
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out',
    '& ul': {
        listStyle: 'none',
    },
    '& .MuiListItem-gutters': {
        paddingLeft: 4,
        paddingRight: 4,
    },
    '& .MuiDrawer-paper': {
        left: 'unset',
        right: 'unset',
        overflowX: 'hidden',
        transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out',
    },
})

const Drawer = (props: Props) => {
    // ** Props
    const {
        hidden,
        children,
        navHover,
        navWidth,
        settings,
        navVisible,
        setNavHover,
        navMenuProps,
        setNavVisible,
        collapsedNavWidth,
        navigationBorderWidth,
    } = props

    // ** Hook
    const theme = useTheme()
    const SM = useMediaQuery(theme.breakpoints.down('sm'))

    // ** Vars
    const { mode, skin, navCollapsed } = settings

    let flag = true

    const drawerColors = () => {
        if (mode === 'semi-dark') {
            return {
                backgroundColor: 'customColors.darkPaperBg',
            }
        } else
            return {
                backgroundColor: 'background.paper',
            }
    }

    // Drawer Props for Mobile & Tablet screens
    const MobileDrawerProps = {
        open: navVisible,
        onOpen: () => setNavVisible(true),
        onClose: () => setNavVisible(false),
        ModalProps: {
            keepMounted: true, // Better open performance on mobile.
        },
    }

    // Drawer Props for Laptop & Desktop screens
    const DesktopDrawerProps = {
        open: true,
        onOpen: () => {
            return
        },
        onClose: () => {
            return
        },
        onMouseEnter: () => {
            // Declared flag to resolve first time flicker issue while trying to collapse the menu
            if ((flag || navCollapsed) && !SM) {
                setNavHover(true)
                flag = false
            }
        },
        onMouseLeave: () => {
            if (navCollapsed && !SM) {
                setNavHover(false)
            }
        },
    }

    let userNavMenuStyle = {}
    let userNavMenuPaperStyle = {}
    if (navMenuProps && navMenuProps.sx) {
        userNavMenuStyle = navMenuProps.sx
    }
    if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
        userNavMenuPaperStyle = navMenuProps.PaperProps.sx
    }
    const userNavMenuProps = Object.assign({}, navMenuProps)
    delete userNavMenuProps.sx
    delete userNavMenuProps.PaperProps

    return (
        <SwipeableDrawer
            className="layout-vertical-nav DRAWER"
            variant={hidden ? 'temporary' : 'permanent'}
            {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
            PaperProps={{
                sx: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    ...drawerColors(),
                    ...(!hidden && skin !== 'bordered' && { boxShadow: 6 }),
                    width:
                        navCollapsed && !navHover
                            ? collapsedNavWidth
                            : navWidth,
                    borderRight:
                        navigationBorderWidth === 0
                            ? 0
                            : `${navigationBorderWidth}px solid ${theme.palette.divider}`,
                    ...userNavMenuPaperStyle,
                },
                ...navMenuProps?.PaperProps,
            }}
            sx={{
                width: navCollapsed ? collapsedNavWidth : navWidth,
                ...userNavMenuStyle,
            }}
            {...userNavMenuProps}
        >
            {children}
        </SwipeableDrawer>
    )
}

export default Drawer
