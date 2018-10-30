import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import {getOneLocation} from '../store'; 
import UpdateLocation from './UpdateLocation';

class SingleLocation extends Component{ 
    constructor(props){ 
        super(props); 
        this.state={
            locationId: ''
            // currentLocation : {}
        }
    }

    componentDidMount(){ 
        const locationId = Number(this.props.match.params.locationId); 
        this.setState({locationId})
        this.props.getOneLocation(locationId); 
    }

    render(){ 
        //console.log(this.props); 
        console.log(this.props.locations)
        return(
           <div>
            <h2>{this.state.locationId}</h2>
            {/* {}fill in with other info! */}
            <UpdateLocation />
            </div>
        )
    }
}

const mapStateToProps = state => (
    { 
      locations: state.locations  
    }
)


const mapDispatchToProps = dispatch => (
    {
        getOneLocation: (id) => dispatch(getOneLocation(id))
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleLocation))