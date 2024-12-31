'use client'

import { useEnigma } from '@/hooks/useEnigma'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type CliState = {
    directory: string[]
}

type Display = string[]

type File = {
    name: string
    type: 'file' | 'directory'
    content: string | FileSystem
    password?: string
}
type FileSystem = Record<string, File>
type Environment = {
    fileSystem: File
}

type CommandHandler = (args: {
    params: string[]
    cliState: CliState
    environment: Environment
}) => {
    output: Display
    cliState: CliState
    status?: 'success' | 'error'
}

const getDirectory = (path: string[], environment: Environment) => {
    let currentDir = environment.fileSystem
    for (let i = 0; i < path.length; i++) {
        currentDir = (currentDir.content as FileSystem)[path[i]]
    }
    return currentDir
}

const generateEnvironment = (): Environment => {
    const up = 'gore'
    const right = 'desno'
    const down = 'dolje'
    const left = 'lijevo'
    const directions = [up, right, down, left]

    const maze: FileSystem = {}
    const fillDirection = (fileSystem: FileSystem, path: string[]) => {
        let target: File = { content: fileSystem } as File
        for (const item of path) {
            target = (target.content as FileSystem)[item]
        }

        for (const dir of directions) {
            ;(target.content as FileSystem)[dir] = {
                name: dir,
                type: 'directory',
                content: {},
            }
        }
    }
    const depth = 4
    const fillRecursive = (fileSystem: FileSystem, path: string[]) => {
        if (path.length === depth - 1) {
            fillDirection(maze, path)
            return
        }

        fillDirection(maze, path)
        for (const dir of directions) {
            fillRecursive(fileSystem[dir].content as FileSystem, [...path, dir])
        }
    }
    fillRecursive(maze, [])

    const environment: Environment = {
        fileSystem: {
            name: '/',
            type: 'directory',
            content: {
                'lozinka.txt': {
                    name: 'lozinka.txt',
                    type: 'file',
                    content: 'objetivo',
                    password: '6432',
                },
                ...maze,
            },
        },
    }

    getDirectory([right, down, left, up], environment).content = {
        '>^^>.txt': {
            name: '>^^>.txt',
            type: 'file',
            content: '6',
        },
    }
    getDirectory([right, up, up, right], environment).content = {
        '<<>>.txt': {
            name: '<<>>.txt',
            type: 'file',
            content: '4',
        },
    }
    getDirectory([left, left, right, right], environment).content = {
        '^^vv.txt': {
            name: '^^vv.txt',
            type: 'file',
            content: '3',
        },
    }
    getDirectory([up, up, down, down], environment).content = {
        'fim.txt': {
            name: 'fim.txt',
            type: 'file',
            content: '2',
        },
    }

    return environment
}

const Tutorial = () => {
    const { enigmaNodes } = useEnigma()
    const enigma = useMemo(
        () => enigmaNodes.find(node => node.id === 'cli'),
        [enigmaNodes]
    )
    const [input, setInput] = useState('')
    const [display, setDisplay] = useState<string[]>([])
    const [cliState, setCliState] = useState<CliState>({ directory: [] })
    const displayRef = useRef<any>(null)

    useEffect(() => {
        if (enigma) {
            document.title = enigma.title
        }
    }, [enigma])

    const environment: Environment = generateEnvironment()

    const help: CommandHandler = ({ params, cliState }) => {
        return {
            output: [
                'Comandos disponíveis:',
                '- help, ajuda: Retorna a lista de comandos disponíveis.',
                '- cd: Recebe o nome de um diretório como parâmetro mudando para ele. Exemplo: cd diretorio2',
                'É possível voltar um diretório com o comando cd ..',
                '- ls: Lista os arquivos e diretórios do diretório atual e informa o caminho completo.',
                '- cat: Recebe o nome de um arquivo como parâmetro e exibe seu conteúdo. Exemplo: cat arquivo.txt',
                'Alguns arquivos são protegidos por senha. Use a flag -p ou -password para informar a senha do arquivo.',
                'Exemplo: cat arquivo.txt -p senha',
            ],
            cliState,
        }
    }

    const ls: CommandHandler = ({ params, cliState, environment }) => {
        const currentDir = getDirectory(
            cliState.directory,
            environment as Environment
        )

        if (currentDir?.type === 'directory') {
            return {
                output: [
                    `Caminho: /${cliState.directory.join('/')}`,
                    ...(Object.keys(currentDir.content as FileSystem).length ===
                    0
                        ? ['Diretório vazio.']
                        : Object.keys(currentDir.content as FileSystem)),
                ],
                cliState,
            }
        }

        return {
            output: ['Não é possível listar o conteúdo de um arquivo.'],
            cliState,
        }
    }

    const cd: CommandHandler = ({ params, cliState, environment }) => {
        const currentDir = getDirectory(
            cliState.directory,
            environment as Environment
        )

        if (currentDir?.type !== 'directory') {
            return {
                output: ['Não é possível mudar de diretório em um arquivo.'],
                cliState,
                status: 'error',
            }
        }

        if (params.length === 0) {
            return {
                output: ['Diretório não informado.'],
                cliState,
                status: 'error',
            }
        }

        if (params[0] === '/') {
            return {
                output: ['Diretório raiz.'],
                cliState: {
                    directory: [],
                },
                status: 'success',
            }
        }

        if (params[0] === '..') {
            return {
                output: ['Voltando um diretório.'],
                cliState: {
                    directory: cliState.directory.slice(0, -1),
                },
                status: 'success',
            }
        }

        if (params[0] === '.') {
            return {
                output: ['Permanecendo no diretório atual.'],
                cliState,
                status: 'success',
            }
        }

        const nextDir = (currentDir.content as FileSystem)[params[0]]
        if (nextDir?.type === 'directory') {
            return {
                output: [`Entrando no diretório ${params[0]}`],
                cliState: {
                    directory: [...cliState.directory, params[0]],
                },
                status: 'success',
            }
        }

        if (nextDir?.type === 'file') {
            return {
                output: [`O caminho ${params[0]} é um arquivo.`],
                cliState,
                status: 'error',
            }
        }

        return {
            output: [`Diretório ${params[0]} não encontrado.`],
            cliState,
            status: 'error',
        }
    }

    const cdMultiple: CommandHandler = ({ params, cliState, environment }) => {
        let newCliState = cliState
        const output = []

        const allDirs = []
        if ((params[0] ?? '').startsWith('/')) {
            allDirs.push('/')
            params[0] = params[0].slice(1)
        }
        if ((params[0] ?? '').trim() !== '') {
            allDirs.push(...params[0].split('/'))
        }

        for (const param of allDirs) {
            const result = cd({
                params: [param],
                cliState: newCliState,
                environment,
            })
            newCliState = result.cliState
            output.push(...result.output)
            if (result.status === 'error') {
                break
            }
        }
        return {
            output,
            cliState: newCliState,
        }
    }

    const cat: CommandHandler = ({
        params: rawParams,
        cliState,
        environment,
    }) => {
        const currentDir = getDirectory(
            cliState.directory,
            environment as Environment
        )

        const params: Record<string, string | null> = {
            directory: null,
            password: null,
        }
        let nextFlag = null
        for (const param of rawParams) {
            const value = param.trim()

            if (!value) {
                continue
            }

            if (value.startsWith('-')) {
                nextFlag = value.slice(1)
                continue
            }

            if (nextFlag) {
                if (nextFlag === 'p' || nextFlag === 'password') {
                    params.password = value
                    nextFlag = null
                    continue
                }

                return {
                    output: [`Flag ${nextFlag} não reconhecida.`],
                    cliState,
                    status: 'error',
                }
            }

            params.directory = value
        }

        if (!params.directory) {
            return {
                output: ['Arquivo não informado.'],
                cliState,
                status: 'error',
            }
        }

        const file = (currentDir.content as FileSystem)[params.directory]
        if (!file) {
            return {
                output: [`Arquivo ${params.directory} não encontrado.`],
                cliState,
                status: 'error',
            }
        }

        if (file.password && !params.password) {
            return {
                output: [
                    'Esse arquivo está protegido por senha.',
                    'Use a flag -p ou -password para informar a senha do arquivo.',
                    'Exemplo: cat arquivo.txt -p senha',
                ],
                cliState,
                status: 'error',
            }
        }

        debugger
        if (file.password && file.password !== params.password) {
            return {
                output: ['Senha incorreta.'],
                cliState,
                status: 'error',
            }
        }

        if (!file.content) {
            return {
                output: ['Arquivo vazio.'],
                cliState,
                status: 'error',
            }
        }

        if (file.type !== 'file') {
            return {
                output: ['Não é possível exibir o conteúdo de um diretório.'],
                cliState,
                status: 'error',
            }
        }

        return {
            output: [file.content as string],
            cliState,
            status: 'success',
        }
    }

    const handleCli = useCallback(
        (input: string) => {
            let newDisplay = [...display]
            newDisplay.push(`> ${input}`)

            const [command, ...args] = input
                .trim()
                .split(' ')
                .map(e => e.toString().trim().toLowerCase())

            const commands: Record<string, CommandHandler> = {
                help,
                ajuda: help,
                cd: cdMultiple,
                ls,
                cat,
            }

            if (commands[command]) {
                const result = commands[command]({
                    params: args,
                    cliState,
                    environment,
                })
                newDisplay = [...newDisplay, ...result.output]
                setCliState(result.cliState)
            } else {
                newDisplay.push(`Comando não encontrado: ${command}`)
            }

            newDisplay.push('')

            setDisplay(newDisplay)
            setInput('')
        },
        [display, cliState, setDisplay, setCliState]
    )

    useEffect(() => {
        displayRef.current?.lastElementChild?.scrollIntoView()
    }, [display])

    const keyPress = useCallback(
        (e: any) => {
            if (e.key === 'Enter') {
                handleCli(input)
                setInput('')
            }
        },
        [handleCli, input, setInput]
    )

    return (
        <main className="flex w-full h-full flex-col items-center justify-center">
            <div
                className="flex flex-col w-1/2 h-full pb-16 px-16 my-8 bg-white rounded-2xl shadow-lg"
                style={{ maxHeight: 'calc(100% - 8rem)' }}
            >
                <div className="flex flex-row justify-right items-center self-end h-16 bg-transparent rounded-b-lg">
                    <img
                        src="/arrow.png"
                        className="w-12 h-8 ml-4 rotate-180"
                    />
                    <img src="/arrow.png" className="w-8 h-8 ml-4 -rotate-90" />
                    <img src="/arrow.png" className="w-10 h-8 ml-4" />
                    <img src="/arrow.png" className="w-8 h-8 ml-4 rotate-90" />
                </div>
                <div
                    className="flex flex-col w-full h-full rounded-lg bg-black"
                    style={{ maxHeight: 'calc(100% - 4rem)' }}
                >
                    <div
                        className="w-full h-full bg-black rounded-t-lg py-4 px-8 overflow-y-auto"
                        style={{ maxHeight: 'calc(100% - 4rem)' }}
                        ref={displayRef}
                    >
                        {display.map((line, index) => (
                            <p
                                key={index}
                                className="text-yellow-400 text-2xl font-mono"
                                style={{ minHeight: '1.5rem' }}
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-row items-center justify-left w-full h-16 border-t border-white rounded-b-lg">
                        <h1 className="text-4xl font-bold text-left px-8">
                            {'>'}
                        </h1>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={keyPress}
                            type="text"
                            className="w-full h-full bg-black text-white text-2xl font-mono outline-none rounded-b-lg"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Tutorial
