const React = require('react');
const ReactDOM = require('react-dom');
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import AppComponent from './components/AppComponent.jsx';
import gameReducer from '../game/reducer.js';
import menuReducer from '../menu/reducer.js';

require("!style-loader!css-loader!sass-loader!../_assets/scss/style.scss");

const reducers = combineReducers({
  game: gameReducer,
  menu: menuReducer
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Provider store={store}>
                  <AppComponent />
                </Provider>, document.getElementById('app'));
