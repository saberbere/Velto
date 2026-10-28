import type { Quote } from '../types'
export const demoQuotes: Quote[] = [
  { id: 'Q-10452', product: 'AutocallablePlus', underlying: 'SX5E', tenor: '5Y', notional: 5_000_000, coupon: 8.25, ki: 60, ko: 100, currency: 'EUR', client: 'Northstar AM', status: 'Priced', updated: '09:42:16', fairValue: 97.42, reoffer: 98, source: 'DEMO DATA' },
  { id: 'Q-10453', product: 'AutocallablePlus', underlying: 'SX5E', tenor: '6Y', notional: 2_500_000, coupon: 7.85, ki: 60, ko: 100, currency: 'EUR', client: 'Northstar AM', status: 'Awaiting trading', updated: '09:38:04', fairValue: 96.91, reoffer: 98, source: 'DEMO DATA' },
  { id: 'Q-10454', product: 'AutocallablePlus', underlying: 'SX5E', tenor: '5Y', notional: 3_000_000, coupon: 8.6, ki: 55, ko: 100, currency: 'EUR', client: 'Alpine Private Bank', status: 'Open', updated: '09:31:52', fairValue: undefined, reoffer: 98, source: 'DEMO DATA' },
  { id: 'Q-10449', product: 'AutocallablePlus', underlying: 'SPX', tenor: '5Y', notional: 1_000_000, coupon: 9.1, ki: 60, ko: 100, currency: 'USD', client: '—', status: 'Shared', updated: 'Yesterday', fairValue: 96.8, reoffer: 98, source: 'DEMO DATA' },
  { id: 'Q-10441', product: 'AutocallablePlus', underlying: 'SX5E', tenor: '4Y', notional: 4_000_000, coupon: 7.4, ki: 65, ko: 100, currency: 'EUR', client: 'Meridian Wealth', status: 'Booked', updated: '17 Oct', fairValue: 98.05, reoffer: 99, source: 'DEMO DATA' },
]
