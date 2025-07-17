// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports

import { styled } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from '../../configs/Theme.Config'

import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'
import * as C from '../../shared/styles/Color'
import Appbar from '../app-bar'

const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex',
})

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100vh',
    height: '100%',
    background: C.whiteLilac,
    padding: '8px 10px 20px 10px',
    overflow: 'auto',
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
}))

const SidePanel = (props: any) => {
    // ** Props
    const { settings, contentHeightFixed, verticalLayoutProps } = props

    // ** Vars
    const { skin, contentWidth } = settings
    const navigationBorderWidth = skin === 'bordered' ? 1 : 0
    const { navigationSize, collapsedNavigationSize } = themeConfig
    const navWidth = navigationSize
    const collapsedNavWidth = collapsedNavigationSize

    // ** States
    const [navVisible, setNavVisible] = useState<boolean>(false)

    // ** Toggle Functions
    const toggleNavVisibility = () => setNavVisible(!navVisible)

    return (
        <Fragment>
            <VerticalLayoutWrapper className="layout-wrapper">
                <Navigation
                    navWidth={navWidth}
                    navVisible={navVisible}
                    setNavVisible={setNavVisible}
                    collapsedNavWidth={collapsedNavWidth}
                    toggleNavVisibility={toggleNavVisibility}
                    navigationBorderWidth={navigationBorderWidth}
                    navMenuContent={undefined}
                    navMenuBranding={undefined}
                    menuLockedIcon={undefined}
                    verticalNavItems={verticalLayoutProps.navMenu.navItems}
                    navMenuProps={undefined}
                    menuUnlockedIcon={undefined}
                    afterNavMenuContent={undefined}
                    beforeNavMenuContent={undefined}
                    {...props}
                />
                <ContentWrapper
                    className="layout-page-content"
                    sx={{
                        ...(contentHeightFixed && {
                            overflow: 'hidden',
                            '& > :first-of-type': { height: '100%' },
                        }),
                    }}
                >
                    <Appbar />
                    <div
                        style={{ height: 'calc(100% - 100px)' }}
                        className="Sidepanel-outlet tw-px-3 "
                    >
                        <Outlet />
                    </div>
                </ContentWrapper>
            </VerticalLayoutWrapper>
        </Fragment>
    )
}

export default SidePanel
