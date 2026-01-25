import type { JSX } from 'react';

interface FileBoardProps {
  files: string[];
}

const rotations = ['Updated 3m ago', 'Updated 12m ago', 'New sync', 'Queued for sync', 'Watching'];

export default function FileBoard({ files }: FileBoardProps): JSX.Element {
  return (
    <div className="surface-panel">
      <h2 className="surface-panel__title">Workspace documents</h2>
      <p className="surface-panel__muted">
        Link notebooks, tasks, and runbooks to keep your automation crew aligned. Files update live after
        each deploy.
      </p>
      <div className="surface-panel__grid">
        {files.map((file, index) => (
          <div key={file} className="metric-chip">
            <span className="metric-chip__label">File</span>
            <span className="metric-chip__value">{file}</span>
            <span className="panel-subcopy">{rotations[index % rotations.length]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
