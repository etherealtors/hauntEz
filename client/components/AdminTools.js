import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import AddLocation from './AddLocation'
import { getAllCategories, addCategory, deleteCategory } from '../store/categories'

/**
 * COMPONENT
 */
class AdminTools extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
		this.props.getAllCategories();
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    console.log("THIS STATE CAT INPUT", this.state)

    await this.props.addCategory({name: this.state.categoryInput})
  }

  handleDelete(categoryId) {
    console.log("DELETEING NOW")
    this.props.deleteCategory(categoryId);
  }

  render() {
    const { categories } = this.props

    console.log("CATEGORIES ", categories)

    return (
      <div>
          <h1>Admin Tools Page</h1>
          <h2>Product Management</h2>
          {/*Add Product*/}
          <AddLocation />

          {/*Create/Remove categories/amenities*/}
          <h3>List of Categories</h3>
          {categories.map(category => {
            return (
              <div key={category.id}>
                <div>{category.name}</div>
                <button type="button" onClick={() => this.handleDelete(category.id)}>X</button>
              </div>
            )
          })}

          <form>
            <label>
              Add a New Category: 
              <input
                type="text"
                name="categoryInput"
                value={this.state.categoryInput}
                onChange={this.handleChange}
              />
            </label>
            <button type="button" onClick={this.handleSubmit}>
              Submit
          </button>
          </form>
          {/*Manage availability of product:
              -Users should not be able to see product on homepage any more if not available
              -Single product page should say not available*/}

          <h2>Order Management</h2>
          {/*View a list of all orders*/}
          {/*Filter orders by status*/}
          {/*View specific order details and can update status*/}
          {/*Change status of order:
              Created->Processing, Processing-> Cancelled || Completed
          */}

          <h2>User Management</h2>
          {/*Promote other user accounts to admin status*/}
          {/*Delete user*/}
          {/*Trigger password reset for a user*/}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log("STATE ". state)
  return {
    categories: state.categories.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    addCategory: (category) => dispatch(addCategory(category)),
    deleteCategory: (id) => dispatch(deleteCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTools)


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
/*const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      if(formName === 'signup') {
        const name = evt.target.fullname.value;
        dispatch(auth(email, password, formName, name))
      } else {
        dispatch(auth(email, password, formName))
      }

      //this.history.push('/');
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)*/



/**
 * PROP TYPES
 */

 /*
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}*/
