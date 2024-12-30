'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'tutorial'),
        [enigmaNodes]
    )

    useEffect(() => {
        if (enigma) {
            document.title = enigma.title
        }
    }, [enigma])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <div>
                <h3 className="text-4xl font-bold text-left w-full">Pense.</h3>
                <h3 className="text-5xl font-bold text-left w-full">
                    Procure.
                </h3>
                <h3 className="text-6xl font-bold text-left w-full">
                    Pesquise.
                </h3>
            </div>
        </main>
    )
}

export default Tutorial
