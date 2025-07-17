import React, { useCallback, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'

// API Hooks
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
} from 'src/services/user.service'

// Contexts
import { useSnackbar } from 'src/context/SnackbarContext'

// Constants
const defaultValues = {
    password: '',
    confirmPassword: '',
}

const passwordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, // Enforces strong password
            'Password must contain uppercase, lowercase, number, special char, and be at least 8 characters'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
})

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { showMessage } = useSnackbar()

    const [email, setEmail] = useState('')
    const [jwtToken, setToken] = useState(null)
    const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [forgot] = useForgotPasswordMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [resetPassword] = useResetPasswordMutation()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(passwordSchema),
        mode: 'onBlur',
    })

    const handleForgot = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!email) return showMessage('Email is required', 'error')
            try {
                setLoading(true)
                const res = await forgot({
                    email: email.toLowerCase(),
                }).unwrap()
                if (res?.jwtToken) setToken(res.jwtToken)
                setStep('otp')
                showMessage(res.message, 'success')
            } catch (err: any) {
                showMessage(
                    err?.data?.message || 'Something went wrong',
                    'error'
                )
            } finally {
                setLoading(false)
            }
        },
        [email]
    )

    const handleOTPVerify = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const otp = e.currentTarget.otp.value
            if (!otp) return showMessage('OTP is required', 'error')

            try {
                setLoading(true)
                const res = await verifyOtp({ email, otp, jwtToken }).unwrap()
                if (res.success) setStep('reset')
                showMessage(res.message, 'success')
            } catch (err: any) {
                showMessage(err?.data?.message || 'Invalid OTP', 'error')
            } finally {
                setLoading(false)
            }
        },
        [email, jwtToken]
    )

    const handleReset = useCallback(
        async (data: { password: string; confirmPassword: string }) => {
            try {
                setLoading(true)
                const res = await resetPassword({
                    email,
                    password: data.password,
                    jwtToken,
                }).unwrap()
                showMessage(res.message, 'success')
                navigate('/auth/login')
            } catch (err: any) {
                showMessage(err?.data?.message || 'Reset failed', 'error')
            } finally {
                setLoading(false)
            }
        },
        [email, jwtToken]
    )

    // Components
    const EmailStep = useMemo(
        () => (
            <form onSubmit={handleForgot} className="tw-space-y-6">
                <h2 className="tw-text-2xl tw-font-bold">Forgot Password 🔒</h2>
                <p className="tw-text-gray-500">
                    Enter your email and we’ll send you an OTP to reset your
                    password.
                </p>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-p-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[var(--theme)]"
                    placeholder="Enter your email"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="tw-w-full bg-theme tw-text-white tw-font-medium tw-p-2.5 tw-rounded-md hover:tw-bg-opacity-90 tw-transition"
                >
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/auth/login')}
                    className="tw-text-sm tw-text-[var(--theme)] tw-font-medium hover:tw-underline"
                >
                    <Icon
                        icon="tabler:chevron-left"
                        className="tw-inline mr-1"
                    />{' '}
                    Back to Login
                </button>
            </form>
        ),
        [email, loading]
    )

    const OTPStep = useMemo(
        () => (
            <form
                onSubmit={handleOTPVerify}
                name="otp"
                className="tw-space-y-6"
            >
                <h2 className="tw-text-2xl tw-font-bold">Verify OTP 🔐</h2>
                <p className="tw-text-gray-500">
                    Enter the OTP sent to your email.
                </p>
                <input
                    name="otp"
                    type="number"
                    placeholder="Enter OTP"
                    className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-p-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[var(--theme)]"
                />
                <div className="tw-flex tw-justify-between">
                    <button
                        type="button"
                        onClick={() => setStep('email')}
                        className="tw-text-sm tw-text-[var(--theme)] hover:tw-underline"
                    >
                        <Icon
                            icon="tabler:chevron-left"
                            className="tw-inline mr-1"
                        />{' '}
                        Edit Email
                    </button>
                    <button
                        type="button"
                        onClick={() => handleForgot(new Event('resend') as any)}
                        className="tw-text-sm tw-text-[var(--theme)] hover:tw-underline"
                    >
                        Resend OTP
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="tw-w-full bg-theme tw-text-white tw-font-medium tw-p-2.5 tw-rounded-md hover:tw-bg-opacity-90 tw-transition"
                >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
        ),
        [loading]
    )

    const ResetStep = useMemo(
        () => (
            <form onSubmit={handleSubmit(handleReset)} className="tw-space-y-6">
                <h2 className="tw-text-2xl tw-font-bold">Reset Password 🔑</h2>
                <p className="tw-text-gray-500">
                    Enter and confirm your new password.
                </p>

                {/* Password */}
                <div className="tw-relative">
                    <label className="tw-text-sm tw-block tw-mb-1">
                        Password
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                className={`tw-w-full tw-border tw-rounded-md tw-p-2.5 tw-text-sm tw-border-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[var(--theme)]`}
                            />
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="tw-absolute tw-top-9 tw-right-3 tw-text-gray-600"
                    >
                        <Icon
                            icon={
                                showPassword ? 'tabler:eye' : 'tabler:eye-off'
                            }
                        />
                    </button>
                    {errors.password && (
                        <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="tw-relative">
                    <label className="tw-text-sm tw-block tw-mb-1">
                        Confirm Password
                    </label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={`tw-w-full tw-border tw-rounded-md tw-p-2.5 tw-text-sm tw-border-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[var(--theme)]`}
                            />
                        )}
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="tw-absolute tw-top-9 tw-right-3 tw-text-gray-600"
                    >
                        <Icon
                            icon={
                                showConfirmPassword
                                    ? 'tabler:eye'
                                    : 'tabler:eye-off'
                            }
                        />
                    </button>
                    {errors.confirmPassword && (
                        <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="tw-w-full bg-theme tw-text-white tw-font-medium tw-p-2.5 tw-rounded-md hover:tw-bg-opacity-90 tw-transition"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        ),
        [control, errors, showPassword, showConfirmPassword, loading]
    )

    return (
        <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-[#f9faff] tw-p-6">
            <div className="tw-w-full tw-max-w-lg tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-xl">
                {step === 'email' && EmailStep}
                {step === 'otp' && OTPStep}
                {step === 'reset' && ResetStep}
            </div>
        </div>
    )
}

export default React.memo(ForgotPassword)
