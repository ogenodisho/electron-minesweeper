import React from 'react';
import PropTypes from 'prop-types';

const MenuComponent = ({ difficulty, restart, changeDifficulty }) => {
  let isBeginner = difficulty === "beginner";
  let isIntermediate = difficulty === "intermediate";
  let isExpert = difficulty === "expert";

  return (
    <div id="menu">
      <button onClick={(e) => restart(difficulty)}>Restart</button>
      <span>Beginner</span>
      <input type='radio' name='difficulty' value='beginner' onClick={(e) => changeDifficulty("beginner")} checked={isBeginner}/>
      <span>Intermediate</span>
      <input type='radio' name='difficulty' value='intermediate' onClick={(e) => changeDifficulty("intermediate")} checked={isIntermediate}/>
      <span>Expert</span>
      <input type='radio' name='difficulty' value='expert' onClick={(e) => changeDifficulty("expert")} checked={isExpert}/>
    </div>
  )
}

MenuComponent.propTypes = {
  difficulty: PropTypes.string.isRequired,
  restart: PropTypes.func.isRequired,
  changeDifficulty: PropTypes.func.isRequired
}

export default MenuComponent
