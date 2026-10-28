export type ViewId = 'chat' | 'workbench' | 'ticket' | 'blotter' | 'trading' | 'products'
export type QuoteStatus = 'Open' | 'Pricing' | 'Priced' | 'Awaiting trading' | 'Approved' | 'Shared' | 'Accepted' | 'Booked'
export interface Quote {
  id: string
  product: string
  underlying: string
  tenor: string
  notional: number
  coupon: number | null
  ki: number
  ko: number
  currency: string
  client: string
  status: QuoteStatus
  updated: string
  fairValue?: number
  reoffer?: number
  source: 'DEMO DATA' | 'CREATED IN SESSION'
}
export interface Candidate extends Omit<Quote, 'id' | 'status' | 'updated' | 'source'> {
  candidateId: string
  confidence: 'High' | 'Medium' | 'Low'
  findings: string[]
  selected: boolean
  valid: boolean
}
