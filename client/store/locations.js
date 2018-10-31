import axios from 'axios'

//ACTION TYPES
const GET_LOCATIONS = 'GET_LOCATIONS'
const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION'; 
const UPDATE_LOCATION = 'UPDATE_LOCATION'


//INITIAL STATE 
const defaultLocations = []


//ACTION CREATORS 
const getLocations = locations => ({type: GET_LOCATIONS, locations})
const addNewLocation = location => ({type: ADD_NEW_LOCATION, location})
const updateExistingLocation = location => ({type: UPDATE_LOCATION, location})


//THUNK CREATORS 
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

export const addLocation = (address, imageUrl, quantity, description, category, price) => async (dispatch) => { 
 
    try{ 
      
        const {data} = await axios.post('/api/locations', {category, address, description, quantity, price, imageUrl}); 
        console.log('data', data); 
        dispatch(addNewLocation(data.location)); 
    }catch(err){ 
        console.error(err); 
    }
}

export const updateLocation = (updatedLocation) => async (dispatch) => { 
    try{ 
        console.log("updatedLocation within thunk", updatedLocation);
        const data = await axios.put(`/api/locations/${updatedLocation.id}`, updatedLocation); 
        console.log('updated data', data); 
        dispatch(updateExistingLocation(data));
    }catch(err){ 
        console.error(err); 
    }
}

// REDUCER
export default function(state = defaultLocations, action){ 
    switch(action.type){ 
        case ADD_NEW_LOCATION: 
            return action.locations
        case GET_LOCATIONS:
            return action.locations
        case UPDATE_LOCATION: 
            let locations = [...state]
            let locationToUpdateIdx = locations.findIndex(location => location.id === action.location.id)
            let updatedLocation = {...locations[locationToUpdateIdx], ...action.location}
            locations[locationToUpdateIdx] = updatedLocation
            return locations
        default: 
            return state
    }
}
