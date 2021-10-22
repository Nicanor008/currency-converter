import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk" 
import currencyReducer from './converter/reducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  currencyList: currencyReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as any), 
)

export default store
