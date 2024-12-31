'use client'

import React, { useEffect } from 'react'

const Tutorial = () => {
    useEffect(() => {
        document.title = 'Contatar.'
    }, [])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <img src="/eye.svg" alt="logo" className="dark:invert" width={100} height={100}/>
            <p className='text-center text-2xl'>Espere a próxima sessão :)</p>
        </main>
    )
}

export default Tutorial
