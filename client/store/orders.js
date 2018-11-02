import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'

//INITAL STATE

const initialState = {
  orders: []
}

//ACTION CREATORS

const getCart = orders => ({type: GET_CART, orders})

//THUNK CREATORS

export const fillCart = userId => async dispatch => {
  try {
    userId = Number(userId); 
    console.log('userId', userId); 
    const res = await axios.get(`/api/orders/cart/${userId}`, )
    console.log('red.data', res.data)
    dispatch(getCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
