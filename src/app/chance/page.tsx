'use client'

import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'facility'),
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
                        Para parar tudo isso temos que destruir Ismas, não
                        existe outro jeito. Mas não vai ser fácil. Por sorte eu
                        tenho informações que vão tornar isso pelo menos
                        possível.
                    </p>
                    <p>
                        Seu núcleo está no centro da sede da Manacorp, mas
                        existem outros dois módulos em outras partes da
                        instalação usados para suportar seu poder.
                    </p>
                    <p>
                        Se tentarem atacar o núcleo diretamente não vão ter
                        chance alguma, mas se destruírem os módulos ela não terá
                        todos os seus recursos e talvez seja possível ganhar
                        essa batalha.
                    </p>
                    <p>
                        Além disso existe uma sala na sede onde items muito
                        poderosos são guardados, é um cofre. Eu tenho a senha
                        para ele, isso deve ajudar também. A senha é 35168542.
                    </p>
                    <p>
                        Contate o grupo, é nossa única chance.
                    </p>
                    <br />
                </div>
                <div className="flex items-center justify-center pt-8">
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-4xl h-16 px-5"
                        href="/contatar"
                    >
                        <img
                            className=""
                            src="/eye.svg"
                            width={80}
                            height={80}
                        />
                        Contatar
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Tutorial
