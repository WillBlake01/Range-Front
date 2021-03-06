import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import NProgress from 'nprogress';
import Router from 'next/router';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

Router.router = { push() {} };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
];

describe('<TakeMyMoney />', () => {
  it('Renders and matches Snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const checkoutButton = wrapper.find('ReactStripeCheckout');
    expect(toJSON(checkoutButton)).toMatchSnapshot();
  });
  it('Creates an order ontoken', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: 'xyz789',
        },
      },
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    const component = wrapper.find('TakeMyMoney').instance();
    // Manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: 'abc123' }});
  });

  it('Turns the progress bar on', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    NProgress.start = jest.fn();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789'} },
    });
    const component = wrapper.find('TakeMyMoney').instance();
    // Manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(NProgress.start).toHaveBeenCalled();
  });

  it('Routes to the order page when completed', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz123'} },
    });
    const component = wrapper.find('TakeMyMoney').instance();
    Router.router.push = jest.fn();
    // Manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    await wait();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/order',
      query: {
        id: 'xyz123',
      },
    });
  });
});
