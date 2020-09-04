import React from 'react';
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { App } from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputForTodo from './InputForTodo';
import TodoList from './TodoList';
import { TodoNode } from './TodoNode';
import { Provider } from 'react-redux';
import { ACTIVE_ALL, COMPLETE_ALL, DELETE_ALL, TOGGLE_COMPLETED, DELETE_TODO } from './todoSlice'
import { configureStore } from '@reduxjs/toolkit';
import reducer from './todoSlice'
import { Buttons } from './Buttons';
import { Container } from 'reactstrap';
import async from 'async';
import { callbackify } from 'util';
var eachSeries = require("async/eachSeries");

const store = configureStore({
  reducer
})

const Foo = (props : { width : number, height : number} ) => (
  <div>
    <input name="width" value={props.width} />
    <input name="height" value={props.height} />
  </div>
);

configure({ adapter: new Adapter() });

describe('React component test with Enzyme', () => {
  it('App renders without crashing', () => {
    const wrapper = shallow(<App todos={[]}/>);
    console.log(wrapper.debug())
  });

  it('InputForTodo renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><InputForTodo/></Provider>);
    console.log(wrapper.debug());
  });

  it('TodoList renders without crashing', () => {
    const wrapper = shallow(<TodoList todos={[]}/>);
    console.log(wrapper.debug());
  });

  // async.series([(callback) => 
  it('TodoNode renders without crashing', () => {
    const props: any = {
      id : 1,
      completed : store.getState().todos.find(todo => todo.id = 1)?.completed
    }
    console.log(props)
    const wrapper = shallow(<TodoNode id={props.id} completed={props.completed} TOGGLE_COMPLETED={(payload : any) => store.dispatch(TOGGLE_COMPLETED(payload))} DELETE_TODO={(payload : any) => store.dispatch(DELETE_TODO(payload))}/>);
    wrapper.find('Input').simulate('change');
    store.subscribe(() => {
      console.log(store.getState().todos);
      expect(store.getState().todos.find(todo => todo.id === props.id)?.completed).toEqual(!props.completed);
    })()
    wrapper.find('Button').filterWhere(node => node.children().text() === 'Delete').simulate('click');
    store.subscribe(() => {
      console.log(store.getState().todos);
      expect(store.getState().todos.filter(todo => todo.id === props.id)).toHaveLength(0);
    })()
    // callback();
  }), 

  it('Buttons renders without crashing & provided features work', () => {
    const wrapper = shallow(<Buttons ACTIVE_ALL={() => store.dispatch(ACTIVE_ALL())} COMPLETE_ALL={() => store.dispatch(COMPLETE_ALL())} DELETE_ALL={() => store.dispatch(DELETE_ALL())}/>);
    const ButtonNodes = wrapper.find('Button').map(node => node).reverse();
    let subscriber = store.subscribe(() => {
      console.log(store.getState().todos)
      console.log(ButtonNodes[ButtonNodes.length - 1].children().text())
      switch((ButtonNodes.pop())?.text()) {
        case 'Add All' : expect(store.getState().todos.every(todo => todo.completed === false)).toEqual(true);
        case 'Complete All' : expect(store.getState().todos.every(todo => todo.completed === true)).toEqual(true);
        case 'Delete All' : expect(store.getState().todos.length).toEqual(0);
      }
    })
    wrapper.find('Button').forEach(node => {
      node.simulate('click');
    })
    subscriber();
  })
  // ])
});

describe('React Components test with Jest', () => {
  test('App Component with Snapshot', () => {
    const component = renderer.create(
      <Provider store={store}><App todos={[]}/></Provider>
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