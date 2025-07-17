import { CircularProgress, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface Props {
    styles?: any
    message?: string
}

const CustomBox = styled(Box)({
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
})

const Loader = (props: Props) => {
    return (
        <CustomBox style={{ ...props.styles }}>
            <CircularProgress className="theme" sx={{ mb: 4 }} />
            <Typography>
                {props.message ?? "We're Preparing Things.."}
            </Typography>
        </CustomBox>
    )
}

export default Loader
