import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_ORDER = 'ADD_TO_ORDER'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

//INITAL STATE

const initialState = {
  orders: []
}

//ACTION CREATORS

const getCart = orders => ({type: GET_CART, orders})
const addToOrder = order => ({type: ADD_TO_ORDER, order})
const updateOrderStatus = status => ({
  type: UPDATE_ORDER_STATUS,
  status
})
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})

//THUNK CREATORS

export const fillCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart`)
    dispatch(getCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addToOrders = newOrder => async dispatch => {
  try {
    const res = await axios.post('/api/orders/cart', newOrder)
    dispatch(addToOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const buyStuff = status => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/cart`, status)
    dispatch(updateOrderStatus(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getOrderHistory = () => async dispatch => { 
  try {
    const res = await axios.get('/api/orders')
    dispatch(getAllOrders(res.data))
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
    case UPDATE_ORDER_STATUS:
      return initialState
    case GET_ALL_ORDERS: 
      return {...state, orders: action.orders}
    default:
      return state
  }
}
