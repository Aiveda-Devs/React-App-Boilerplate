// ** React Import
import { useRef, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import themeConfig from '../../configs/Theme.Config'

// ** Component Imports
import Drawer from './Drawer'
import NavItems from './NavItems'
import NavHeader from './NavHeader'

// ** Util Import
import { hexToRGBA } from '../../shared/utils/Common.Utils'

interface Props {
    navWidth: number
    navVisible: boolean
    collapsedNavWidth: number
    hidden: any
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    settings: any
    children: any
    setNavVisible: (value: boolean) => void
    saveSettings: any
    navMenuContent: any
    navMenuBranding: any
    menuLockedIcon: any
    verticalNavItems: any
    navMenuProps: any
    menuUnlockedIcon: any
    afterNavMenuContent: any
    beforeNavMenuContent: any
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
    top: 60,
    left: -8,
    zIndex: 2,
    opacity: 0,
    position: 'absolute',
    pointerEvents: 'none',
    width: 'calc(100% + 15px)',
    height: '64px',
    transition: 'opacity .15s ease-in-out',
    '&.scrolled': {
        opacity: 1,
    },
}))

const Navigation = (props: Props) => {
    // ** Props
    const {
        hidden,
        settings,
        afterNavMenuContent,
        beforeNavMenuContent,
        navigationBorderWidth,
        navMenuContent: userNavMenuContent,
    } = props

    // ** States
    const [navHover, setNavHover] = useState<boolean>(false)
    const [groupActive, setGroupActive] = useState<string[]>([])
    const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])

    // ** Ref
    const shadowRef = useRef(null)

    // ** Hooks
    const theme = useTheme()

    // ** Var
    const {
        afterVerticalNavMenuContentPosition,
        beforeVerticalNavMenuContentPosition,
    } = themeConfig

    // ** Settings

    const { navCollapsed } = settings
    const openSidePanel = navCollapsed && !navHover

    // ** Fixes Navigation InfiniteScroll
    const handleInfiniteScroll = (ref: HTMLElement) => {
        if (ref) {
            // @ts-ignore
            ref._getBoundingClientRect = ref.getBoundingClientRect

            ref.getBoundingClientRect = () => {
                // @ts-ignore
                const original = ref._getBoundingClientRect()

                return { ...original, height: Math.floor(original.height) }
            }
        }
    }

    // ** Scroll Menu
    const scrollMenu = (container: any) => {
        if (
            beforeVerticalNavMenuContentPosition === 'static' ||
            !beforeNavMenuContent
        ) {
            container = hidden ? container.target : container
            if (shadowRef && container.scrollTop > 0) {
                // @ts-ignore
                if (!shadowRef.current.classList.contains('scrolled')) {
                    // @ts-ignore
                    shadowRef.current.classList.add('scrolled')
                }
            } else {
                // @ts-ignore
                shadowRef.current.classList.remove('scrolled')
            }
        }
    }

    const shadowBgColor = () => {
        return `linear-gradient(${
            theme.palette.background.paper
        } 5%,${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
            theme.palette.background.paper,
            0.5
        )} 65%,${hexToRGBA(
            theme.palette.background.paper,
            0.3
        )} 75%,transparent)`
    }

    const ScrollWrapper = hidden ? Box : PerfectScrollbar

    return (
        <Drawer
            {...props}
            navHover={navHover}
            setNavHover={setNavHover}
            navigationBorderWidth={navigationBorderWidth}
        >
            <div>
                <NavHeader
                    {...props}
                    navHover={navHover}
                    setNavHover={setNavHover}
                />
                {beforeNavMenuContent &&
                beforeVerticalNavMenuContentPosition === 'fixed'
                    ? beforeNavMenuContent(props)
                    : null}
                {(beforeVerticalNavMenuContentPosition === 'static' ||
                    !beforeNavMenuContent) && (
                    <StyledBoxForShadow
                        ref={shadowRef}
                        sx={{ background: shadowBgColor() }}
                    />
                )}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    {/* @ts-ignore */}
                    <ScrollWrapper
                        {...(hidden
                            ? {
                                  onScroll: (container: any) =>
                                      scrollMenu(container),
                                  sx: {
                                      height: '100%',
                                      overflowY: 'auto',
                                      overflowX: 'hidden',
                                  },
                              }
                            : {
                                  options: { wheelPropagation: false },
                                  onScrollY: (container: any) =>
                                      scrollMenu(container),
                                  containerRef: (ref: any) =>
                                      handleInfiniteScroll(ref),
                              })}
                    >
                        {beforeNavMenuContent &&
                        beforeVerticalNavMenuContentPosition === 'static'
                            ? beforeNavMenuContent(props)
                            : null}
                        {userNavMenuContent ? (
                            userNavMenuContent(props)
                        ) : (
                            <List
                                className="nav-items"
                                sx={{
                                    pt: 0,
                                    '& > :first-of-type': { mt: '0' },
                                }}
                            >
                                <NavItems
                                    navHover={navHover}
                                    groupActive={groupActive}
                                    setGroupActive={setGroupActive}
                                    currentActiveGroup={currentActiveGroup}
                                    setCurrentActiveGroup={
                                        setCurrentActiveGroup
                                    }
                                    {...props}
                                />
                            </List>
                        )}
                        {afterNavMenuContent &&
                        afterVerticalNavMenuContentPosition === 'static'
                            ? afterNavMenuContent(props)
                            : null}
                    </ScrollWrapper>
                </Box>
                {afterNavMenuContent &&
                afterVerticalNavMenuContentPosition === 'fixed'
                    ? afterNavMenuContent(props)
                    : null}
            </div>

            <div
                // hidden={openSidePanel}
                className="tw-m-2 tw-px-2 tw-text-center white"
            >
                {openSidePanel ? (
                    <img
                        className="tw-h-[50px] tw-w-[50px]"
                        src="/aiveda-logo.png"
                    />
                ) : (
                    <div className="bg-theme tw-flex tw-items-center tw-justify-center tw-px-1 tw-py-2 tw-rounded-xl">
                        <img
                            className="tw-h-[30px] tw-w-[30px] tw-rounded-full"
                            src="/aiveda-logo.png"
                        />
                        <p className="tw-text-sm tw-pl-2 ">
                            A product by <b>Aiveda</b>
                        </p>
                    </div>
                )}
            </div>
        </Drawer>
    )
}

export default Navigation
