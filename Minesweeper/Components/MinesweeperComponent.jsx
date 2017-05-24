var React = require('react');

export default class MinesweeperComponent extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <table>
          <tbody>
            <tr>
              <td className="fa fa-bomb"></td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td className="fa fa-flag"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
