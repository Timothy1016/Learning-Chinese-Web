'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="system-state" id="main-content">
    <span className="system-state-mark">龙</span>
    <p className="eyebrow">RECOVERY MODE · 恢复</p>
    <h1>Your learning progress is still safe</h1>
    <p>The current screen could not finish loading. Retry it first; if the problem continues, reopen the app. Device-local progress is not deleted by this screen.</p>
    <div><button onClick={reset}>Try this screen again</button><button className="secondary" onClick={() => window.location.reload()}>Reload the app</button></div>
  </main>;
}
