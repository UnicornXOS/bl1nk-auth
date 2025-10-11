'use client';

import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import type { FormEvent } from 'react';
import Button from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type ChatRole = 'system' | 'user' | 'assistant';

interface ChatLine {
  id: number;
  text: string;
  role: ChatRole;
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
  const [connectionState, setConnectionState] = useState<'connecting' | 'online' | 'error'>('connecting');
  const readyAnnouncedRef = useRef(false);

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
          setConnectionState('online');
          if (!readyAnnouncedRef.current) {
            readyAnnouncedRef.current = true;
            setLines((prev) => [...prev, { id: nextId(), text: 'assistant online', role: 'system' }]);
          }
        }
        if (data.type === 'tick') {
          setConnectionState('online');
        }
      } catch (error) {
        console.error('[chat-floating] invalid event payload', error);
      }
    };
    ev.onerror = () => {
      ev.close();
      if (active) {
        setConnectionState('error');
        setLines((prev) => [...prev, { id: nextId(), text: 'connection lost, retrying…', role: 'system' }]);
        setTimeout(() => {
          if (active) {
            setLines((prev) => [
              ...prev,
              { id: nextId(), text: 'refresh the page to reconnect.', role: 'system' }
            ]);
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
    setLines((prev) => [...prev, { id: nextId(), text: `you: ${message}`, role: 'user' }]);
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
      setLines((prev) => [
        ...prev,
        { id: nextId(), text: `assistant: ${payload.reply ?? 'no reply'}`, role: 'assistant' }
      ]);
    } catch (error) {
      console.error('[chat-floating] ask error', error);
      setLines((prev) => [
        ...prev,
        { id: nextId(), text: 'assistant: เกิดข้อผิดพลาด ลองอีกครั้ง', role: 'assistant' }
      ]);
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
        <PopoverContent className="chat-popover" side="top" align="end" sideOffset={16}>
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
              {lines.length === 0 && (
                <p style={{ color: '#94A3B8' }}>
                  {connectionState === 'error'
                    ? 'ไม่สามารถเชื่อมต่อได้'
                    : 'กำลังเชื่อมต่อกับ assistant…'}
                </p>
              )}
              {lines.map((line) => (
                <div key={line.id} data-role={line.role}>
                  {line.text}
                </div>
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
