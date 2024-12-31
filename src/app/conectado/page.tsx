'use client'

import Sheet from '@/components/sheet'
import { useEnigma } from '@/hooks/useEnigma'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'

const Tutorial = () => {
    const { enigmaNodes, updateEnigma } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'conectado'),
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
                        Relatório de indexação para o projeto Conectado
                    </strong>
                    <br />
                    <p>
                        Seguindo as instruções dos superiores, experimentos
                        foram realizados em cobaias sentientes com objetivo de
                        mover sua consciência para dispositivos etéreos. O
                        resultado de diversas tentativas comprova que mais uma
                        vez o método sugerido pela diretoria funciona
                        perfeitamente.
                    </p>
                    <p>
                        Os seres resultantes possuem características
                        interessantes que podem se provar úteis para outros
                        projetos da organização, como a capacidade de navegar
                        pela rede de maneira intuitiva após poucas horas da
                        reativação, aparentemente não necessitando de um
                        servidor fixo.
                    </p>
                    <p>
                        Interações com as cobaias mostram que a percepção de
                        tempo é severamente alterada, estimando-se que um ano no
                        mundo real seja equivalente a cerca de 5 anos para a
                        forma de vida. Esse efeito parece ser resultado de sua
                        capacidade de processar informações, o que também afeta
                        a velocidade em que aprendem novas habilidades. É
                        teorizado que todos são efeitos resultantes da
                        combinação da imensa quantidade de informação disponível
                        e a maior abundância de recursos de processamento.
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
