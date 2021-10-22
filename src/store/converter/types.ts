import { INCREMENT_COUNTER, DECREMENT_COUNTER, GET_CURRENCY_LIST } from './actionTypes'

interface IncrementCounterAction {
  type: typeof INCREMENT_COUNTER
}
interface DecrementCounterAction {
  type: typeof DECREMENT_COUNTER
}
export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction

export interface SystemState {
  count: {
    value: number
  }
}

export interface GetCurrencyTypes {
  data: {}
}
