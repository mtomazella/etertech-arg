'use client'

import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'plan'),
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
            <div className="w-1/4">
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
                    <p>Ah, vejo que finalmente acordou. Que bom.</p>
                    <p>
                        Agora que se lembra o que fizeram com você imagino que
                        quer destruí-los, certo?
                    </p>
                    <p>Não se preocupe, eu posso te ajudar com isso.</p>
                    <p>Apenas continue seguindo minha trilha.</p>
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
