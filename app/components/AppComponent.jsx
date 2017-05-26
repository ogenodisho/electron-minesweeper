const React = require('react');
import MinesweeperContainer from '../../game/components/MinesweeperContainer.jsx';
import MenuContainer from '../../menu/components/MenuContainer.jsx';

const AppComponent = () => {
  return (
    <div id="app">
      <MenuContainer/>
      <MinesweeperContainer/>
    </div>
  )
}

export default AppComponent
