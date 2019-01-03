import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import URL from '../../consts/consts';
import './App.scss';

class App extends Component {
    constructor(props){
        super(props);
        this.props.onLoadUsers();
        this.props.onLoadHome();
    }

    render() {
        return (
            <div className="App">
                <Header/>
                {
                    (this.props.studentsList && this.props.homeList)
                        ?<SideBar home={this.props.homeList}
                                  groups={this.props.studentsList}/>
                        :<p>loading</p>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        studentsList: state.studentsList,
        homeList: state.homeList
    }),
    dispatch => ({
        onLoadUsers: () => {
            fetch(URL + 'getUsers.php')
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    dispatch({ type: 'LOAD_STUDENT', payload: data })
                })
                .catch((err) => {
                    console.log('error', err)
                });
        },
        onLoadHome: () => {
            fetch(URL + 'getHome.php')
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    dispatch({ type: 'LOAD_HOME', payload: data })
                })
                .catch((err) => {
                    console.log('error', err)
                });
        }
    })
)(App);
