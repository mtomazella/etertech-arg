'use client'

import Sheet from '@/components/sheet'
import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'conectado2'),
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
                            className="dark:invert"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <Sheet showIcon>
                    <strong>
                        Relatório de indexação para o projeto Conectado - 2
                    </strong>
                    <br />
                    <p>
                        Em todos os casos as cobaias depois de pouco tempo
                        adquiriram habilidades tecnológicas como hacking
                        comparáveis às dos melhores indivíduos da Manacorp,
                        mesmo aqueles “coletados” de locais pobres sem
                        conhecimento algum do assunto.
                    </p>
                    <p>
                        Durante os testes também foi comprovado que são capazes
                        de habitar e comandar sistemas com interfaces variadas,
                        utilizando dispositivos simples como câmeras, microfones
                        e telas, além de controlar os mais variados anexos como
                        braços robóticos.
                    </p>
                    <p>
                        O departamento irá enviar todas as informações aos
                        projetos que podem se beneficiar das descobertas,
                        principalmente o projeto Elite, e seguirá os estudos no
                        projeto Artificial com as novas perspectivas.
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
