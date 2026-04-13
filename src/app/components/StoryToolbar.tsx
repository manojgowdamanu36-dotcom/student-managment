import { Plus, FileText, Download, Upload } from 'lucide-react';

interface StoryToolbarProps {
  storyTitle: string;
  onStoryTitleChange: (title: string) => void;
  onAddNode: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function StoryToolbar({
  storyTitle,
  onStoryTitleChange,
  onAddNode,
  onExport,
  onImport
}: StoryToolbarProps) {
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <FileText className="size-5" />
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => onStoryTitleChange(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none max-w-md"
          placeholder="Untitled Story"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onAddNode}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="size-4" />
          Add Node
        </button>

        <button
          onClick={onExport}
          className="px-4 py-2 border border-border rounded hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Download className="size-4" />
          Export
        </button>

        <label className="px-4 py-2 border border-border rounded hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer">
          <Upload className="size-4" />
          Import
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
