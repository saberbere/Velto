import { useState } from 'react'
import { ChevronDown, CircleHelp, Filter, GitCompareArrows, Plus, RotateCcw, Search, Sparkles, X, Zap } from 'lucide-react'
import type { Quote, ViewId } from '../types'
import QuoteTable from './QuoteTable'
import StatusBadge from './StatusBadge'

interface Props {
  quotes: Quote[]; selectedIds: string[]; setSelectedIds: (fn: (ids: string[]) => string[]) => void
  activeQuoteId: string; setActiveQuoteId: (id: string) => void; activeQuote?: Quote
  search: string; setSearch: (value: string) => void; statusFilter: string; setStatusFilter: (value: string) => void
  filteredQuotes: Quote[]; pricing: boolean; runPricing: () => void; updateQuote: (field: keyof Quote, value: string | number) => void
  showAdvanced: boolean; setShowAdvanced: (fn: (v: boolean) => boolean) => void; advancedType: string; setAdvancedType: (value: string) => void
  setActive: (id: ViewId) => void; setRequest: (value: string) => void; setClient: (value: string) => void; setChatStage: (value: 'idle' | 'context' | 'review' | 'created') => void; notify: (message: string) => void
}
export default function WorkbenchView(p: Props) {
  const [targetPrice, setTargetPrice] = useState('98')
  const [solveField, setSolveField] = useState('Monthly coupon')
  function solveQuote() {
    if (!p.activeQuote) return
    const q = p.activeQuote
    const coupon = Number((7.1 + (Number(targetPrice) - 95) * 0.23 + (100 - q.ki) * 0.035).toFixed(2))
    p.updateQuote('coupon', coupon)
    p.updateQuote('fairValue', Number(targetPrice))
    p.notify(`Demo solve complete: ${solveField} = ${coupon.toFixed(2)}%. Illustrative only.`)
  }
  return <section className="page workbench-page">
    <div className="page-heading"><div><div className="eyebrow">PRICING & QUOTE MANAGEMENT</div><h1>Quote Workbench</h1><p className="page-subtitle">Configure, price and compare independent quote versions.</p></div><div className="heading-actions"><button className="button-secondary" onClick={() => p.setActive('chat')}><Sparkles size={15}/> Capture request</button><button className="button-primary" onClick={() => { p.setRequest('SX5E autocallable 5Y KI 60'); p.setClient(''); p.setChatStage('context'); p.setActive('chat') }}><Plus size={15}/> New quote</button></div></div>
    <div className="workbench-grid">
      <div className="workbench-left">
        <div className="panel quote-selector-panel"><div className="panel-header"><div><h2>Multiquote</h2><p>{p.selectedIds.length} quotes in comparison</p></div><button className="icon-button" onClick={() => p.setSelectedIds(() => [])} title="Clear comparison"><RotateCcw size={15}/></button></div>
          <div className="quote-selector-list">{p.quotes.filter(q => p.selectedIds.includes(q.id)).map(q => <div key={q.id} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') p.setActiveQuoteId(q.id) }} onClick={() => p.setActiveQuoteId(q.id)} className={`quote-selector ${p.activeQuoteId === q.id ? 'selected' : ''}`}><div className="selector-radio">{p.activeQuoteId === q.id && <i/>}</div><div className="selector-main"><strong>{q.id} <span>{q.underlying}</span></strong><small>{q.tenor} · KI {q.ki} · {q.client}</small></div><div className="selector-value"><strong>{q.coupon == null ? '—' : `${q.coupon.toFixed(2)}%`}</strong><small>coupon</small></div><button className="selector-remove" title="Remove from multiquote" onClick={e => { e.stopPropagation(); p.setSelectedIds(ids => ids.filter(id => id !== q.id)) }}><X size={13}/></button></div>)}</div>
          <button className="add-comparison" onClick={() => { const q = p.quotes.find(x => !p.selectedIds.includes(x.id)); if (q) { p.setSelectedIds(ids => [...ids, q.id]); p.notify(`${q.id} added to comparison.`) } else p.notify('All available quotes are already in comparison.') }}><Plus size={14}/> Add quote to comparison</button>
        </div>
        <div className="panel quote-parameters-panel"><div className="panel-header"><div><h2>Product parameters</h2><p>{p.activeQuote?.id ?? 'No quote selected'} <span className="divider-dot">·</span> Draft fields</p></div><span className="draft-pill">{p.activeQuote?.source === 'DEMO DATA' ? 'DEMO RECORD' : 'SESSION RECORD'}</span></div>
          {p.activeQuote ? <>
            <div className="form-section-label">PRODUCT DEFINITION</div>
            <div className="parameter-grid">
              <label>Product<select value={p.activeQuote.product} onChange={e => p.updateQuote('product', e.target.value)}><option>AutocallablePlus</option></select></label>
              <label>Underlying<select value={p.activeQuote.underlying} onChange={e => p.updateQuote('underlying', e.target.value)}>{['SX5E','SPX','NDX','UKX','NKY'].map(u => <option key={u}>{u}</option>)}</select></label>
              <label>Tenor<select value={p.activeQuote.tenor} onChange={e => p.updateQuote('tenor', e.target.value)}>{['3Y','4Y','5Y','6Y','7Y'].map(t => <option key={t}>{t}</option>)}</select></label>
              <label>Currency<select value={p.activeQuote.currency} onChange={e => p.updateQuote('currency', e.target.value)}><option>EUR</option><option>USD</option><option>GBP</option></select></label>
              <label>Notional<input value={String(p.activeQuote.notional)} onChange={e => p.updateQuote('notional', Number(e.target.value) || 0)}/></label>
              <label>Client<input value={p.activeQuote.client} onChange={e => p.updateQuote('client', e.target.value)}/></label>
            </div>
            <div className="form-section-label section-spaced">AUTOCALLABLE TERMS</div>
            <div className="parameter-grid three-cols">
              <label>Autocall trigger (%)<input type="number" value={p.activeQuote.ko} onChange={e => p.updateQuote('ko', Number(e.target.value))}/></label>
              <label>Knock-in barrier (%)<input type="number" value={p.activeQuote.ki} onChange={e => p.updateQuote('ki', Number(e.target.value))}/></label>
              <label>Coupon (% p.a.)<input type="number" step="0.05" value={p.activeQuote.coupon ?? ''} placeholder="Solve" onChange={e => p.updateQuote('coupon', e.target.value === '' ? 0 : Number(e.target.value))}/></label>
            </div>
            <div className="form-section-label section-spaced">COMMERCIAL TERMS</div>
            <div className="parameter-grid three-cols">
              <label>Reoffer (%)<input type="number" value={p.activeQuote.reoffer ?? 98} onChange={e => p.updateQuote('reoffer', Number(e.target.value))}/></label>
              <label>Fair value (%)<input value={p.activeQuote.fairValue ?? '—'} readOnly/></label>
              <label>Quote status<div className="field-status"><StatusBadge status={p.activeQuote.status}/></div></label>
            </div>
            <div className="parameter-footer"><span><span className="unsaved-dot"/> Edits are local to this prototype</span><button className="text-button" onClick={() => p.setShowAdvanced(v => !v)}>{p.showAdvanced ? 'Hide advanced' : 'Advanced settings'} <ChevronDown size={13}/></button></div>
            {p.showAdvanced && <div className="advanced-panel"><label>Solving type<select value={p.advancedType} onChange={e => p.setAdvancedType(e.target.value)}><option>Standard</option><option>Bounded</option><option>Robust</option></select></label><p>Advanced solver configuration is a UI placeholder. No production solver is connected.</p></div>}
            <div className="workbench-actions"><label className="solve-target">Solve field<select value={solveField} onChange={e => setSolveField(e.target.value)}><option>Monthly coupon</option><option>Reoffer</option><option>Autocall trigger</option><option>Knock-in barrier</option></select></label><label className="solve-target">Target price<input value={targetPrice} onChange={e => setTargetPrice(e.target.value)}/></label><button className="button-secondary" onClick={solveQuote}><GitCompareArrows size={15}/> Solve</button><button className="button-primary" onClick={p.runPricing} disabled={p.pricing}>{p.pricing ? <><span className="button-spinner"/> Pricing…</> : <><Zap size={15}/> Price quote</>}</button></div>
          </> : <div className="empty-state">Select a quote from the multiquote list or add one from the table.</div>}
        </div>
      </div>
      <div className="workbench-right">
        <div className="panel pricing-result-panel"><div className="panel-header"><div><h2>Pricing result</h2><p>Illustrative output only</p></div><div className="result-status"><span className="pulse-dot"/> {p.pricing ? 'RUNNING' : 'SIMULATED'}</div></div><div className="result-hero"><span>FAIR VALUE</span><div>{p.activeQuote?.fairValue?.toFixed(2) ?? '—'}<small>%</small></div><p>{p.activeQuote?.fairValue ? 'Last demo result' : 'Run demo pricing to populate'}</p></div><div className="result-metrics"><div><span>Coupon</span><strong>{p.activeQuote?.coupon == null ? '—' : `${p.activeQuote.coupon.toFixed(2)}%`}</strong></div><div><span>Reoffer</span><strong>{p.activeQuote?.reoffer ?? '—'}%</strong></div><div><span>Margin to par</span><strong>{p.activeQuote?.fairValue ? `${(100 - p.activeQuote.fairValue).toFixed(2)}%` : '—'}</strong></div></div><div className="pricing-disclaimer"><CircleHelp size={14}/><span>Illustrative calculations only. This prototype is not connected to a pricing engine or market data.</span></div></div>
        <div className="panel comparison-panel"><div className="panel-header"><div><h2>Quick comparison</h2><p>Selected quote snapshots</p></div><GitCompareArrows size={16} className="muted-icon"/></div>{p.quotes.filter(q => p.selectedIds.includes(q.id)).map(q => <button className={`comparison-row ${q.id === p.activeQuoteId ? 'active' : ''}`} key={q.id} onClick={() => p.setActiveQuoteId(q.id)}><div><strong>{q.id}</strong><span>{q.underlying} · {q.tenor} · KI {q.ki}</span></div><div className="comparison-value"><strong>{q.coupon == null ? '—' : `${q.coupon.toFixed(2)}%`}</strong><span>{q.fairValue == null ? 'Not priced' : `FV ${q.fairValue.toFixed(2)}`}</span></div></button>)}{p.selectedIds.length === 0 && <p className="empty-inline">Add quotes to compare their terms.</p>}</div>
      </div>
    </div>
    <div className="panel all-quotes-panel"><div className="panel-header"><div><h2>All quotes</h2><p>Open an existing quote or add it to the comparison.</p></div><div className="table-tools"><div className="table-search"><Search size={14} className="search-icon"/><input value={p.search} onChange={e => p.setSearch(e.target.value)} placeholder="Search quotes…"/></div><select className="filter-select" value={p.statusFilter} onChange={e => p.setStatusFilter(e.target.value)}><option>All statuses</option>{['Open','Pricing','Priced','Awaiting trading','Approved','Shared','Accepted','Booked'].map(s => <option key={s}>{s}</option>)}</select><button className="button-secondary button-small" onClick={() => {p.setSearch('');p.setStatusFilter('All statuses')}}><Filter size={13}/> Reset</button></div></div><QuoteTable quotes={p.filteredQuotes} onOpen={id => {p.setActiveQuoteId(id);p.setSelectedIds(ids => ids.includes(id) ? ids : [...ids, id])}}/></div>
  </section>
}
