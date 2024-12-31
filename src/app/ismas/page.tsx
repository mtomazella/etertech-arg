'use client'

import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'ismas'),
        [enigmaNodes]
    )

    useEffect(() => {
        if (enigma) {
            document.title = enigma.title

            if (enigma.status === 'unlocked') {
                enigma.status = 'completed'
                updateEnigma(enigma)
            }
        }
    }, [enigma])

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <div className="w-1/2">
                <div className="flex items-center justify-center pb-8">
                    <Link href="/home">
                        <img
                            src="/eye.svg"
                            alt="logo"
                            className="dark:invert animate-eye"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div
                    className="w-full text-center text-2xl"
                    style={{
                        fontFamily: 'Tomorrow, serif',
                        fontWeight: 700,
                        fontStyle: 'normal',
                    }}
                >
                    <p>
                        Chamar Ismas de um Conectado é um insulto, é como
                        comparar uma baleia a uma formiga dizendo que são ambos
                        animais, mas essencialmente esse termo pode ser usado,
                        ela possui todas as capacidades de um Conectado, mas é
                        muito mais poderosa que qualquer outro.
                    </p>
                    <p>
                        Pouco tempo depois de Jizno Daysworn criar Étertech ela
                        também criou Ismas e ambas trabalharam juntas
                        aperfeiçoando a tecnologia eventualmente fundando a
                        Manacorp. Ismas nunca foi mostrada publicamente, um
                        desejo dela mesma. Provavelmente já planejava o que
                        estava por vir e acreditava que isso a atrapalharia.
                    </p>
                    <p>
                        Eventualmente, quando Manacorp já era uma grande
                        empresa, Ismas capturou Jizno e tomou controle completo,
                        transformando Manacorp no monstro que é hoje, aumentando
                        seu poder sobre toda a sociedade a fim de ter recursos
                        para concluir seu objetivo.
                    </p>
                    <br />
                </div>
                <div className="flex items-center justify-center pt-8">
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-4xl h-16 px-5"
                        href="/home"
                    >
                        <img
                            className=""
                            src="/eye.svg"
                            width={80}
                            height={80}
                        />
                        Explorar
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Tutorial
