// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, useTheme } from '@mui/material/styles'

import { Link, useLocation } from 'react-router-dom'

// ** Configs Import
import themeConfig from '../../configs/Theme.Config'

// ** Types
import { Settings } from '../../context/Settings.Context'

// ** Custom Components Imports
import UserIcon from '../../shared/components/User.Icon'

// ** Util Imports
import * as C from '../../shared/styles/Color'
import { hexToRGBA } from '../../shared/utils/Common.Utils'

interface Props {
    parent?: boolean
    item: any
    navHover?: boolean
    settings: Settings
    navVisible?: boolean
    collapsedNavWidth: number
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    isSubToSub?: any | undefined
}

// ** Styled Components
const MenuNavLink = styled(Link)(({ theme }) => ({
    marginLeft: theme.spacing(1.75),
    marginRight: theme.spacing(1.75),
    borderRadius: '6px',
    transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
    '&.active': {
        '&, &:hover': {
            boxShadow: `0px 2px 6px ${hexToRGBA(C.theme, 0.48)}`,
            // background: `linear-gradient(72.47deg, ${
            //     theme.direction === 'ltr' ? C.theme : hexToRGBA(C.theme, 0.7)
            // } 22.16%, ${
            //     theme.direction === 'ltr' ? hexToRGBA(C.theme, 0.7) : C.theme
            // } 76.47%)`,
            background: C.theme,
            '&.Mui-focusVisible': {
                background: `linear-gradient(72.47deg, ${
                    theme.palette.primary.dark
                } 22.16%, ${hexToRGBA(
                    theme.palette.primary.dark,
                    0.7
                )} 76.47%)`,
            },
        },
        '& .MuiTypography-root, & svg': {
            color: `${theme.palette.common.white} !important`,
        },
    },
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
}))

const VerticalNavLink = ({
    item,
    parent,
    navHover,
    settings,
    navVisible,
    isSubToSub,
    toggleNavVisibility,
}: Props) => {
    // ** Hooks
    const theme = useTheme()
    const router = useLocation()

    // ** Vars
    const { mode, navCollapsed } = settings

    const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

    const conditionalColors = () => {
        if (mode === 'semi-dark') {
            return {
                '&:hover': {
                    backgroundColor: `rgba(${theme.palette.grey}, 0.04)`,
                },
                '& .MuiTypography-root, & svg': {
                    color: `rgba(${theme.palette.grey}, 0.6)`,
                },
            }
        } else
            return {
                '& .MuiTypography-root, & svg': {
                    color: 'text.secondary',
                },
            }
    }

    const isNavLinkActive = () => {
        if (
            router.pathname === item.path
            // || handleURLQueries(item.path)
        ) {
            return true
        } else {
            return false
        }
    }

    return (
        <ListItem
            disablePadding
            className="nav-link RANDOM"
            disabled={item.disabled || false}
            sx={{ mt: 0.5, px: '0 !important' }}
        >
            <MenuNavLink
                className={isNavLinkActive() ? 'active' : ''}
                {...(item.disabled && { tabIndex: -1 })}
                {...(item.openInNewTab ? { target: '_blank' } : null)}
                sx={{
                    py: 1,
                    ...conditionalColors(),
                    ...(item.disabled
                        ? { pointerEvents: 'none' }
                        : { cursor: 'pointer' }),
                    px: navCollapsed && !navHover ? '16px' : 2,
                    display: 'flex',
                    width: navCollapsed && !navHover ? '72%' : '100%',
                }}
                to={item.path}
                onClick={(e) => {
                    if (item.path === undefined) {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                    if (navVisible) {
                        toggleNavVisibility()
                    }
                }}
            >
                <ListItemIcon
                    sx={{
                        transition: 'margin .25s ease-in-out',
                        minWidth: '0 !important',
                        alignItems: 'center',
                        ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
                        ...(parent ? { ml: 0.75, mr: 1.75 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                        '& svg': {
                            fontSize: '0.625rem',
                            ...(!parent ? { fontSize: '1.375rem' } : {}),
                            ...(parent && item.icon
                                ? { fontSize: '0.875rem' }
                                : {}),
                        },
                    }}
                >
                    <UserIcon icon={icon as string} />
                </ListItemIcon>

                <MenuItemTextMetaWrapper
                    sx={{
                        ...(isSubToSub ? { ml: 2 } : {}),
                        ...(navCollapsed && !navHover
                            ? { opacity: 0 }
                            : { opacity: 1 }),
                    }}
                >
                    <Typography
                        {...((themeConfig.menuTextTruncate ||
                            (!themeConfig.menuTextTruncate &&
                                navCollapsed &&
                                !navHover)) && {
                            noWrap: true,
                        })}
                    >
                        {item.title}
                    </Typography>
                    {item.badgeContent ? (
                        <Chip
                            label={item.badgeContent}
                            color={item.badgeColor || 'primary'}
                            sx={{
                                height: 20,
                                fontWeight: 500,
                                '& .MuiChip-label': {
                                    px: 1.5,
                                    textTransform: 'capitalize',
                                },
                            }}
                        />
                    ) : null}
                </MenuItemTextMetaWrapper>
            </MenuNavLink>
        </ListItem>
    )
}

export default VerticalNavLink
