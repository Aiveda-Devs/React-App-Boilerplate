// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Custom Icon Import
import Icon from '../../shared/components/Icon'

// ** Configs
import themeConfig from '../../configs/Theme.Config'
import { Link, useMediaQuery } from '@mui/material'

interface Props {
    navHover: boolean
    collapsedNavWidth: number
    hidden: any
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    settings: any
    saveSettings: any
    navMenuBranding?: any
    menuLockedIcon?: any
    menuUnlockedIcon?: any
    setNavHover: (values: boolean) => void
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
    transition: 'padding .25s ease-in-out',
    minHeight: '64px',
}))

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: '1.375rem !important',
    color: theme.palette.text.primary,
    transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
}))

const LinkStyled = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
})

const CustomBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
})

const Logo = styled('img')({
    width: 50,
    height: 50,
})

const NavHeader = (props: Props) => {
    // ** Props
    const {
        hidden,
        navHover,
        settings,
        saveSettings,
        toggleNavVisibility,
        menuLockedIcon: userMenuLockedIcon,
        navMenuBranding: userNavMenuBranding,
        menuUnlockedIcon: userMenuUnlockedIcon,
        setNavHover,
    } = props

    // ** Hooks & Vars
    const theme = useTheme()
    const { mode, navCollapsed } = settings
    const SM = useMediaQuery(theme.breakpoints.down('sm'))

    const menuCollapsedStyles =
        navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

    const menuHeaderPaddingLeft = () => {
        if (navCollapsed && !navHover) {
            if (userNavMenuBranding) {
                return 0
            } else {
                return '16px'
            }
        } else {
            return 2.25
        }
    }

    const conditionalColors = () => {
        if (mode === 'semi-dark') {
            return {
                '& .MuiTypography-root, & .MuiIconButton-root': {
                    color: `rgba(${theme.palette.grey}, 0.87)`,
                },
            }
        } else {
            return {
                '& .MuiTypography-root, & .MuiIconButton-root': {
                    color: 'text.primary',
                },
            }
        }
    }

    return (
        <MenuHeaderWrapper
            className="nav-header NAV-HEADER"
            sx={{
                pl: menuHeaderPaddingLeft(),
                ...conditionalColors(),
            }}
        >
            {userNavMenuBranding ? (
                userNavMenuBranding(props)
            ) : SM ? (
                <CustomBox>
                    <Icon
                        style={{
                            width: navCollapsed ? '76px' : '47px',
                            height: 32,
                        }}
                        onClick={() => {
                            saveSettings({
                                ...settings,
                                navCollapsed: !navCollapsed,
                            })
                            navHover && setNavHover(false)
                        }}
                        icon={
                            navCollapsed
                                ? 'icon-park-outline:hamburger-button'
                                : 'solar:hamburger-menu-bold-duotone'
                        }
                    />
                    <HeaderTitle
                        variant="h6"
                        sx={{
                            ...menuCollapsedStyles,
                            ...(navCollapsed && !navHover
                                ? {}
                                : { ml: '10px' }),
                        }}
                    >
                        {themeConfig.templateName}
                    </HeaderTitle>
                </CustomBox>
            ) : (
                <LinkStyled href="/">
                    <Logo src="/aiveda-logo.png" />
                    <HeaderTitle
                        variant="h6"
                        sx={{
                            ...menuCollapsedStyles,
                            ...(navCollapsed && !navHover
                                ? {}
                                : { ml: '10px' }),
                        }}
                    >
                        {themeConfig.templateName}
                    </HeaderTitle>
                </LinkStyled>
            )}

            {hidden ? (
                <IconButton
                    disableRipple
                    disableFocusRipple
                    onClick={toggleNavVisibility}
                    sx={{
                        p: 0,
                        backgroundColor: 'transparent !important',
                        color: `${
                            mode === 'semi-dark'
                                ? `rbga(${theme.palette.grey}, 0.6)`
                                : theme.palette.text.secondary
                        } !important`,
                    }}
                >
                    <Icon icon="tabler:x" fontSize="1.25rem" />
                </IconButton>
            ) : userMenuLockedIcon === null &&
              userMenuUnlockedIcon === null ? null : (
                <></>
            )}
        </MenuHeaderWrapper>
    )
}

export default NavHeader
