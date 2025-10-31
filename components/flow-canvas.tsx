import type { JSX } from 'react';

export interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: 'input' | 'output' | 'default';
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export default function FlowCanvas({ nodes, edges }: FlowCanvasProps): JSX.Element {
  return (
    <div className="w-full h-full relative bg-gray-50">
      <svg className="w-full h-full" viewBox="0 0 500 400">
        {/* Render edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          const sourceX = sourceNode.x + 80; // Approximate node width
          const sourceY = sourceNode.y + 25; // Approximate node height
          const targetX = targetNode.x;
          const targetY = targetNode.y + 25;

          return (
            <g key={edge.id}>
              <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                stroke="#6366f1"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              {edge.label && (
                <text
                  x={(sourceX + targetX) / 2}
                  y={(sourceY + targetY) / 2 - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6366f1"
            />
          </marker>
        </defs>
      </svg>

      {/* Render nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute px-4 py-2 rounded-lg border-2 text-sm font-medium cursor-pointer transition-colors ${
            node.type === 'input'
              ? 'bg-green-100 border-green-300 text-green-800'
              : node.type === 'output'
              ? 'bg-red-100 border-red-300 text-red-800'
              : 'bg-blue-100 border-blue-300 text-blue-800'
          }`}
          style={{
            left: node.x,
            top: node.y,
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}