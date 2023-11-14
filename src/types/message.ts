export type OutMessage = {
  type: 'hello'
  apikey: string
  heartbeat: boolean
  subscribe_data_type: string[]
  //["trade", "quote", "book20"]
  subscribe_filter_asset_id: string[]
  subscribe_filter_period_id: string[]
  subscribe_filter_symbol_id: string[]
}

export const HelloMessage: OutMessage = {
  type: 'hello',
  apikey: '',
  heartbeat: false,
  subscribe_data_type: ['ohlcv'], //'exrate',
  subscribe_filter_asset_id: [],
  subscribe_filter_period_id: ['1MIN'],
  subscribe_filter_symbol_id: ['COINBASE_SPOT_'],
}

export type InMessage = {
  type: 'reconnect' | 'exrate'
}

export type ReconnectMessage = {
  type: 'reconnect'
  within_seconds: number
  before_time: string
}

export type ExrateMessage = {
  type: 'exrate'
  asset_id_base: string
  asset_id_quote: string
  rate_type: 'BASE_ALL_CROSSES_TO_REF' | 'BASE_QUOTE_ISOLATED'
  time: string
  rate: number
}

export const SymbolIdPattern = /^COINBASE_SPOT_(.+)_USD$/

export type OhlcvMessage = {
  type: 'ohlcv'
  symbol_id: string
  sequence: number
  time_period_start: string
  time_period_end: string
  time_open: string
  time_close: string
  price_open: number
  price_high: number
  price_low: number
  price_close: number
  volume_traded: number
  trades_count: number
}

export const getCurrencyCode = (message: OhlcvMessage) => {
  const result = SymbolIdPattern.exec(message.symbol_id)
  if (result && result.length > 1) {
    return result[1]
  }
  return ''
}
