import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

import "./App.css";
import {default as isoFetch} from "isomorphic-fetch";
import URL from "./const/constants";


function counter(state = 0, action) {
    switch (action.type) {
        case 'STUDENTS_LIST':
            loadData();
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

function loadData (){

    isoFetch(URL + 'getUsers.php', {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
    })
        .then( (response) => { // response - HTTP-ответ
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err; // дальше по цепочке пойдёт отвергнутый промис
            }
            else
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
        })
        .then( (data) => {
            try {
                this.fetchSuccess(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
            }
            catch ( error ){
                this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
            }
        })
        .catch( (error) => {
            console.log('error',error);
            //this.fetchError(error.userMessage||error.message);
        })
    ;

};


let store = createStore(counter);


store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'STUDENTS_LIST' });

class App extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        }
    }

    render() {

        return (
            <div className="App">
                <Header/>
                <SideBar/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app') );



