import React, {Component} from 'react' 
import {connect} from 'react-redux';  
import {withRouter} from 'react-router-dom';
import { getOrderHistory } from '../store'


class OrderHistory extends Component { 
  
    componentDidMount(){ 
        this.props.getOrderHistory(); 
    }

    render() {
        const orders = this.props.orders; 
        return (
            <div>
                <h3>List of Orders</h3>
                <table>
                <tbody>
                    <tr>
                        <th>Order ID</th>
                        <th>Address</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>total</th>
                        <th>status</th>
                    </tr>
                    {orders.map((order, i) => {
                        return (
                            order ? (
                            <tr key={order.id}>
                                <td>{order.orderId}</td>
                                <td>{order.location.address}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.price*order.quantity}</td>
                                <td>{order.status}</td>
                            </tr> ) : null 
                        )
                    })}
                </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({ 
    getOrderHistory: () => dispatch(getOrderHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory); 