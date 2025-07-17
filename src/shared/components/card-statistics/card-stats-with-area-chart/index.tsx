// // ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// // ** Type Imports
import { ApexOptions } from 'apexcharts'
import { CardStatsWithAreaChartProps } from 'src/shared/components/card-statistics/types'

// // ** Custom Component Imports
import Icon from 'src/shared/components/Icon'
import CustomAvatar from 'src/shared/components/avatar'
import ReactApexcharts from 'src/shared/components/react-apexcharts'
import * as C from 'src/shared/styles/Color'

const CardStatsWithAreaChart = (props: CardStatsWithAreaChartProps) => {
    // ** Props
    const {
        sx,
        stats,
        title,
        avatarIcon,
        chartSeries,
        avatarSize = 42,
        avatarIconSize = 26,
        chartColor = 'primary',
        avatarColor = 'primary',
    } = props
    // ** Hook
    const theme = useTheme()

    const options: ApexOptions = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        stroke: {
            width: 2.5,
            curve: 'smooth',
        },
        grid: {
            show: false,
            padding: {
                top: 2,
                bottom: 17,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityTo: 0,
                opacityFrom: 1,
                shadeIntensity: 1,
                stops: [0, 100],
                colorStops: [
                    [
                        {
                            offset: 0,
                            opacity: 0.4,
                            color: C.Primary,
                        },
                        {
                            offset: 100,
                            opacity: 0.1,
                            color: theme.palette.background.paper,
                        },
                    ],
                ],
            },
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 1,
                color: C.Primary,
            },
        },
        xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: { show: false },
    }

    return (
        <Card sx={{ ...sx }}>
            <CardContent
                sx={{
                    display: 'flex',
                    pb: '0 !important',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <CustomAvatar
                    skin="light"
                    color={avatarColor}
                    sx={{
                        mb: '0.625rem',
                        width: avatarSize,
                        height: avatarSize,
                    }}
                >
                    <Icon icon={avatarIcon} fontSize={avatarIconSize} />
                </CustomAvatar>
                <Typography variant="h6">{stats}</Typography>
                <Typography variant="body2">{title}</Typography>
            </CardContent>
            <ReactApexcharts
                type="area"
                height={106}
                options={options}
                series={chartSeries}
            />
        </Card>
    )
}

export default CardStatsWithAreaChart
