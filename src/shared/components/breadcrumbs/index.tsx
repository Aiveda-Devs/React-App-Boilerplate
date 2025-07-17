import { Breadcrumbs, styled, Link } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as C from 'src/shared/styles/Color'
import { useAppSelector } from 'src/store'
import { selectGeneralInfo } from 'src/store/features/general.feature'

interface Links {
    title: string
    data: any
}

interface Props {
    otherLinks: Links[]
    click: (name: string) => void
    particularLinkClick: (data: any) => void
}

const CustomBreadCrumbs = styled(Breadcrumbs)(({ theme }) => ({
    '& .MuiBreadcrumbs-li': {
        color: C.black,
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            margin: '5px 0px',
            fontSize: 12,
        },
    },

    '& .MuiBreadcrumbs-separator': {
        margin: '0 5px',
    },
}))

const CustomLink = styled(Link)(({ theme }) => ({
    cursor: 'pointer',
    textTransform: 'capitalize',
    textDecoration: 'underline',
}))

const AppBreadCrumbs = (props: Props) => {
    const page = useAppSelector(selectGeneralInfo)
    const [links, setLinks] = useState([])

    // Props
    const { otherLinks, click, particularLinkClick } = props

    // Libraries
    const navigate = useNavigate()

    // use-Effect
    useEffect(() => {
        setLinks(otherLinks)
    }, [otherLinks])

    return (
        <Fragment>
            <CustomBreadCrumbs
                className="f-14"
                aria-label="breadcrumb"
                separator=">"
            >
                <CustomLink
                    // onClick={() => navigate('/apps/dashboard')}
                    underline="hover"
                    color={C.black}
                >
                    home
                </CustomLink>
                <CustomLink
                    onClick={() => click(page.pageTitle)}
                    underline="hover"
                    color={C.black}
                >
                    {page.pageTitle ?? ''}
                </CustomLink>

                {links.map((l, i) => (
                    <CustomLink
                        key={i}
                        onClick={() => particularLinkClick(l.data)}
                        underline="hover"
                        color={C.black}
                    >
                        {l.title}
                    </CustomLink>
                ))}
            </CustomBreadCrumbs>
        </Fragment>
    )
}

export default AppBreadCrumbs
