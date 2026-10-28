import { Activity, Archive, ArrowLeftRight, Boxes, ChevronDown, MessageSquareText, PanelLeftClose, Settings2, ShieldCheck, SunMoon, Zap } from 'lucide-react'
import type { ViewId } from '../types'

const nav: { id: ViewId; label: string; icon: typeof MessageSquareText; count?: string }[] = [
  { id: 'chat', label: 'AI Capture', icon: MessageSquareText, count: 'NEW' },
  { id: 'workbench', label: 'Quote Workbench', icon: ArrowLeftRight, count: '3' },
  { id: 'trading', label: 'Trading', icon: ShieldCheck, count: '2' },
  { id: 'ticket', label: 'Ticket', icon: Activity },
  { id: 'blotter', label: 'Blotter', icon: Archive },
  { id: 'products', label: 'Product catalogue', icon: Boxes },
]
interface Props { active: ViewId; onNavigate: (id: ViewId) => void; light: boolean; onToggleTheme: () => void }
export default function Sidebar({ active, onNavigate, light, onToggleTheme }: Props) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Zap size={18} fill="currentColor" /></div><div><div className="brand-name">velto<span>.</span></div><div className="brand-sub">STRUCTURED PRODUCTS</div></div><button className="icon-button sidebar-collapse" title="Collapse sidebar"><PanelLeftClose size={16}/></button></div>
    <button className="workspace-switch"><div className="workspace-avatar">EQ</div><div className="workspace-copy"><strong>Equity Derivatives</strong><span>Paris desk</span></div><ChevronDown size={15} className="muted-icon"/></button>
    <div className="nav-label">WORKSPACE</div>
    <nav>{nav.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => onNavigate(item.id)} className={`nav-item ${active === item.id ? 'active' : ''}`}><Icon size={17}/><span>{item.label}</span>{item.count && <span className={`nav-count ${item.count === 'NEW' ? 'new' : ''}`}>{item.count}</span>}</button> })}</nav>
    <div className="sidebar-bottom"><div className="environment-card"><span className="pulse-dot"/><div><strong>Prototype environment</strong><small>Demo data · No live pricing</small></div></div><button className="nav-item bottom-item" onClick={onToggleTheme}><SunMoon size={17}/><span>{light ? 'Switch to dark mode' : 'Switch to light mode'}</span></button><button className="nav-item bottom-item" onClick={() => onNavigate('products')}><Settings2 size={17}/><span>Settings & configuration</span></button><div className="user-profile"><div className="user-avatar">SN</div><div className="user-copy"><strong>Saber Najar</strong><span>Structuring · Demo user</span></div><button className="icon-button" title="User menu"><ChevronDown size={15}/></button></div></div>
  </aside>
}
