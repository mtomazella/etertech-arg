'use client'

import { useEnigma } from '@/hooks/useEnigma'
import { EnigmaNode, PageStatus, PageType } from '@/types'
import { localPoint } from '@visx/event'
import { Group } from '@visx/group'
import { Graph } from '@visx/network'
import {
    DefaultNode as DefaultNodeType,
    Link as LinkType,
} from '@visx/network/lib/types'
import { ParentSize } from '@visx/responsive'
import { Zoom } from '@visx/zoom'
import { clear } from 'console'
import React, { useCallback, useEffect, useMemo } from 'react'

const Circle = ({
    url,
    status,
    type,
    setHoveringNode,
    id,
}: Node & { setHoveringNode: (id: string | null) => null }) => {
    let style: {
        fill?: string
        border?: string
    } = {}

    const backgroundColor = '#0a0a0a'

    if (type === 'enigma') {
        if (status === 'completed') {
            style = { fill: '#9a51ed' }
        }
        if (status === 'unlocked') {
            style = { border: '#9a51ed' }
        }
        if (status === 'locked') {
            style = { fill: 'red' }
        }
    }
    if (type === 'reward') {
        if (status === 'completed') {
            style = { fill: '#ede45f' }
        }
        if (status === 'unlocked') {
            style = { border: '#ede45f' }
        }
        if (status === 'locked') {
            style = { fill: 'red' }
        }
    }

    return (
        <a
            href={url}
            onMouseEnter={() => setHoveringNode(id)}
            onMouseLeave={() => setHoveringNode(null)}
        >
            <circle
                r={20}
                fill={style.fill ?? backgroundColor}
                stroke={style.border}
                strokeWidth={4}
            ></circle>
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
    const [nodes, setNodes] = React.useState<Node[]>([])
    const [hoveringNode, setHoveringNode] = React.useState<string | null>(null)
    const [jitterSpeed, setJitterSpeed] = React.useState(10)

    const generateNodes = useCallback(() => {
        const nodes = enigmaNodes
            .filter(node => node.status !== 'locked')
            .map(node => {
                const randomRadius = (node.rank ?? 0) * 150
                const randomAngle = Math.random() * Math.PI * 2
                const x = Math.cos(randomAngle) * randomRadius
                const y = Math.sin(randomAngle) * randomRadius

                return {
                    // y: (node.rank ?? 0 + 1) * 300,
                    // x: (nodesInRank.length) * 100,
                    x,
                    y,
                    ...node,
                }
            })

        setNodes(nodes)
    }, [enigmaNodes])

    const moveNodes = useCallback(() => {
        if (hoveringNode) {
            setJitterSpeed(1000)
            } else {
            setJitterSpeed(10)
        }
        const newNodes = nodes.map(node => {
            if (Math.random() > 0.3 || node.id === hoveringNode) {
                return node
            }
            return {
                ...node,
                x: node.x + Math.random() * 10 - 5,
                y: node.y + Math.random() * 10 - 5,
            }
        })
        setNodes(newNodes)
    }, [nodes, setNodes, hoveringNode])

    useEffect(() => {
        if (nodes.length === 0) generateNodes()
    }, [enigmaNodes, generateNodes, nodes])

    useEffect(() => {
        const interval = setInterval(moveNodes, jitterSpeed)
        return () => {
            clearInterval(interval)
        }

    }, [enigmaNodes, moveNodes, jitterSpeed, hoveringNode])

    const graph = useMemo(() => {
        const links = nodes
            .map(node => {
                return node.unlocks?.map(unlock => {
                    return {
                        source: node,
                        target: nodes.find(e => e.id === unlock),
                    }
                })
            })
            .flat()
            .filter(Boolean)

        for (const node of nodes) {
            links.push({
                source: nodes.find(e => e.rank === 0) as Node,
                target: node,
            })
        }

        return {
            nodes,
            links,
        }
    }, [nodes])

    return (
        <div className="w-full h-full flex items-center justify-center">
            <ParentSize>
                {({ width, height }) => (
                    <Zoom<SVGSVGElement>
                        width={width}
                        height={height}
                        scaleXMin={1 / 2}
                        scaleXMax={4}
                        scaleYMin={1 / 2}
                        scaleYMax={4}
                        initialTransformMatrix={{
                            scaleX: 1,
                            scaleY: 1,
                            translateX: 900,
                            translateY: 450,
                            skewX: 0,
                            skewY: 0,
                        }}
                    >
                        {zoom => (
                            <svg
                                width={width}
                                height={height}
                                style={{
                                    cursor: zoom.isDragging
                                        ? 'grabbing'
                                        : 'grab',
                                    touchAction: 'none',
                                }}
                                ref={zoom.containerRef}
                            >
                                <rect
                                    width={width}
                                    height={height}
                                    rx={14}
                                    fill="transparent"
                                    onTouchStart={zoom.dragStart}
                                    onTouchMove={zoom.dragMove}
                                    onTouchEnd={zoom.dragEnd}
                                    onMouseDown={zoom.dragStart}
                                    onMouseMove={zoom.dragMove}
                                    onMouseUp={zoom.dragEnd}
                                    onMouseLeave={() => {
                                        if (zoom.isDragging) zoom.dragEnd()
                                    }}
                                    onDoubleClick={event => {
                                        const point = localPoint(event) || {
                                            x: 0,
                                            y: 0,
                                        }
                                        zoom.scale({
                                            scaleX: 1.1,
                                            scaleY: 1.1,
                                            point,
                                        })
                                    }}
                                />
                                <Group
                                    width={width}
                                    height={height}
                                    transform={zoom.toString()}
                                >
                                    <Graph
                                        graph={graph}
                                        nodeComponent={({
                                            node,
                                        }: {
                                            node: Node
                                        }) => {
                                            const data = node as Node
                                            return (
                                                <Circle
                                                    {...data}
                                                    setHoveringNode={
                                                        setHoveringNode as any
                                                    }
                                                />
                                            )
                                        }}
                                    />
                                </Group>
                            </svg>
                        )}
                    </Zoom>
                )}
            </ParentSize>
        </div>
    )
}
