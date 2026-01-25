'use client';

import { useEffect, useState } from 'react';
import type { FormEvent, JSX } from 'react';

type ChatLine = {
  role: 'you' | 'assistant' | 'error';
  text: string;
};

export function ChatFloating(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([]);

  useEffect(() => {
    setLines([
      {
        role: 'assistant',
        text: 'สวัสดีค่ะ! ถามฉันเกี่ยวกับระบบเอกสารหรือการตั้งค่า deployment ได้เลยนะคะ 💡'
      }
    ]);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get('q') ?? '').trim();
    if (!message) {
      return;
    }
    form.reset();
    setLines((current: any) => [...current, { role: 'you', text: message }]);

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTEXT_BASE
        ? `${process.env.NEXT_PUBLIC_CONTEXT_BASE}/chat`
        : '/api/chat-proxy';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'web',
          provider: 'openrouter',
          messages: [{ role: 'user', content: message }]
        })
      });
      const payload = (await response.json()) as { answer?: string };
      setLines((current: any) => [
        ...current,
        { role: 'assistant', text: payload.answer ?? '(no answer)' }
      ]);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'unknown error';
      setLines((current: any) => [...current, { role: 'error', text: `เกิดข้อผิดพลาด: ${text}` }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        type="button"
        onClick={() => setOpen((value: any) => !value)}
        className="w-10 h-10 rounded-full shadow-lg bg-primary text-primary-foreground"
        aria-expanded={open}
        aria-label="Toggle chat assistant"
      >
        💬
      </button>
      {open && (
        <div className="mt-2 w-[360px] h-[480px] rounded-lg border bg-background shadow-lg overflow-hidden">
          <div className="flex h-full flex-col">
            <header className="p-3 border-b text-sm font-semibold">Assistant</header>
            <div className="flex-1 p-3 overflow-auto text-sm space-y-2">
              {lines.map((line: { role: any; text: any; }, index: any) => (
                <div key={index} className="leading-relaxed">
                  <span className="font-medium capitalize">{line.role}:</span>{' '}
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-3 border-t">
              <input
                name="q"
                placeholder="ถามคำถาม…"
                className="w-full bg-transparent outline-none text-sm"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatFloating;
