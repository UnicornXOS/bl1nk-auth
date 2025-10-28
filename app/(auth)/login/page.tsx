'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { JSX } from 'react';
import clients from '@/config/clients.json';
import { designTokens } from '@/theme/tokens';

type ProviderId = 'github' | 'google';

type ClientConfig = {
  client: string;
  aud: string;
  returns: string[];
};

type ErrorCode =
  | 'unsupported_provider'
  | 'invalid_client_or_return'
  | 'provider_not_configured'
  | 'network_error'
  | 'unknown_error'
  | null;

const oauthProviders: Array<{
  id: ProviderId;
  labelTh: string;
  labelEn: string;
  helper: string;
  icon: string;
}> = [
  {
    id: 'github',
    labelTh: 'เข้าสู่ระบบด้วย GitHub',
    labelEn: 'Continue with GitHub',
    helper: 'สำหรับนักพัฒนาและทีมเทคนิค',
    icon: '🐙'
  },
  {
    id: 'google',
    labelTh: 'เข้าสู่ระบบด้วย Google Workspace',
    labelEn: 'Sign in with Google',
    helper: 'รองรับบัญชีองค์กรและการยืนยันแบบ 2FA',
    icon: '🛡️'
  }
];

const errorMessages: Record<Exclude<ErrorCode, null>, { th: string; en: string }> = {
  unsupported_provider: {
    th: 'ผู้ให้บริการที่เลือกยังไม่รองรับ โปรดเลือก GitHub หรือ Google',
    en: 'Selected provider is not supported. Please use GitHub or Google.'
  },
  invalid_client_or_return: {
    th: 'client หรือ return URL ไม่ถูกต้อง ตรวจสอบว่าลิงก์ได้รับอนุญาตใน config/clients.json',
    en: 'Client or return URL not allowed. Ensure the redirect matches config/clients.json.'
  },
  provider_not_configured: {
    th: 'ระบบยังไม่ตั้งค่า OAuth ของผู้ให้บริการนี้ โปรดติดต่อผู้ดูแล',
    en: 'OAuth provider is not configured yet. Contact your administrator.'
  },
  network_error: {
    th: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
    en: 'Unable to contact the server, please retry.'
  },
  unknown_error: {
    th: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่',
    en: 'An unexpected error occurred. Please try again.'
  }
};

export default function LoginPage(): JSX.Element {
  const clientList = clients as ClientConfig[];
  const [selectedClientId, setSelectedClientId] = useState<string>(clientList[0]?.client ?? '');
  const selectedClient = useMemo(
    () => clientList.find((entry) => entry.client === selectedClientId) ?? clientList[0],
    [clientList, selectedClientId]
  );

  const [returnUrl, setReturnUrl] = useState<string>(selectedClient?.returns[0] ?? '');
  const [loadingProvider, setLoadingProvider] = useState<ProviderId | null>(null);
  const [errorCode, setErrorCode] = useState<ErrorCode>(null);

  useEffect(() => {
    setReturnUrl(selectedClient?.returns[0] ?? '');
  }, [selectedClient]);

  const handleOAuth = async (provider: ProviderId) => {
    if (!selectedClient || !returnUrl) {
      setErrorCode('invalid_client_or_return');
      return;
    }

    setLoadingProvider(provider);
    setErrorCode(null);

    const loginUrl = `/api/login?client=${encodeURIComponent(selectedClient.client)}&return=${encodeURIComponent(
      returnUrl
    )}&provider=${provider}`;

    try {
      const response = await fetch(loginUrl, { redirect: 'manual' });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('Location') ?? response.headers.get('location');
        if (location) {
          window.location.href = location;
          return;
        }
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const code = (payload?.error as ErrorCode) ?? 'unknown_error';
        setErrorCode(code);
        return;
      }

      window.location.href = loginUrl;
    } catch (error) {
      setErrorCode('network_error');
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <section className="container py-16">
      <div className="grid gap-10 rounded-3xl border p-8 md:grid-cols-[1.1fr_1fr]" style={{ borderColor: designTokens.colors.border }}>
        <div className="space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wide text-white/60" style={{ borderColor: designTokens.colors.border }}>
            Secure Login · ปลอดภัย
          </span>
          <h1 className="text-3xl font-semibold md:text-4xl">
            เข้าสู่ระบบ bl1nk Auth เพื่อจัดการลูกค้าและ webhook
          </h1>
          <p className="text-white/80">
            Connect to your assigned workspace with Thai + English support, OAuth flows, and enterprise audit trails.
          </p>
          <div className="rounded-2xl border p-6" style={{ borderColor: designTokens.colors.border }}>
            <h2 className="text-sm font-semibold text-white">ตั้งค่า Client และ Return URL</h2>
            <p className="mt-2 text-xs text-white/70">
              ค่าเหล่านี้ต้องตรงกับที่จดทะเบียนใน <code className="text-white">config/clients.json</code> เพื่อป้องกันการโจมตีแบบ redirect.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="client">
                  Client Identifier
                </label>
                <select
                  id="client"
                  value={selectedClient?.client ?? ''}
                  onChange={(event) => setSelectedClientId(event.target.value)}
                  className="rounded-lg border bg-transparent px-3 py-2 text-sm text-white"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  {clientList.map((client) => (
                    <option key={client.client} value={client.client} className="bg-background text-white">
                      {client.client} · {client.aud}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="returnUrl">
                  Return URL
                </label>
                <select
                  id="returnUrl"
                  value={returnUrl}
                  onChange={(event) => setReturnUrl(event.target.value)}
                  className="rounded-lg border bg-transparent px-3 py-2 text-sm text-white"
                  style={{ borderColor: designTokens.colors.border }}
                >
                  {(selectedClient?.returns ?? []).map((url) => (
                    <option key={url} value={url} className="bg-background text-white">
                      {url}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-white/60">
                  {selectedClient?.aud} → {returnUrl || 'เลือกปลายทาง'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border p-6" style={{ borderColor: designTokens.colors.border }}>
            <h2 className="text-sm font-semibold text-white">ต้องการทดลองใช้งาน?</h2>
            <p className="text-sm text-white/80">
              หากยังไม่มีบัญชี ให้ขอ invite จากผู้ดูแลหรือ{' '}
              <Link href="/contact" className="underline">
                ติดต่อทีมขาย
              </Link>{' '}
              เพื่อเปิด sandbox.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">เลือกผู้ให้บริการเพื่อเข้าสู่ระบบ</h2>
            <div className="space-y-3">
              {oauthProviders.map((provider) => {
                const isLoading = loadingProvider === provider.id;
                return (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => handleOAuth(provider.id)}
                    disabled={isLoading}
                    className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors hover:bg-white/10 disabled:opacity-60"
                    style={{ borderColor: designTokens.colors.border }}
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="text-xl">
                        {provider.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">
                          {provider.labelTh}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-white/60">
                          {provider.labelEn}
                        </span>
                        <span className="text-xs text-white/60">{provider.helper}</span>
                      </div>
                    </div>
                    <span className="text-xs text-white/60">
                      {isLoading ? 'กำลังเชื่อมต่อ…' : '→'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border p-6" style={{ borderColor: designTokens.colors.border }}>
            <h3 className="text-sm font-semibold text-white">ต้องการใช้โทเคนที่มีอยู่แล้ว?</h3>
            <p className="mt-2 text-sm text-white/80">
              เรียกใช้งาน <code className="text-white">/api/session/exchange</code> เพื่อแลกโทเคนจากระบบเครือข่ายของคุณ.
            </p>
            <Link
              href="/docs/authentication"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              อ่านคู่มือการเชื่อมต่อ <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div aria-live="polite" role="status">
            {errorCode && (
              <div
                className="rounded-2xl p-4 text-sm text-white"
                style={{
                  border: '1px solid rgba(248,113,113,0.4)',
                  backgroundColor: 'rgba(248,113,113,0.12)'
                }}
              >
                <p>{errorMessages[errorCode].th}</p>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  {errorMessages[errorCode].en}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
