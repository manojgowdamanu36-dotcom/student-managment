import { useRef, useState } from 'react';
import { StoryNode } from './StoryNode';

interface Choice {
  id: string;
  text: string;
  targetId: string | null;
}

interface Node {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
  choices: Choice[];
}

interface StoryCanvasProps {
  nodes: Node[];
  selectedNodeId: string | null;
  onNodeSelect: (id: string) => void;
  onNodeDelete: (id: string) => void;
  onNodeMove: (id: string, x: number, y: number) => void;
  onConnectChoice: (nodeId: string, choiceId: string, targetNodeId: string) => void;
}

export function StoryCanvas({
  nodes,
  selectedNodeId,
  onNodeSelect,
  onNodeDelete,
  onNodeMove,
  onConnectChoice
}: StoryCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connectingChoice, setConnectingChoice] = useState<{ nodeId: string; choiceId: string } | null>(null);

  const handleNodeDragStart = (nodeId: string, e: React.DragEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedNode(nodeId);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    onNodeMove(draggedNode, x, y);
    setDraggedNode(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleConnectStart = (nodeId: string, choiceId: string) => {
    setConnectingChoice({ nodeId, choiceId });
  };

  const handleNodeClick = (targetNodeId: string) => {
    if (connectingChoice) {
      onConnectChoice(connectingChoice.nodeId, connectingChoice.choiceId, targetNodeId);
      setConnectingChoice(null);
    } else {
      onNodeSelect(targetNodeId);
    }
  };

  const renderConnections = () => {
    const lines: JSX.Element[] = [];

    nodes.forEach(node => {
      node.choices.forEach(choice => {
        if (choice.targetId) {
          const targetNode = nodes.find(n => n.id === choice.targetId);
          if (targetNode) {
            const x1 = node.x + 128;
            const y1 = node.y + 100;
            const x2 = targetNode.x + 128;
            const y2 = targetNode.y + 50;

            const midX = (x1 + x2) / 2;

            lines.push(
              <path
                key={`${node.id}-${choice.id}`}
                d={`M ${x1} ${y1} Q ${midX} ${y1}, ${midX} ${(y1 + y2) / 2} T ${x2} ${y2}`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-border"
                markerEnd="url(#arrowhead)"
              />
            );
          }
        }
      });
    });

    return lines;
  };

  return (
    <div
      ref={canvasRef}
      className="flex-1 relative overflow-auto bg-muted/30"
      onDrop={handleCanvasDrop}
      onDragOver={handleCanvasDragOver}
      onClick={() => {
        if (!connectingChoice) {
          onNodeSelect('');
        }
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill="currentColor"
              className="text-border"
            />
          </marker>
        </defs>
        {renderConnections()}
      </svg>

      <div className="relative min-w-[2000px] min-h-[2000px]">
        {nodes.map(node => (
          <StoryNode
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            onSelect={() => handleNodeClick(node.id)}
            onDelete={() => onNodeDelete(node.id)}
            onDragStart={(e) => handleNodeDragStart(node.id, e)}
            onConnectStart={(choiceId) => handleConnectStart(node.id, choiceId)}
            isConnecting={!!connectingChoice}
          />
        ))}
      </div>

      {connectingChoice && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg">
          Click on a node to connect this choice
        </div>
      )}
    </div>
  );
}
