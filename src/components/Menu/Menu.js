import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

class Menu extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  static propTypes = {
    cbAddDay: PropTypes.func,
    cbshowGroupList: PropTypes.func,
    groupListIsOpen: PropTypes.bool
  };

  static defaultProps = {

  };

  addDay = () => {
    this.props.cbAddDay(true);
  };

  showGroupList = () => {
    this.props.cbshowGroupList(!this.props.groupListIsOpen);
  };

  render() {
    return (
        <div className="Menu__wrap">
          <h2>Группы</h2>
          <button onClick={this.showGroupList}>{this.props.groupListIsOpen?'Скрыть':'Список групп'}</button>
          <h2>Студенты</h2>
          <button>Добавить</button>
          <hr/>
          <h2>День/дата</h2>
          <button onClick={this.addDay}>Добавить день</button>
        </div>
    );
  }
}

export default Menu;