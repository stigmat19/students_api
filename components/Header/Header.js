import React from 'react';
import {connect} from 'react-redux';
import './Header.css';

class Header extends React.PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="Header__wrap">
                <p>Группа {this.props.header}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    header: state.header
});



export default connect(mapStateToProps)(Header);
// export default Header;