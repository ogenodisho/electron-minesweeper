var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MinesweeperContainer from './game/components/MinesweeperContainer.jsx';
import gameReducer from './game/reducer.js'

let store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Provider store={store}>
                  <MinesweeperContainer />
                </Provider>, document.getElementById('app'))
