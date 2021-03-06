import { Query, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import Table from './styles/Table';
import Cart from './Cart';

const StyledButton = styled.button`
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
`;

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMISSIONS_MUTATIONS = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
      {({data, loading, error}) =>
      console.log(data) || (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map(permission =>
                    <th key={permission}>{permission}</th>)}
                    <th>👇🏻</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => <UserPermissions user={user} key={user.id} />)}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };
  state = {
    permissions: this.props.user.permissions,
  }
  handlePermissionChange = (e) => {
    const checkbox = e.target;
    // Take a copy of the updated permissions
    let updatedPermissions = [...this.state.permissions];
    // Find out if we need to remove or add this
    if(checkbox.checked) {
      // Add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions: updatedPermissions })
  };
  render() {
    const user = this.props.user;
    return (
      <>
        <Mutation mutation={UPDATE_PERMISSIONS_MUTATIONS} variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}>
          {(updatePermissions, { loading, error }) => (
            <>
            {error && <tr><td colspan='8'><Error error={error} /></td></tr>}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type='checkbox'
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <StyledButton
                  type='button'
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? 'ing' : 'e'}
                </StyledButton>
              </td>
            </tr>
            </>
          )}
        </Mutation>
        <Cart />
      </>
    )
  }
}

export default Permissions;
