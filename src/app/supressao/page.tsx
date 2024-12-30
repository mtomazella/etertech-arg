'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'morse-binary'),
        [enigmaNodes]
    )

    useEffect(() => {
        document.title = 'Correto'
        
        if (enigma) {
            if (enigma.status === 'unlocked') {
                enigma.status = 'completed'
                updateEnigma(enigma)
            }

            window.location.href = '/home'
        }
    }, [enigma])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <img src="/eye.svg" alt="logo" className="dark:invert" width={100} height={100}/>
        </main>
    )
}

export default Tutorial
