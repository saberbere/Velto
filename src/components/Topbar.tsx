import { Bell, ChevronRight, Command, Search } from 'lucide-react'
import type { ViewId } from '../types'
const labels: Record<ViewId, string> = { chat: 'AI Capture', workbench: 'Quote Workbench', ticket: 'Ticket', blotter: 'Blotter', trading: 'Trading', products: 'Product catalogue' }
export default function Topbar({ active }: { active: ViewId }) {
  return <header className="topbar"><div className="breadcrumbs"><span>Velto</span><ChevronRight size={14}/><strong>{labels[active]}</strong></div><div className="topbar-actions"><div className="global-search"><Search size={15}/><span>Search quotes, clients…</span><kbd><Command size={10}/> K</kbd></div><div className="topbar-separator"/><button className="icon-button notification" title="Notifications"><Bell size={17}/><i/></button><div className="topbar-user">SN</div></div></header>
}
