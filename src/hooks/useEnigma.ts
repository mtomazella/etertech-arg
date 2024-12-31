import { useCallback, useEffect, useState } from 'react'
import { EnigmaNode } from '../types'

const enigmaNodesInitial: EnigmaNode[] = [
    { // 0
        id: 'initial',
        url: '/',
        title: 'Conectado.',
        type: 'reward',
        status: 'completed',
        lockedBy: [],
        icon: 'eye',
    },
    { // 1
        id: 'tutorial',
        url: '/substitua-aqui',
        title: 'A senha é "incio".',
        type: 'enigma',
        status: 'unlocked',
        lockedBy: ['initial'],
        tooltip: 'Começo.',
        // inicio
    },
    { // 1
        id: 'tutorial-reward',
        url: '/tutorial',
        title: 'Conhecimento.',
        type: 'reward',
        status: 'locked',
        lockedBy: ['tutorial'],
    },
    { // 2
        id: 'what-is-ethertech',
        title: 'Magia.',
        url: '/tecnologia',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['tutorial'],
        // etertech
    },
    { // 3
        id: 'nyctography',
        title: 'Lewis Carroll.',
        url: '/noite',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['what-is-ethertech'],
        // abducao
    },
    { // 3
        id: 'conectado',
        title: 'Conectado.',
        url: '/conectado',
        type: 'reward',
        status: 'locked',
        lockedBy: ['what-is-ethertech'],
    },
    { // 4
        id: 'morse-binary',
        title: 'Nem tudo é o que parece.',
        url: '/distracao',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['nyctography'],
        // supressao
    },
    { // 4
        id: 'god',
        title: 'Oniciencia.',
        url: '/deus',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['nyctography'],
        // experimento
    },
    { // 5
        id: 'cli',
        title: 'Peça ajuda.',
        url: '/navegue',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['morse-binary', 'god'],
        // objetivo
    },
    { // 5
        id: 'conectado2',
        title: 'Capacidades.',
        url: '/capacidades',
        type: 'reward',
        status: 'locked',
        lockedBy: ['morse-binary', 'god'],
    },
    { // 5.1
        id: 'memory',
        title: 'Memoria.',
        url: '/memoria',
        type: 'reward',
        status: 'locked',
        lockedBy: ['conectado2'],
    },
    { // 6
        id: 'roll20',
        title: 'Olhe.',
        url: '/20',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['cli'],
        // ascensao
    },
    { // 6
        id: 'plan',
        title: 'Plano.',
        url: '/vulnerabilidade',
        type: 'reward',
        status: 'locked',
        lockedBy: ['cli'],
    },
    { // 6
        id: 'blank',
        title: 'Dentro.',
        url: '/codigo',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['cli'],
        // destruicao
    },
    { // 7
        id: 'melody',
        title: 'Helmholtz.',
        url: '/melodia',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['blank', 'roll20'],
        // cabeca
    },
    { // 8
        id: 'elite',
        title: 'Elite.',
        url: '/elite',
        type: 'reward',
        status: 'locked',
        lockedBy: ['blank', 'roll20'],
    },
    { // 8
        id: 'email',
        title: 'Envie.',
        url: '/envie',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['melody'],
        // salvacao
    },
    { // 9
        id: 'facility',
        title: 'Chance.',
        url: '/chance',
        type: 'reward',
        status: 'locked',
        lockedBy: ['email'],
    },
    { // 9
        id: 'ismas',
        title: 'Ismas.',
        url: '/ismas',
        type: 'reward',
        status: 'locked',
        lockedBy: ['email'],
    },
]

export const useEnigma = () => {
    const [enigmaNodes, setEnigmaNodes] = useState<EnigmaNode[]>([])

    const getSaved = (): EnigmaNode[] => {
        let saved = localStorage.getItem('enigmaNodes')

        if (!saved) saved = '[]'

        let parsed
        try {
            parsed = JSON.parse(saved)
        } catch (error) {
            console.error('Dados corrompidos.', { saved, error })
            parsed = []
        }

        const nodes = enigmaNodesInitial.map(e => {
            const savedNode = parsed.find((n: EnigmaNode) => n.id === e.id)
            return savedNode ? { ...e, ...savedNode } : e
        })

        return nodes
    }

    const getEnigmaNodes: () => EnigmaNode[] = useCallback(() => {
        let nodes = getSaved().map(e => ({
            ...e,
            rank: e.lockedBy.length == 0 ? 0 : undefined,
        }))

        let complete = false
        while (!complete) {
            if (nodes.filter(e => e.rank === undefined).length === 0) {
                complete = true
                break
            }
            for (const node of nodes) {
                if (node.rank !== undefined) continue
                const lockedByNodes = nodes.filter(e =>
                    node.lockedBy.includes(e.id)
                )
                if (lockedByNodes.filter(e => e.rank === undefined).length > 0)
                    continue
                node.rank =
                    Math.min(...lockedByNodes.map(e => e.rank as number)) + 1
            }
        }

        for (const node of nodes) {
            const unlocksNodes = nodes.filter(e => e.lockedBy.includes(node.id))
            node.unlocks = unlocksNodes.map(e => e.id)
        }

        return nodes
    }, [enigmaNodesInitial])

    const getUnlocked = (nodes: EnigmaNode[]) => {
        let complete = false
        while (!complete) {
            complete = true
            for (const node of nodes) {
                if (node.status !== 'completed') continue
                for (const id of node.unlocks ?? []) {
                    const unlockedNode = nodes.find(e => e.id === id)
                    if (unlockedNode?.status === 'locked') {
                        unlockedNode.status = 'unlocked'
                        complete = false
                    }
                }
            }
        }
        return nodes
    }

    const saveEnigmaNodes = (nodes: EnigmaNode[]) => {
        localStorage.setItem(
            'enigmaNodes',
            JSON.stringify(
                nodes.filter(e => e.status === 'completed').map(e => {
                    const {
                        rank,
                        icon,
                        url,
                        lockedBy,
                        title,
                        unlocks,
                        type,
                        ...toSave
                    } = e
                    return toSave
                })
            )
        )
    }

    const syncEnigmaNodes = useCallback(() => {
        let nodes = getEnigmaNodes()
        nodes = getUnlocked(nodes)
        setEnigmaNodes(nodes)
        saveEnigmaNodes(nodes)
    }, [getEnigmaNodes])

    const updateEnigma = useCallback(
        (node: Partial<EnigmaNode>) => {
            if (!node.id) return
            let nodes = getEnigmaNodes()
            nodes = nodes.map(e => (e.id === node.id ? { ...e, ...node } : e))
            setEnigmaNodes(nodes)
            saveEnigmaNodes(nodes)
        },
        [getEnigmaNodes, saveEnigmaNodes, setEnigmaNodes]
    )

    useEffect(() => {
        syncEnigmaNodes()
    }, [])

    return {
        enigmaNodes,
        syncEnigmaNodes,
        saveEnigmaNodes,
        updateEnigma,
    }
}
