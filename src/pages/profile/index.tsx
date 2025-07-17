// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

// ** Form Validation
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Demo Components
import CustomAvatar from 'src/shared/components/avatar'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import IconifyIcon from 'src/shared/components/Icon'

// Custom Colors
import * as C from 'src/shared/styles/Color'

// CSS
import 'src/App.css'

const CustomBox = styled(Box)({
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
})

const Image = styled('img')({
    borderRadius: '50%',
    border: '1px solid white',
    cursor: 'pointer',
    height: 30,
})

type FormData = yup.InferType<typeof schema>

// ** Form Validation Schema
const schema = yup.object({
    newPassword: yup
        .string()
        .required('New password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            'Must be 8+ characters with uppercase, lowercase, number & special character'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords do not match')
        .required('Confirm password is required'),
})

const UserProfile = () => {
    // States

    const [updatePassword, setUpdatePassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    // Handle Form

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    // Form Submit Handler
    const onSubmit = async (data: FormData) => {
        console.log(data)
    }

    const renderComponent = () => {
        if (true) {
            return (
                <div>
                    <p className="fw-bold f-18">User Details</p>
                    <Card elevation={0} className="br-10 mt-10 mb-10">
                        <CardContent>
                            <div className="flex align-center justify-space-between">
                                <div className="flex align-center">
                                    <Image
                                        src={'/user-image.png'}
                                        alt="profile-picture"
                                    />
                                    <p className="flex flex-col ml-10">
                                        <span className="fw-bold">
                                            My Profile
                                        </span>
                                    </p>
                                </div>
                                <p className="flex align-center tw-gap-2">
                                    <button
                                        hidden={true}
                                        onClick={() => {
                                            // setEdit(true)
                                            // setUpdatePassword(false)
                                        }}
                                        className="bg-theme white pt-5 pb-5 pr-15 pl-15 br-6"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            // setEdit(false)
                                            setUpdatePassword(true)
                                        }}
                                        className="bg-theme white pt-5 pb-5 pr-15 pl-15 br-6"
                                    >
                                        Change Password
                                    </button>
                                </p>
                            </div>

                            {updatePassword ? (
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid
                                            container
                                            spacing={2}
                                            rowGap={3}
                                            className="mt-15"
                                        >
                                            <Grid item xs={12} lg={6}>
                                                <p className="f-14 mb-3">
                                                    New Password
                                                </p>
                                                <CustomInput
                                                    placeholder="Enter new password"
                                                    type="input"
                                                    {...register('newPassword')}
                                                    className="br-8"
                                                />
                                                {errors.newPassword && (
                                                    <p className="tw-text-sm tw-text-red-600 tw-mt-1">
                                                        {
                                                            errors.newPassword
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </Grid>

                                            <Grid item xs={12} lg={6}>
                                                <p className="f-14 mb-3">
                                                    Confirm Password
                                                </p>
                                                <CustomInput
                                                    placeholder="Enter password again"
                                                    type="input"
                                                    {...register(
                                                        'confirmPassword'
                                                    )}
                                                    className="br-8"
                                                />
                                                {errors.confirmPassword && (
                                                    <p className="tw-text-sm tw-text-red-600 tw-mt-1">
                                                        {
                                                            errors
                                                                .confirmPassword
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </Grid>
                                        </Grid>

                                        <div className="mt-30">
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="bg-theme white pt-5 pb-5 pr-15 pl-15 br-6 mr-10"
                                            >
                                                {loading
                                                    ? 'Updating...'
                                                    : 'Update Password'}
                                            </button>

                                            <button
                                                type="submit"
                                                className="pt-5 offBlack pb-5 pr-15 pl-15 br-6 ml-10"
                                                style={{
                                                    border: `1px solid ${C.FadeBlack}`,
                                                }}
                                                onClick={() => {
                                                    setUpdatePassword(false)
                                                    reset()
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <Fragment></Fragment>
                            )}

                            {/* <Grid
                                container
                                spacing={2}
                                rowGap={3}
                                className="mt-15"
                            >
                                {profileDetails.userDetails.map((d, i) => {
                                    if (
                                        d.key.toLowerCase() == 'profile' ||
                                        d.key.toLowerCase() == 'background'
                                    )
                                        return
                                    return (
                                        <Grid key={i} item xs={12} lg={6}>
                                            <div className="flex align-center">
                                                <CustomAvatar
                                                    skin="filled"
                                                    variant="rounded"
                                                    className="bg-white2 br-20"
                                                >
                                                    <IconifyIcon
                                                        icon={d.icon}
                                                        className="theme f-17"
                                                    />
                                                </CustomAvatar>

                                                <p className="flex flex-col ml-10">
                                                    <span className="offBlack f-11">
                                                        {d.key}
                                                    </span>
                                                    <span className="">
                                                        {d.value}
                                                    </span>
                                                </p>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid> */}
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <CustomBox>
                    <CircularProgress className="theme" sx={{ mb: 4 }} />
                    <Typography>
                        Please wait while we fetch your information..
                    </Typography>
                </CustomBox>
            )
        }
    }

    return renderComponent()
}

export default UserProfile

const CustomInput = styled('input')({
    border: `1px solid ${C.GrayShade3}`,
    borderLeft: `5px solid ${C.theme}`,
    padding: 8,
    width: '70%',
    color: C.Offblack,
    ':focus': {
        outlineWidth: 0,
    },
    /* Chrome, Safari, Edge, Opera */
    '::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },

    /* Firefox */
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
})
