'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'email'),
        [enigmaNodes]
    )

    useEffect(() => {
        if (enigma) {
            document.title = enigma.title
        }
    }, [enigma])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center w-full">
                Apresente-se
            </h1>
            <p className="text-center w-full">
                mtomazella25+ethertech@gmail.com
            </p>
        </main>
    )
}

export default Tutorial
