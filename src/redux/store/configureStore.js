import {createStore} from 'redux'
import reducer from './../reducer/index'
import {composeWithDevTools} from 'redux-devtools-extension'
const initialState = {
    menuName: ''
}
export default(prevState)=>createStore(reducer,composeWithDevTools())