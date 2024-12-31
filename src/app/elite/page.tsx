'use client'

import Sheet from '@/components/sheet'
import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'elite'),
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
                <Sheet showIcon>
                    <p>Projeto Conectado,</p>
                    <br />
                    <p>
                        Agradecemos a contribuição com as informações
                        descobertas em suas pesquisas, estou escrevendo para
                        informar de desenvolvimentos recentes em nosso projeto.
                    </p>
                    <p>
                        A partir dos dados fornecidos fomos capazes de superar
                        um bloqueio grande na construção do interface de conexão
                        entre os usuários e seus trajes. Além disso fomos
                        capazes de inverter o fluxo de informação, permitindo
                        que a mente do usuário seja controlada até certo ponto.
                    </p>
                    <p>Nada disso seria possível sem a sua ajuda.</p>
                    <br />
                    <p className="text-right">
                        Continuem o ótimo trabalho,
                        <br />
                        Dr. A. L.
                    </p>
                </Sheet>
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
