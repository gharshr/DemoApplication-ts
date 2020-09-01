import React from 'react';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputForTodo from './InputForTodo';
import TodoList from './TodoList';
import TodoNode from './TodoNode';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './todoSlice'
import Buttons from './Buttons';

const store = configureStore({
  reducer
})

configure({ adapter: new Adapter() });

describe('React component test with Enzyme', () => {
  it('App renders without crashing', () => {
     shallow(<Provider store={store}><App /></Provider>);
  });

  it('InputForTodo renders without crashing', () => {
    shallow(<Provider store={store}><InputForTodo/></Provider>);
  });

  it('TodoList renders without crashing', () => {
    shallow(<TodoList todos={[]}/>);
  });

  it('TodoNode renders without crashing', () => {
    shallow(<Provider store={store}><TodoNode/></Provider>);
  });

  it('Buttons renders without crashing', () => {
    shallow(<Provider store={store}><Buttons/></Provider>);
  });
});

describe('React Components test with Jest', () => {
  test('App Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><App /></Provider>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  
  test('InputForTodo Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><InputForTodo todos={[]} /></Provider>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  
  test('TodoList Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><TodoList todos={[]} /></Provider>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  
  test('TodoNode Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><TodoNode /></Provider>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  
  test('Buttons Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><Buttons /></Provider>
    );
  
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})