import React, { PropTypes } from 'react';

const MenuComponent = ({ handleClick, difficulty }) => {
  // TODO use difficulty to set the selected radio button
  return (
    <div id="difficulty">
      <span>Beginner</span>
      <input type='radio' name='difficulty' value='beginner' onClick={(e) => handleClick(e, "beginner")} checked/><br/>
      <span>Intermediate</span>
      <input type='radio' name='difficulty' value='intermediate' onClick={(e) => handleClick(e, "intermediate")}/><br/>
      <span>Expert</span>
      <input type='radio' name='difficulty' value='expert' onClick={(e) => handleClick(e, "expert")}/>
    </div>
  )
}

MenuComponent.propTypes = {
  difficulty: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default MenuComponent
