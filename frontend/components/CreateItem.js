import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $brand: String
    $category: String
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      brand: $brand
      category: $category
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    brand: '',
    category: '',
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/willblake01/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
  render() {
    return (
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, { loading, error }) => (
          <Form
            data-test='form'
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // Call the mutation
              const res = await createItem();
              // Change them to the single item page
              console.log(res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              })
            }}
          >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='file'>
                Image (optional)
                <input
                  type='file'
                  id='file'
                  name='file'
                  placeholder='Upload an image'
                  requiredvalue={this.state.image}
                  onChange={this.uploadFile}
                  />
                  {this.state.image && (<img src={this.state.image} alt='Upload Preview' width='200'/>)}
              </label>

              <label htmlFor='title'>
                Brand (optional)
                <input
                  type='text'
                  id='brand'
                  name='brand'
                  placeholder='Brand'
                  requiredvalue={this.state.brand}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor='title'>
                Category (optional)
                <input
                  type='text'
                  id='category'
                  name='category'
                  placeholder='Category'
                  requiredvalue={this.state.category}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  requiredvalue={this.state.title}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Price'
                  requiredvalue={this.state.price}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor='description'>
                Description
                <textarea
                  id='description'
                  name='description'
                  placeholder='Enter A Description'
                  requiredvalue={this.state.description}
                  onChange={this.handleChange}
                  />
              </label>
              <button type='submit'>Submit</button>
            </fieldset>
          </Form>
          )}
        </Mutation>
    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
