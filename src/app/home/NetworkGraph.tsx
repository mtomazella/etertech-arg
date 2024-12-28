"use client"

import React, { useEffect, useRef, useReducer, ReactNode } from "react";
import { Group } from "@visx/group";
import { Graph } from "@visx/network";
import { Zoom } from "@visx/zoom";
import { lesMiserables } from "@visx/mock-data";
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  SimulationNodeDatum
} from "d3-force";

import { usePrevious } from "./usePrevious";
import { ProvidedZoom, TransformMatrix } from "@visx/zoom/lib/types";

type ZoomState = {
  initialTransformMatrix: TransformMatrix;
  transformMatrix: TransformMatrix;
  isDragging: boolean;
};

// const nodes = [
//   { id: 1, metadata: { hello: "world" } },
//   { id: 2, metadata: { hello: "world" } },
//   { id: 3, metadata: { hello: "world" } },
//   { id: 4, metadata: { hello: "world" } },
//   { id: 5, metadata: { hello: "world" } },
//   { id: 6, metadata: { hello: "world" } }
// ];
// const links = [
//   { source: 1, target: 2 },
//   { source: 1, target: 3 },
//   { source: 1, target: 4 },
//   { source: 1, target: 5 },
//   { source: 4, target: 6 },
//   { source: 5, target: 6 },
//   { source: 3, target: 6 }
// ];

interface NetworkGraphProps {
  width: number;
  height: number;
}

const NetworkNode = (props: any) => {
  console.log(props);
  return (
    <circle
      r={10}
      fill={props.node.id === "Myriel" ? "#8B0000" : "#9280FF"}
      onClick={() => {
        alert(JSON.stringify(props));
      }}
    />
  );
};

const Content: React.FC<{
  width: number;
  height: number;
  zoom: ProvidedZoom & ZoomState;
}> = ({ width, height, zoom }) => (
  <div>
    <svg
      width={width}
      height={height}
      style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
    >
      <rect width={width} height={height} fill="#000000" />
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
          if (zoom.isDragging) {
            console.log("mouse leave");
            zoom.dragEnd();
          }
        }}
      />
      <Group transform={zoom.toString()}>
        <Graph graph={lesMiserables} nodeComponent={NetworkNode} />
      </Group>
    </svg>
  </div>
);

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  width,
  height
}) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceRef = useRef<any>();
  const previousWidth = usePrevious(width);
  const previousHeight = usePrevious(height);

  useEffect(() => {
    forceRef.current = forceSimulation(
      lesMiserables.nodes as SimulationNodeDatum[]
    )
      .force(
        "link",
        forceLink()
          .id((d: any) => d.id)
          .links(lesMiserables.links)
      )
      .force("charge", forceManyBody().strength(-500))
      .force("center", forceCenter(width / 2, height / 2));

    // This is going to cause _many_ re-renders as data becomes more complex.
    // Be very careful with logic that goes into this component.
    // We could potentially wait until the "end" even is emitted
    // and then update the graph if we don't want to do this.
    // https://github.com/d3/d3-force#simulation_on
    forceRef.current.on("tick", () => {
      (lesMiserables.nodes[0] as any).fx = width / 2;
      (lesMiserables.nodes[0] as any).fy = height / 2;
      forceUpdate();
    });
    // TODO: Update the dependencies once nodes/edges are passed in via props.
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      forceRef.current &&
      (previousWidth !== width || previousHeight !== height)
    ) {
      // TODO: Recenter the diagram when width/height changes.
      // Will most likely have to look into storing the `zoom`
      // in a ref so we can call `zoom.center()`.
    }
  }, [width, height, previousWidth, previousHeight]);

  if (!width || !height || !forceRef.current) return null;

  return (
    <Zoom
      width={width}
      height={height}
      scaleXMin={1 / 2}
      scaleXMax={6}
      scaleYMin={1 / 2}
      scaleYMax={6}
      transformMatrix={{
        scaleX: 1,
        scaleY: 1,
        translateX: width / 2,
        translateY: height / 2,
        skewX: 0,
        skewY: 0
      }}
    >
      {(zoom) => <Content zoom={zoom} width={width} height={height} />}
    </Zoom>
  );
};
