import { Card, CardContent, styled } from '@mui/material'
import { Fragment } from 'react'
import { CardData } from 'src/core/types'
import * as C from 'src/shared/styles/Color'
import IconifyIcon from '../Icon'

interface Props {
    courseData: CardData
    width?: number | string
    bordered?: boolean
    active?: boolean
    color?: string
    bgColor?: string
    onEdit?: (data: any) => void
    hover?: boolean
    showOptionsIcon?: boolean
    openMenu?: (data: any) => void
    hideEditIcon?: boolean
}

const CustomCard = styled(Card)({
    '&.bordered': {
        border: `0.5px solid ${C.FadeBlack}`,
    },
    '&.hovered:hover': {
        background: C.theme,
        color: C.white,
        '.progress, .updated, .description, .footer, .edit': {
            color: `${C.white} !important`,
        },
    },
})

const CardComponent = (props: Props) => {
    //  Props
    const {
        courseData,
        width,
        bordered,
        bgColor,
        color,
        onEdit,
        hover,
        showOptionsIcon,
        openMenu,
        hideEditIcon,
    } = props

    const customWidth = width === null || width === 0 ? width : 320

    return (
        <CustomCard
            elevation={0}
            className={`br-16 pointer ${
                bordered ? 'bordered' : ''
            } ${bgColor} ${hover && 'hovered'}`}
            sx={{ minWidth: customWidth, maxWidth: customWidth }}
        >
            <CardContent className="pb-16">
                <div className="flex justify-space-between align-center">
                    <img
                        className="w-24 h-24 bg-black"
                        src={courseData.url ? courseData.url : '/WH.png'}
                        alt="icon"
                    />
                    <div className="flex">
                        {courseData.progress !== null ? (
                            <p
                                className={`progress fw-bold ${
                                    color ?? 'theme'
                                }`}
                            >
                                {courseData.progress}
                            </p>
                        ) : (
                            <Fragment></Fragment>
                        )}

                        <div className="flex align-center">
                            <IconifyIcon
                                style={{
                                    display: showOptionsIcon ? '' : 'none',
                                }}
                                onClick={(e: any) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    openMenu(e)
                                }}
                                className="ml-2"
                                icon="mage:dots"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`updated f-11 mt-10 ${
                        color ?? 'offBlack'
                    } text-capitalize`}
                >
                    {courseData.subTitle ?? 'Updated'} &bull;{' '}
                    {courseData.timing ?? 0}
                </div>
                <div
                    className={`f-16 fw-bold mt-3 mb-4 text-capitalize ${color}`}
                >
                    {courseData.title}
                </div>
                <div
                    className={`description f-11 ${color ?? 'offBlack'} ${
                        courseData?.experience ? 'h-50' : 'h-70'
                    } overflow-y-scroll hide-scrollbar`}
                >
                    {courseData.description}
                </div>
                <div
                    className={`f-11 flex align-center  mt-10 ${
                        courseData?.experience
                            ? 'justify-space-between'
                            : 'tw-justify-end'
                    }`}
                >
                    <div hidden={!courseData?.experience}>
                        <p>
                            <span className={`${color} fw-bold`}>
                                {courseData?.experience}
                            </span>
                            {'  '}
                            <span
                                className={`footer f-10 ${
                                    color ?? 'fadeBlack'
                                }`}
                            >
                                Years of Experience Expected
                            </span>
                        </p>
                    </div>

                    <IconifyIcon
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            onEdit(courseData)
                        }}
                        className={`edit ${color ?? 'black'} pointer ${
                            hideEditIcon ? 'hidden' : ''
                        }`}
                        icon={'mdi:pencil-circle'}
                    />
                    {/* <span className="ml-10 mr-10 fadeBlack">|</span>
                    <p className="fadeBlack">
                        <span className="fw-bold">
                            {Math.floor(Math.random() * (500 - 150 + 1)) +
                                150 ?? 0}
                        </span>{' '}
                        already enrolled
                    </p> */}
                </div>
            </CardContent>
        </CustomCard>
    )
}

export default CardComponent
