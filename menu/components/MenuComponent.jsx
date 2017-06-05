import React from 'react';
import PropTypes from 'prop-types';
import { BEGINNER, INTERMEDIATE, EXPERT } from '../../game/models/board.js';

const MenuComponent = ({ difficulty, restart, changeDifficulty }) => {
  let isBeginner = difficulty === BEGINNER;
  let isIntermediate = difficulty === INTERMEDIATE;
  let isExpert = difficulty === EXPERT;

  return (
    <div id="menu">
      <button onClick={(e) => restart(difficulty)}>Restart</button>
      <span>Beginner</span>
      <input type='radio' name='difficulty' value={BEGINNER} onClick={(e) => changeDifficulty(BEGINNER)} checked={isBeginner}/>
      <span>Intermediate</span>
      <input type='radio' name='difficulty' value={INTERMEDIATE} onClick={(e) => changeDifficulty(INTERMEDIATE)} checked={isIntermediate}/>
      <span>Expert</span>
      <input type='radio' name='difficulty' value={EXPERT} onClick={(e) => changeDifficulty(EXPERT)} checked={isExpert}/>
    </div>
  )
}

MenuComponent.propTypes = {
  difficulty: PropTypes.string.isRequired,
  restart: PropTypes.func.isRequired,
  changeDifficulty: PropTypes.func.isRequired
}

export default MenuComponent
