import { useCallback, useEffect, useState } from 'react'
import { EnigmaNode } from '../types'

const enigmaNodesInitial: EnigmaNode[] = [
    {
        id: 'initial',
        url: '/',
        title: 'Conectado.',
        type: 'reward',
        status: 'completed',
        lockedBy: [],
        icon: 'eye',
    },
    {
        id: 'tutorial',
        url: '/substitua-aqui',
        title: 'A senha é "incio".',
        type: 'enigma',
        status: 'unlocked',
        lockedBy: ['initial'],
    },
    {
        id: 'what-is-ethertech',
        title: 'Magia.',
        url: '/tecnologia',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['tutorial'],
    },
    {
        id: 'nyctography',
        title: 'Lewis Carroll.',
        url: '/noite',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['what-is-ethertech'],
    },
    {
        id: 'morse-binary',
        title: 'Nem tudo é o que parece.',
        url: '/distracao',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['nyctography'],
    },
    {
        id: 'god',
        title: 'Oniciencia.',
        url: '/deus',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['nyctography'],
    },
    {
        id: 'cli',
        title: 'Peça ajuda.',
        url: '/navegue',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['morse-binary', 'god'],
    },
    {
        id: 'roll20',
        title: 'Olhe.',
        url: '/20',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['cli'],
    },
    {
        id: 'blank',
        title: '.',
        url: '/_',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['cli'],
    },
    {
        id: 'melody',
        title: 'Helmholtz.',
        url: '/melodia',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['blank', 'roll20'],
    },
    {
        id: 'email',
        title: 'Envie.',
        url: '/envie',
        type: 'enigma',
        status: 'locked',
        lockedBy: ['melody'],
    },
]

export const useEnigma = () => {
    const [enigmaNodes, setEnigmaNodes] = useState<EnigmaNode[]>([])

    const getEnigmaNodes: () => EnigmaNode[] = useCallback(() => {
        let nodes = enigmaNodesInitial.map(e => ({ ...e, rank: e.lockedBy.length == 0 ? 0 : undefined }))       

        let complete = false
        while (!complete) {
            if (nodes.filter(e => e.rank === undefined).length === 0) {
                complete = true
                break
            }
            for (const node of nodes) {
                if (node.rank !== undefined) continue
                const lockedByNodes = nodes.filter(e => node.lockedBy.includes(e.id))
                if (lockedByNodes.filter(e => e.rank === undefined).length > 0) continue
                node.rank = Math.min(...lockedByNodes.map(e => e.rank as number)) + 1
            }
        }

        for (const node of nodes) {
            const unlocksNodes = nodes.filter(e => e.lockedBy.includes(node.id))
            node.unlocks = unlocksNodes.map(e => e.id)
        }

        return nodes
    }, [enigmaNodesInitial])

    const updateEnigmaNodes = useCallback(() => {
        setEnigmaNodes(getEnigmaNodes())
    }, [getEnigmaNodes])

    useEffect(() => {
        updateEnigmaNodes()
    }, [])

    return {
        enigmaNodes,
        updateEnigmaNodes,
    }
}
