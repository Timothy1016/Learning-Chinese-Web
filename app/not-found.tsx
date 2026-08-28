import Link from 'next/link';

export default function NotFound() {
  return <main className="system-state" id="main-content">
    <span className="system-state-mark">路</span>
    <p className="eyebrow">404 · 走错路了</p>
    <h1>This learning path does not exist</h1>
    <p>Return to your Chinese world and continue from the lesson saved on this device.</p>
    <Link href="/">Return to Lóng</Link>
  </main>;
}
