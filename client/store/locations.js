import axios from 'axios'

//ACTION TYPES

const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION'; 


//INITIAL STATE 
const initialState = {
    locations: []
}


//ACTION CREATORS 

const addNewLocation = location => ({type: ADD_NEW_LOCATION, location})


//THUNK CREATORS 

export const addLocation = (address, imageUrl, quantity, description, category, price) => async (dispatch) => { 
    console.log('reached thunk creator'); 
    try{ 
        console.log('inside try'); 
        // const {data} = await axios.get('/api/location')
        const {data} = await axios.post('/api/locations', {category, address, description, quantity, price, imageUrl}); 
        console.log('data', data); 
        dispatch(addNewLocation(data.location)); 
    }catch(err){ 
        console.error(err); 
    }
}

export default function(state = initialState, action){ 
    switch(action.type){ 
        case ADD_NEW_LOCATION: 
            return {...state, location: action.location}
        default: 
            return state
    }
}