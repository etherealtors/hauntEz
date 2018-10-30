import axios from 'axios'

// ACTION TYPES
const GET_LOCATIONS = 'GET_LOCATIONS'

// INITIAL STATE
const defaultLocations = []

// ACTION CREATORS
const getLocations = locations => ({type: GET_LOCATIONS, locations})

// THUNK CREATORS
export const getAllLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    dispatch(getLocations(res.data || defaultLocations))
  } catch (error) {
    console.error(error)
  }
}

export const getOneLocation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/locations/${id}`)
    dispatch(getLocations(res.data || defaultLocations))
  } catch (error) {
    console.error(error)
  }
}

export const getFilteredLocations = category => async dispatch => {
  try {
    const res = await axios.get(`/api/locations/filter/${category}`)
    dispatch(getLocations(res.data || defaultLocations))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export default function(state = defaultLocations, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
