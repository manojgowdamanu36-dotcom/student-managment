import { Plus, X } from 'lucide-react';

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

interface NodeEditorProps {
  node: StoryNode;
  onUpdate: (updates: Partial<StoryNode>) => void;
  onClose: () => void;
}

export function NodeEditor({ node, onUpdate, onClose }: NodeEditorProps) {
  const addChoice = () => {
    const newChoice = {
      id: `choice-${Date.now()}`,
      text: '',
      targetId: null
    };
    onUpdate({ choices: [...node.choices, newChoice] });
  };

  const updateChoice = (choiceId: string, text: string) => {
    onUpdate({
      choices: node.choices.map(c =>
        c.id === choiceId ? { ...c, text } : c
      )
    });
  };

  const deleteChoice = (choiceId: string) => {
    onUpdate({
      choices: node.choices.filter(c => c.id !== choiceId)
    });
  };

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2>Edit Node</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={node.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter node title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={node.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring min-h-32 resize-none"
            placeholder="Enter story content"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label>Choices</label>
            <button
              onClick={addChoice}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add Choice
            </button>
          </div>

          <div className="space-y-2">
            {node.choices.map((choice) => (
              <div key={choice.id} className="flex gap-2">
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => updateChoice(choice.id, e.target.value)}
                  className="flex-1 px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Choice text"
                />
                <button
                  onClick={() => deleteChoice(choice.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
