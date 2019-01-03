import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';
import Menu from "../Menu/Menu";
import TableStudents from "../TableStudents/TableStudents";
import Modal from "../Modal/Modal";
import GroupList from "../GroupList/GroupList";
import {connect} from "react-redux";

class SideBar extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        };
        this.props.getHeader(this.props.groups[0])
    }

    static propTypes = {
        groups: PropTypes.array,
        home: PropTypes.array,
    };

    static defaultProps = {
        openAddDay: false,
        isOpen: false,
        activeGroup: 0,
        modalTitle: 'Title',
        modalInputs: [],
        groups: [],
        home: []
    };

    getCloseModal = (val) => {
        this.setState({
            openAddDay: val
        })
    };

    getValueDay = (val) => {
        this.setState({
            openAddDay: val,
            modalTitle: 'Добавить день',
            modalInputs: [
                {
                    type: 'text',
                    placeholder: 'Выберите дату',
                    value: ''
                }
            ]
        }, () => {
            // console.log('test');
        })
    };

    isOpenGroupList = (val) => {
        this.setState({
            isOpen: val
        })
    };

    getIndexGroup = (val) => {
        //console.log('val', val);
        this.setState({
            activeGroup: val
        }, () => {
            this.props.getHeader(this.props.groups[this.state.activeGroup])
        });
    };

    render() {

        return (
            <div className="SideBar__wrap">
                <GroupList isOpen={this.state.isOpen} groupList={this.state.groups} cbIndexGroup={this.getIndexGroup}/>
                <div className="Menu-and-Table">
                    <Menu cbAddDay={this.getValueDay}
                          cbshowGroupList={this.isOpenGroupList}
                          groupListIsOpen={this.state.isOpen}/>
                    {this.props.groups ? <TableStudents
                                            user={this.props.groups[this.state.activeGroup].users}
                                            home={this.props.home}/> : null}
                </div>
                <Modal
                    isOpen={this.state.openAddDay}
                    cbCloseModal={this.getCloseModal}
                    title={this.state.modalTitle}
                    inputs={this.state.modalInputs}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
   rrr: state
});

const mapDispatchToProps = (dispatch) => ({
    getHeader: (title) => dispatch({type: 'SET_TITLE_GROUP', payload: title})
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
