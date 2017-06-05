const React = require('react');
import MinesweeperContainer from '../../game/components/MinesweeperContainer.jsx';
import UndoRedo from '../../game/components/UndoRedo.jsx';
import MenuContainer from '../../menu/components/MenuContainer.jsx';

const AppComponent = () => {
  return (
    <div id="app">
      <MenuContainer/>
      <MinesweeperContainer/>
      <UndoRedo/>
    </div>
  )
}

export default AppComponent
