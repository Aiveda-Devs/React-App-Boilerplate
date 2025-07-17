import * as React from 'react'
// Import necessary MUI components and hooks
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Import necessary libraries and hooks
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'src/services/user.service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'src/shared/utils/Common.Utils'
import { useSnackbar } from 'src/context/SnackbarContext'
import { setUserConfig } from 'src/store/features/config.feature'

// CSS
// import 'src/App.css'
// import 'src/home/home.css'

interface IProps {}

interface FormData {
    email: string
    password: string
}

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

const defaultValues = {
    password: '',
    email: '',
}

const Login = (props: IProps) => {
    const [rememberMe, setRememberMe] = React.useState<boolean>(true)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    // Responsive
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const small = useMediaQuery(theme.breakpoints.down('sm'))

    // Snackbar
    const { showMessage } = useSnackbar()

    // Libraries
    const navigate = useNavigate()

    /* API CALL */
    const [login] = useLoginMutation()

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(userSchema),
    })

    /** Use Effect **/

    React.useEffect(() => {
        dispatch(logout())
    }, [])

    // handle submit

    const onSubmit = async (e: FormData) => {
        setIsLoading(true)
        const { email, password } = e

        if (email && password) {
            await login({ email: email.toLowerCase(), password })
                .unwrap()
                .then((response) => {
                    localStorage.setItem('nm-corp-token', response.token)
                    // Store user config in redux
                    dispatch(setUserConfig(response.config))
                    showMessage('Login successful!')
                    navigate('/')
                })
                .catch((e) => {
                    showMessage(e?.data?.message || 'Login failed!', 'error')
                })
                .finally(() => setIsLoading(false))
        }
    }

    // Left panel of the login page
    const ImagePanel = React.memo(({}) => {
        return !hidden ? (
            <div className="tw-hidden lg:tw-flex lg:tw-w-3/5 tw-items-center tw-justify-center tw-bg-[#f5f5f9] tw-rounded-2xl tw-m-8">
                <img
                    src="/aiveda-logo.png"
                    alt="Login illustration"
                    className="tw-max-h-[75%] tw-object-contain"
                />
            </div>
        ) : null
    })

    const MemoizedImagePanel = React.useMemo(() => <ImagePanel />, [])

    return (
        <div
            className={`tw-flex tw-justify-center tw-h-screen ${
                small ? 'tw-m-5 tw-p-5' : ''
            }`}
        >
            {MemoizedImagePanel}
            <div className="tw-flex tw-w-full lg:tw-w-2/5 tw-items-center tw-justify-center tw-px-6">
                <div className="tw-w-full tw-max-w-md tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-lg">
                    {/* Logo & Title */}
                    <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
                        <img
                            src="/aiveda-logo.png"
                            alt="Aiveda Logo"
                            className="tw-w-10 tw-h-10"
                        />
                        <h1 className="tw-text-2xl tw-font-bold">Aiveda!</h1>
                    </div>

                    {/* Subtitle */}
                    <p className="tw-text-gray-600 tw-text-sm tw-mb-6">
                        Aiveda.io — Delivers AI and cloud solutions that help
                        businesses unlock the power of intelligence and the
                        cloud.
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="tw-space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register('email')}
                                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-p-2.5 tw-text-sm focus:tw-border-[var(--theme)] focus:tw-ring-1 focus:tw-ring-[var(--theme)]"
                            />
                            {errors.email && (
                                <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="tw-text-sm tw-font-medium tw-text-gray-700"
                            >
                                Password
                            </label>
                            <div className="tw-relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    {...register('password')}
                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-p-2.5 tw-text-sm focus:tw-border-[var(--theme)] focus:tw-ring-1 focus:tw-ring-[var(--theme)]"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="tw-absolute tw-inset-y-0 tw-right-3 tw-flex tw-items-center tw-text-sm tw-text-gray-600"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <label className="tw-flex tw-items-center tw-text-sm tw-gap-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    className="tw-rounded tw-border-gray-300 tw-text-theme focus:tw-ring-[var(--theme)]"
                                />
                                Remember me
                            </label>
                            <span
                                onClick={() =>
                                    navigate('/auth/forgot-password')
                                }
                                className="tw-text-sm tw-font-medium tw-text-[var(--theme)] tw-cursor-pointer hover:tw-underline"
                            >
                                Forgot password?
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="tw-w-full bg-theme tw-text-white tw-p-2.5 tw-rounded-md tw-font-semibold tw-text-sm hover:tw-bg-opacity-90 tw-transition"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
