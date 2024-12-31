import React from 'react'
import { WaterDrop } from '@mui/icons-material'

const Sheet = ({
    children,
    showIcon,
}: {
    children: any
    showIcon?: boolean
}) => {
    return (
        <div
            className="flex flex-col w-full bg-white text-black p-16 text-4xl"
            style={{
                fontFamily: 'Lavishly Yours, serif',
                fontWeight: 400,
                fontStyle: 'normal',
            }}
        >
            {showIcon && (
                <div className="flex items-center justify-end -mt-8">
                    <WaterDrop fontSize="large" />
                </div>
            )}
            {children}
        </div>
    )
}

export default Sheet
