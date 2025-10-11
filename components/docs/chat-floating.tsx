'use client';

import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import type { FormEvent } from 'react';
import Button from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

}

let lineId = 0;

function nextId(): number {
  lineId += 1;
  return lineId;
}

export default function ChatFloating(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    let active = true;
    const ev = new EventSource('/api/chat/stream');
    ev.onmessage = (event) => {
      if (!active) {
        return;
      }
      try {
        const data = JSON.parse(event.data) as { type?: string; [key: string]: unknown };
        if (data.type === 'ready') {

        }
      } catch (error) {
        console.error('[chat-floating] invalid event payload', error);
      }
    };
    ev.onerror = () => {
      ev.close();
      if (active) {

          }
        }, 1000);
      }
    };
    return () => {
      active = false;
      ev.close();
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = String(formData.get('q') ?? '').trim();
    if (!message) {
      return;
    }

    if (formRef.current) {
      formRef.current.reset();
    }
    try {
      const response = await fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!response.ok) {
        throw new Error(`request failed: ${response.status}`);
      }
      const payload = (await response.json()) as { reply?: string };

    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 50 }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" aria-label="Open assistant">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </PopoverTrigger>

          <div style={{ display: 'flex', flexDirection: 'column', height: '480px', width: '360px' }}>
            <header style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', fontSize: '14px', fontWeight: 600 }}>
              Assistant • Docs
            </header>
            <div
              style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'grid',
                gap: '8px',
                fontSize: '14px',
                color: '#1F2937'
              }}
            >

              ))}
            </div>
            <form ref={formRef} onSubmit={onSubmit} style={{ borderTop: '1px solid #E2E8F0', padding: '12px 16px' }}>
              <input
                name="q"
                placeholder="ถามคำถาม…"
                autoComplete="off"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { ChatFloating };
