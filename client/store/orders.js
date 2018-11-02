import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_ORDER = 'ADD_TO_ORDER'

//INITAL STATE

const initialState = {
  orders: []
}

//ACTION CREATORS

const getCart = orders => ({type: GET_CART, orders})
const addToOrder = order => ({type: ADD_TO_ORDER, order})

//THUNK CREATORS

export const fillCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart`)
    dispatch(getCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addToOrders = (newOrder) => async dispatch => { 
  try { 
    console.log('new order', newOrder)
    const res = await axios.post('/api/orders/cart', newOrder); 
    console.log('add order res', res); 
    dispatch(addToOrder(res.data))
  } catch (error) { 
    console.error(error); 
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, orders: action.orders}
    case ADD_TO_ORDER: 
      return {...state, orders: [...state.orders, action.order]}
    default:
      return state
  }
}
