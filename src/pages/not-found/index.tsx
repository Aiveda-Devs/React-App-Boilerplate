import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-[#f9fafb] tw-p-6">
            <div className="tw-text-center">
                <h1 className="tw-text-[100px] tw-font-extrabold tw-text-[var(--theme)] tw-drop-shadow-md">
                    404
                </h1>
                <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-semibold tw-text-gray-800">
                    Page Not Found
                </h2>
                <p className="tw-mt-4 tw-text-gray-500 tw-text-base">
                    The page you are looking for might have been removed or is
                    temporarily unavailable.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="tw-mt-6 tw-inline-block bg-theme tw-text-white tw-py-2 tw-px-6 tw-rounded-lg tw-font-medium hover:tw-bg-opacity-90 tw-transition"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    )
}

export default NotFound
