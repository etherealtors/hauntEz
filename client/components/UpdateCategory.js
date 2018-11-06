import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { getAllCategories, addCategory, deleteCategory } from '../store/categories'

/**
 * COMPONENT
 */
class UpdateCategory extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryInput: '',
      typeInput: 'houseType'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
	this.props.getAllCategories();
  }
  
  handleChange(event) {
    console.log(event)
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addCategory({name: this.state.categoryInput, categoryType: this.state.typeInput})
  }

  handleDelete(categoryId) {
    this.props.deleteCategory(categoryId);
  }

  render() {
    const { categories } = this.props

    return (
      <div>

          <h3>List of Categories</h3>
          {categories.map(category => {
            return (
              <div key={category.id}>
                <div>{category.name}</div>
                <button type="button" onClick={() => this.handleDelete(category.id)}>X</button>
              </div>
            )
          })}

          <form onSubmit={this.handleSubmit}>
            <label>
              Add a New Category: 
              <input
                type="text"
                name="categoryInput"
                value={this.state.categoryInput}
                onChange={this.handleChange}
              />
            </label>

            <select name="typeInput" onChange={this.handleChange}>
              <option value="houseType">House Type</option>
              <option value="amenity">Amenity</option>
            </select>

            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategory)
