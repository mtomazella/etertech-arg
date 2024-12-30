'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'what-is-ethertech'),
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
                <h3 className="text-5xl font-bold text-left w-full">
                    Magia e Tecnologia
                </h3>
                <br />
                <p>
                    Mana é uma propriedade do campo físico chamado Éter e é
                    utilizada como fonte de energia para muitos tipos de magia,
                    como aquelas utilizadas por magos e na criação de grande
                    parte dos itens mágicos.{' '}
                </p>
                <br />
                <p>
                    O Éter se estende por todo o universo, mas só é possível
                    utilizar sua energia quando a concentração de mana no local
                    controlado é suficiente. Dessa maneira é de extrema
                    importância para a magia a existência de um método para
                    manter a concentração de mana.
                </p>
                <br />
                <p>
                    Essa tecnologia é revolucionária. É realmente um feito
                    incrível, utilizar esse poder de forma de forma tão
                    eficiente, uma aplicação tão coesa com o restante das
                    disciplinas, se conectando diretamente com a engenharia.
                </p>
                <br />
                <h3 className="text-xl font-bold text-left w-full">
                    Só resta definir o nome...
                </h3>
            </div>
        </main>
    )
}

export default Tutorial
