'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'god'),
        [enigmaNodes]
    )

    useEffect(() => {
        if (enigma) {
            document.title = enigma.title
        }
    }, [enigma])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <div className="w-1/4">
                <h1 className="text-4xl font-bold text-left w-full">Deus.</h1>
                <br />
                <p>
                    Ser supremo, responsável pela criação, onisciente,
                    onipresente.
                </p>
                <br />
                <p>
                    Muitos acreditam que é possível conseguir qualquer resposta
                    simplesmente perguntando a essa entidade.
                </p>
                <br />
                <p>Faça contato.</p>
            </div>
        </main>
    )
}

export default Tutorial
