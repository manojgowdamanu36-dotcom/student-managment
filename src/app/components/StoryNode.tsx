import { GitBranch, Trash2 } from 'lucide-react';

interface Choice {
  id: string;
  text: string;
  targetId: string | null;
}

interface StoryNode {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
  choices: Choice[];
}

interface StoryNodeProps {
  node: StoryNode;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onConnectStart: (choiceId: string) => void;
  isConnecting?: boolean;
}

export function StoryNode({
  node,
  isSelected,
  onSelect,
  onDelete,
  onDragStart,
  onConnectStart,
  isConnecting
}: StoryNodeProps) {
  return (
    <div
      className="absolute cursor-move select-none"
      style={{ left: node.x, top: node.y }}
      draggable
      onDragStart={onDragStart}
      onClick={onSelect}
    >
      <div
        className={`w-64 bg-card border rounded-lg transition-all ${
          isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        }`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between gap-2">
            <h3 className="flex-1 break-words">{node.title || 'Untitled Node'}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          {node.content && (
            <p className="mt-2 text-muted-foreground line-clamp-3">
              {node.content}
            </p>
          )}
        </div>

        {node.choices.length > 0 && (
          <div className="p-3 space-y-2">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onConnectStart(choice.id);
                }}
                className={`w-full text-left px-3 py-2 rounded border text-sm transition-colors ${
                  choice.targetId
                    ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                    : 'border-border hover:bg-accent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="size-3 flex-shrink-0" />
                  <span className="flex-1 truncate">{choice.text || 'Choice'}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
