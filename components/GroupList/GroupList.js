import React from 'react';
import PropTypes from 'prop-types';
import './GroupList.css';

class GroupList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    groupList: PropTypes.array,
    cbIndexGroup: PropTypes.func
  };

  static defaultProps = {
    groupList: [
      {
        name: 'FD1-78-18',
      },
    ],
    isOpen: false
  };

  getIndexGroup = (e) => {
    this.props.cbIndexGroup(e.target.dataset.id);
  };

  render() {

    return (
        <div className="GroupList__wrap" style={{width: this.props.isOpen?'200px':0}}>
          <ul>
            {
              this.props.groupList.map((item, index) => {
                return(
                    <li key={index} data-id={index} onClick={this.getIndexGroup}>{item.name}</li>
                )
              })
            }
          </ul>
        </div>
    );
  }
}

export default GroupList;
