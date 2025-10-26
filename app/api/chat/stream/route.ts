
export const runtime = 'edge';

export async function GET(): Promise<Response> {
  const encoder = new TextEncoder();
  let heartbeat: ReturnType<typeof setInterval> | null = null;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (data: unknown) => {
        const payload = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      };
      send({ type: 'ready' });
      heartbeat = setInterval(() => {
        send({ type: 'tick', timestamp: Date.now() });
      }, 15000);
      controller.enqueue(encoder.encode(': keep-alive\n\n'));
    },
    cancel() {
      if (heartbeat) {
        clearInterval(heartbeat);
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
