import type { ReactNode } from 'react'
interface Props { label: string; value: string; note: string; icon: ReactNode; tone?: string }
export default function StatCard({ label, value, note, icon, tone = 'blue' }: Props) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}>{icon}</span></div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div> }
