import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import ProductsListStyles from '../components/styles/ProductsListStyles';
import Search from './Search';
import { SearchStyles } from './styles/DropDown';

const TENTS_QUERY = gql`
  query TENTS_QUERY {
    tents {
      id
      brand
      category
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Tents = () => {
  const { data, error, loading } = useQuery(TENTS_QUERY);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;

  return (
    <>
      <SearchStyles>
        <Search />
      </SearchStyles>
      <ProductsListStyles>
        {data.tents.map(product => <Product product={product} key={product.id} />)}
      </ProductsListStyles>
    </>
  )
}

export default Tents;
export { TENTS_QUERY };
