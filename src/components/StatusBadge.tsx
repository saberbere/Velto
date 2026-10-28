import type { QuoteStatus } from '../types'
export default function StatusBadge({ status }: { status: QuoteStatus | 'Ready' | 'Needs review' | 'Created' | 'Pending' }) {
  const cls = status.toLowerCase().replace(/\s+/g, '-')
  return <span className={`status-badge status-${cls}`}><i/>{status}</span>
}
