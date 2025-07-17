import {
    SpeechConfig,
    SpeechSynthesizer,
    ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk'
import { AES, enc } from 'crypto-js'

/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode: string, opacity: number) => {
    let hex = hexCode.replace('#', '')

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    }

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/** Getting URL  **/

export const URL = () => {
    let host = window.location.origin
    let port = window.location.port

    if (host && port != '') {
        let split_url = host.split(port)
        return `${split_url[0]}${process.env.REACT_APP_API_PORT}/api`
    } else {
        return process.env.REACT_APP_ENV === 'uat'
            ? `${host}:${process.env.REACT_APP_API_PORT}/api`
            : `${host}/api`
    }
}

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param currentURL
 */
export const hasActiveChild = (item: any, currentURL: string): boolean => {
    const { children } = item

    if (!children) {
        return false
    }

    for (const child of children) {
        if ((child as any).children) {
            if (hasActiveChild(child, currentURL)) {
                return true
            }
        }
        const childPath = (child as any).path

        // Check if the child has a link and is active
        if (
            child &&
            childPath &&
            currentURL &&
            (childPath === currentURL ||
                (currentURL.includes(childPath) && childPath !== '/'))
        ) {
            return true
        }
    }

    return false
}

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (
    children: any[],
    openGroup: string[],
    currentActiveGroup: string[]
) => {
    children.forEach((child: any) => {
        if (!currentActiveGroup.includes(child.title)) {
            const index = openGroup.indexOf(child.title)
            if (index > -1) openGroup.splice(index, 1)

            // @ts-ignore
            if (child.children)
                // @ts-ignore
                removeChildren(child.children, openGroup, currentActiveGroup)
        }
    })
}

/**
 *
 * @desc getting lat long for user/visitor
 *
 * */

export function getLocation(getLocation: any): any {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude
                const long = position.coords.longitude
                getLocation(lat, long)
            },
            function (error) {
                // console.log(error)
                return null
            }
        )
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

/**
 *
 *
 * @desc Convert date into readable format from 2023-04-19T09:15:11.405Z ->  April, 2019
 *
 * */

export const convertDate = (date: any) => {
    if (!date) return

    const newDate = new Date(date)
    let transformedDate = newDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return transformedDate ?? null
}

/**
 * @desc Logout Action
 * */

export const logout = () => ({
    type: 'LOGOUT',
})

/*** Change date to word format
 * 01/03/2023 -> 01 March 2023
 */

export const changeDateToWordFormat = (date: string) => {
    const parts = date.split('/')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    return `${day} ${months[month - 1]} ${year}`
}

/** Convert JSON into FormData **/

// ** Convert values in formData

export const convertIntoFormValue = (e: any) => {
    const formData = new FormData()

    // Loop through the properties of the JSON object
    for (const key in e) {
        if (e.hasOwnProperty(key)) {
            const value = e[key]
            // Append each property to the FormData object
            formData.append(key, value)
        }
    }

    return formData
}

/** Time Difference **/

export const calculateTimeDifference = (time: string) => {
    const targetDate: any = new Date(time)
    const currentDate: any = new Date()
    const difference = targetDate - currentDate

    const seconds = Math.abs(Math.floor(difference / 1000))
    const minutes = Math.abs(Math.floor(seconds / 60))
    const hours = Math.abs(Math.floor(minutes / 60))
    const days = Math.abs(Math.floor(hours / 24))
    const years = Math.abs(Math.floor(days / 365))

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`
    } else {
        return 'Just now'
    }
}

/** Seconds to Minutes **/

export function secondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

// ** Audio Duration with S3 PresignedURL
export const fetchDuration = (presignedURL: string) => {
    return new Promise((resolve, reject) => {
        const audio = new Audio(presignedURL)

        audio.addEventListener('loadedmetadata', () => {
            const durationInSeconds = Math.round(audio.duration)
            resolve(secondsToMinutes(durationInSeconds))
        })

        audio.addEventListener('error', (error) => {
            reject(error)
        })
    })
}

/** Decrypting response data from api call **/

export const decrypting = (response: any) => {
    try {
        let bytes = AES.decrypt(
            response?.status === 500 ? response?.data : response,
            process.env.REACT_APP_SECRET_KEY
        )
        const decrypted = bytes.toString(enc.Utf8)
        const parsed = JSON.parse(decrypted)
        return response?.status === 500 ? { data: parsed } : parsed
    } catch (err) {
        return response
    }
}

// Encrypt Data

export const encryptData = (data: any) => {
    var ciphertext = AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET_KEY
    ).toString()
    return ciphertext
}

/** Encrypting the body of api request **/

export const encrypting = (body: any) => {
    try {
        if (
            process.env.REACT_APP_ENV == 'development' ||
            process.env.REACT_APP_ENV == 'uat'
        )
            throw Error
        var ciphertext = AES.encrypt(
            JSON.stringify(body),
            process.env.REACT_APP_SECRET_KEY
        ).toString()
        return { payload: ciphertext }
    } catch (error) {
        return body
    }
}

// ** Returns initials from string
export const getInitials = (string: string) =>
    string
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), '')

/* A Function to decrypt any response from api  */

export const responseDebugger = (response: string) => {
    try {
        let bytes = AES.decrypt(response, process.env.REACT_APP_SECRET_KEY)
        const decrypted = bytes.toString(enc.Utf8)
        const parsed = JSON.parse(decrypted)
        return parsed
    } catch (err) {
        return response
    }
}

// Getting Current Time

export function printCurrentTime() {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString() // e.g., "12:34:56 PM"
    return now
}

// Delay function

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
