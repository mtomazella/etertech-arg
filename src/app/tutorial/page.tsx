'use client'

import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'tutorial-reward'),
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
                            className="dark:invert"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <h3 className="text-5xl font-bold text-left w-full">É isso!</h3>
                <br />
                <p>
                    Esse método vai me deixar acessar qualquer informação que eu
                    quiser. É só eu encontrar a senha e da página, colocar na
                    URL e eu libero o acesso para outras partes da rede.
                </p>
                <p>Se eu continuar com certeza eu vou achar alguma coisa.</p>
                <br />
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
