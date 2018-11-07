import axios from 'axios'
import {toast} from 'react-toastify'
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css'

//ACTION TYPES

const GET_CART = 'GET_CART'
const ADD_TO_ORDER = 'ADD_TO_ORDER'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const DELETE_FROM_ORDER = 'DELETE_FROM_ORDER'
const APPLY_DISCOUNT = 'APPLY_DISCOUNT'

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
const deleteItemFromOrder = itemId => ({type: DELETE_FROM_ORDER, itemId})
const applyDiscount = orders => ({type: APPLY_DISCOUNT, orders})

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

export const applyDiscountToOrder = (orderId, code) => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${orderId}/promocode`, {code})
    dispatch(applyDiscount(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getOrderHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(getAllOrders(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteFromOrder = itemId => async dispatch => {
  try {
    await axios.delete(`/api/orders/cart/${itemId}`)
    dispatch(deleteItemFromOrder(itemId))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, orders: action.orders}
    case ADD_TO_ORDER:
      {
        toast.success('Added to Cart')
      }
      return {...state, orders: [...state.orders, action.order]}
    case UPDATE_ORDER_STATUS:
      return initialState
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    case DELETE_FROM_ORDER:
      {
        toast.success('Removed from Cart')
      }
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.itemId)
      }
    case APPLY_DISCOUNT:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
