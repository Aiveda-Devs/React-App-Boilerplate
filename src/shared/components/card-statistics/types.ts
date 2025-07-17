// ** Types
import { ApexOptions } from 'apexcharts'
import { ChipProps } from '@mui/material/Chip'
import { SxProps, Theme } from '@mui/material'

export type CardStatsSquareProps = {
    icon: string
    stats: string
    title: string
    sx?: SxProps<Theme>
    avatarSize?: number
    avatarColor?: any
    iconSize?: number | string
}

export type CardStatsHorizontalProps = {
    icon: string
    stats: string
    title: string
    sx?: SxProps<Theme>
    avatarSize?: number
    avatarColor?: any
    iconSize?: number | string
}

export type CardStatsWithAreaChartProps = {
    stats: string
    title: string
    avatarIcon: string
    sx?: SxProps<Theme>
    avatarSize?: number
    chartColor?: any
    avatarColor?: any
    avatarIconSize?: number | string
    chartSeries: ApexOptions['series']
}

export type CardStatsVerticalProps = {
    stats: string
    title: string
    chipText: string
    subtitle: string
    avatarIcon: string
    sx?: SxProps<Theme>
    avatarSize?: number
    avatarColor?: any
    iconSize?: number | string
    chipColor?: ChipProps['color']
}

export type CardStatsHorizontalWithDetailsProps = {
    icon: string
    stats: string
    title: string
    subtitle: string
    trendDiff: string
    sx?: SxProps<Theme>
    avatarSize?: number
    avatarColor?: any
    iconSize?: number | string
    trend?: 'positive' | 'negative'
}
