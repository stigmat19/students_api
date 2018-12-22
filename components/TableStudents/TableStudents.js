import React from 'react';
import './TableStudents.css';
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

class TableStudents extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    static propTypes = {
        user: PropTypes.array,
        modalIsOpen: PropTypes.bool,
        home: PropTypes.array
    };

    static defaultProps = {
        user: [
            {
                name: 'Сергей',
                lastname: 'Авраменко',
                tel: "375111111111",
                email: 'stigmat19@yanddex.ru',
                groupID: 1,
                lessons: [
                    {
                        data: '15.09.2018',
                        isVisited: true
                    }
                ]
            },
        ],
        modalIsOpen: false,
        modalInputs: [
            {
                type: 'text',
                placeholder: 'Выберите дату',
                value: ''
            }
        ],
        currentUser: {
            name: 'Сергей',
            lastname: 'Авраменко',
            tel: "375111111111111",
            email: 'stigmat19@yanddex.ru',
            groupID: 1
        },
        home: [

        ]
    };

    getPersonInfo = (e) => {
        const personID = e.target.dataset.id;
        const currentUser = this.props.user[personID];

        this.setState({
            modalIsOpen: true,
            currentUser: {...currentUser}
        })
    };

    closeModal = (val) => {
        this.setState({
            modalIsOpen: val
        })
    };


    render() {

        const lessonsMaxNumber = Math.max.apply(null, this.props.home.map((item) => {
            return parseInt(item.lesson);
        }));

        let lessons = [];

        for(let i=0; i<lessonsMaxNumber; i++) {
            lessons.push([]);
        }

        this.props.home.forEach((item,index) => {
            lessons[item.lesson-1].push(
                {
                    type: item.type,
                    name: item.name
                }
            )
        });

        console.log('lessons', lessons);

        return (
            <div className="TableStudents__wrap">
                <table>
                    <tbody>
                    <tr>
                        <td rowSpan={3}>Слушатели</td>
                        {lessons.map((item, index) => {
                            return(
                                <td colSpan={item.length} key={index}>Lesson {index+1}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        {lessons.map((item, index) => {
                            return item.map((home,home_index) =>{
                                return(
                                    <td key={home_index}>{home.type==='main'?'ДЗ':'ДОП'}</td>
                                )
                            })
                        })}
                    </tr>
                    <tr>
                        {lessons.map((item, index) => {
                            return item.map((home_name,home_name_index) =>{
                                return(
                                    <td key={home_name_index}>{home_name.name}</td>
                                )
                            })
                        })}
                    </tr>

                    {/*Список студентов*/}
                    {
                        this.props.user ? this.props.user.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td onDoubleClick={this.getPersonInfo} data-id={index}>
                                        {item.lastname + " " + item.name}
                                    </td>
                                    {lessons.map((item, index) => {
                                        return item.map((check,check_index) =>{
                                            return(
                                                <td key={check_index}>
                                                    <input type="checkbox"/>
                                                </td>
                                            )
                                        })
                                    })}
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalIsOpen}
                       title={'Информация о студенте'}
                       cbCloseModal={this.closeModal}>
                    <div className="current__user">
                        <h1>{this.state.currentUser.lastname + " " + this.state.currentUser.name}</h1>
                        <h2>{'+' + this.state.currentUser.tel}</h2>
                        <h2>{'Email: ' + this.state.currentUser.email}</h2>
                        <button>Редактировать</button>
                        <button>Удалить</button>
                        {/*<div className="homework">*/}
                        {/*Домашние задания*/}
                        {/*</div>*/}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default TableStudents;