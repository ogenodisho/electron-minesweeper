import React, { PropTypes } from 'react';

const MenuComponent = ({ handleDifficultyChanged, handleRestart, difficulty }) => {
  let isBeginner = difficulty === "beginner";
  let isIntermediate = difficulty === "intermediate";
  let isExpert = difficulty === "expert";

  return (
    <div id="menu">
      <button onClick={(e) => handleRestart(e, difficulty)}>Restart</button>
      <span>Beginner</span>
      <input type='radio' name='difficulty' value='beginner' onClick={(e) => handleDifficultyChanged(e, "beginner")} checked={isBeginner}/>
      <span>Intermediate</span>
      <input type='radio' name='difficulty' value='intermediate' onClick={(e) => handleDifficultyChanged(e, "intermediate")} checked={isIntermediate}/>
      <span>Expert</span>
      <input type='radio' name='difficulty' value='expert' onClick={(e) => handleDifficultyChanged(e, "expert")} checked={isExpert}/>
    </div>
  )
}

MenuComponent.propTypes = {
  difficulty: PropTypes.string.isRequired,
  handleDifficultyChanged: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired
}

export default MenuComponent
