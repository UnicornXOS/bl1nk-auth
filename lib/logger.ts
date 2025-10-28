import { ENV } from '@/lib/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogMetadata = Record<string, unknown> | undefined;

type LogEntry = {
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
};

const SENSITIVE_KEYS = ['secret', 'token', 'key', 'password'];

function scrubMetadata(metadata: LogMetadata): Record<string, unknown> | undefined {
  if (!metadata) return undefined;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.some((needle) => lowerKey.includes(needle))) {
      sanitized[key] = typeof value === 'undefined' ? value : '[redacted]';
      continue;
    }
    sanitized[key] = value;
  }
  return sanitized;
}

const logtailToken = ENV.LOGTAIL_TOKEN;
const logtailUrl = logtailToken ? `https://in.logtail.com/v1/${logtailToken}` : null;

async function emitRemote(entry: LogEntry): Promise<void> {
  if (!logtailUrl) return;
  try {
    await fetch(logtailUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
  } catch (err) {
    const error = err as Error;
    console.warn('[logger] Failed to forward log to Logtail', error.message);
  }
}

function emit(level: LogLevel, message: string, metadata?: LogMetadata): void {
  const entry: LogEntry = {
    level,
    message,
    metadata: scrubMetadata(metadata),
    timestamp: new Date().toISOString(),
  };

  const consoleFn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  consoleFn(`${entry.timestamp} [${entry.level.toUpperCase()}] ${entry.message}`, entry.metadata);
  void emitRemote(entry);
}

export const logger = {
  info(message: string, metadata?: LogMetadata) {
    emit('info', message, metadata);
  },
  warn(message: string, metadata?: LogMetadata) {
    emit('warn', message, metadata);
  },
  error(message: string, metadata?: LogMetadata) {
    emit('error', message, metadata);
  },
  debug(message: string, metadata?: LogMetadata) {
    emit('debug', message, metadata);
  },
};
