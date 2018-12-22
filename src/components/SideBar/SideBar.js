import React from 'react';
import './SideBar.css';
import Menu from "../Menu/Menu";
import TableStudents from "../TableStudents/TableStudents";
import Modal from "../Modal/Modal";
import GroupList from "../GroupList/GroupList";
import URL from "../../const/constants";

class SideBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };

        fetch(URL + 'getUsers.php')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    groups: [...data]
                }, () => {
                    //console.log('did mount');
                })
            })
            .catch((err) => {
                console.log('error', err)
            });

        fetch(URL + 'getHome.php')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    home: [...data]
                }, () => {
                    //console.log('did mount');
                })
            })
            .catch((err) => {
                console.log('error', err)
            });
    }

    static defaultProps = {
        openAddDay: false,
        isOpen: false,
        activeGroup: 0,
        modalTitle: 'Title',
        modalInputs: []
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
        })
    };

    render() {

        return (
            <div className="SideBar__wrap">
                <GroupList isOpen={this.state.isOpen} groupList={this.state.groups} cbIndexGroup={this.getIndexGroup}/>
                <div className="Menu-and-Table">
                    <Menu cbAddDay={this.getValueDay}
                          cbshowGroupList={this.isOpenGroupList}
                          groupListIsOpen={this.state.isOpen}/>
                    {this.state.groups ? <TableStudents
                                            user={this.state.groups[this.state.activeGroup].users}
                                            home={this.state.home}/> : null}
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

export default SideBar;
