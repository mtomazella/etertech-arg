'use client'

import { useEnigma } from '@/hooks/useEnigma'
import { EnigmaNode, PageStatus, PageType } from '@/types'
import { Graph } from '@visx/network'
import { DefaultNode as DefaultNodeType } from '@visx/network/lib/types'
import React, { useMemo } from 'react'

const Circle = ({ url, status, type }: Node & {}) => {
    let style: {
        fill?: string
    } = {}

    if (type === 'enigma') {
        if (status === 'completed') {
            style = { fill: 'green' }
        }
        if (status === 'unlocked') {
            style = { fill: 'blue' }
        }
        if (status === 'locked') {
            style = { fill: 'red' }
        }
    }
    if (type === 'reward') {
        if (status === 'completed' || status === 'unlocked') {
            style = { fill: 'yellow' }
        }
        if (status === 'locked') {
            style = { fill: 'red' }
        }
    }

    return (
        <a href={url}>
            <circle r={20} fill={style.fill}></circle>
        </a>
    )
}

type Node = DefaultNodeType & EnigmaNode

// const nodes: Node[] = [
//     { x: 400, y: 100, url: '/home', type: 'enigma', status: 'completed' },
//     { x: 200, y: 400, url: '/home', type: 'enigma', status: 'unlocked' },
//     { x: 600, y: 400, url: '/home', type: 'enigma', status: 'locked' },
// ]

export default () => {
    const { enigmaNodes } = useEnigma()

    const graph = useMemo(() => {
        console.log(enigmaNodes)

        const nodes = enigmaNodes.map(node => {
            const nodesInRank = enigmaNodes.filter(e => e.rank === node.rank)

            return {
                y: (node.rank ?? 0 + 1) * 300 + Math.random() * 100,
                x: (nodesInRank.length + 1) * 100,
                ...node,
            }
        })

        const links = enigmaNodes
            .map(node => {
                return node.unlocks?.map(unlock => {
                    return {
                        source: node,
                        target: enigmaNodes.find(e => e.id === unlock),
                    }
                })
            })
            .flat()
            .filter(Boolean)

        console.log(nodes, links)

        return {
            nodes,
            links,
        }
    }, [enigmaNodes])

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg width={800} height={1000}>
                <Graph
                    graph={graph}
                    nodeComponent={({ node }: { node: Node }) => {
                        const data = node as Node
                        return <Circle {...data} />
                    }}
                />
            </svg>
        </div>
    )
}
