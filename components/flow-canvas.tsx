import type { CSSProperties, JSX, ReactNode } from "react";

const NODE_WIDTH = 160;
const NODE_HEIGHT = 56;

export interface FlowNode {
  id: string;
  label: ReactNode;
  x: number;
  y: number;
  type?: "input" | "default";
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: ReactNode;
}

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export default function FlowCanvas({
  nodes,
  edges,
}: FlowCanvasProps): JSX.Element {
  const nodeMap = new Map(nodes.map((node) => [node.id, node] as const));

  return (
    <div className="flow-canvas">
      <svg className="flow-canvas__edges" aria-hidden="true">
        {edges.map((edge) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);

          if (!source || !target) {
            return null;
          }

          const startX = source.x + NODE_WIDTH;
          const startY = source.y + NODE_HEIGHT / 2;
          const endX = target.x;
          const endY = target.y + NODE_HEIGHT / 2;
          const controlOffset = Math.max(80, Math.abs(endX - startX) / 2);
          const path = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
          const labelX = (startX + endX) / 2;
          const labelY = (startY + endY) / 2 - 8;

          return (
            <g key={edge.id}>
              <path d={path} className="flow-edge" />
              {edge.label ? (
                <text x={labelX} y={labelY} className="flow-edge__label">
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {nodes.map((node) => {
        const style: CSSProperties = {
          transform: `translate(${node.x}px, ${node.y}px)`,
        };

        return (
          <div
            key={node.id}
            className={`flow-node${node.type === "input" ? " flow-node--input" : ""}`}
            style={style}
          >
            {node.label}
          </div>
        );
      })}
    </div>
  );
}
