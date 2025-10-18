import type { JSX } from 'react';

interface FileBoardProps {
  files: string[];
}

export default function FileBoard({ files }: FileBoardProps): JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-3">
      {files.map((file) => (
        <div key={file} className="tile glow-blue p-4 text-sm text-white/80">
          {file}
        </div>
      ))}
    </div>
  );
}
