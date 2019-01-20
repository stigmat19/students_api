import React from 'react';
import './TableStudents.scss';
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import {connect} from "react-redux";
import URL from "../../consts/consts";

class TableStudents extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.scrollTable = null;
        this.scrollTr = null;
    }

    componentDidMount() {
        this.scrollTable && this.scrollTable.addEventListener('scroll', this.handleScroll);
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
            tel: "375111111111",
            email: 'stigmat19@yanddex.ru',
            groupID: 1
        },
        home: []
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

    handleScroll = () => {
        const value = this.scrollTable.scrollTop;
        if (this.scrollTable.scrollTop >= 100) {
            this.scrollTr.style.top = (value - 20) + 'px';
            this.scrollTr.style.position = 'absolute';
            this.scrollTr.style.backgroundColor = '#303030';
            this.scrollTr.style.left = '100px';
        }
        else {
            this.scrollTr.style.position = 'static';
        }
    };

    changeHomeStatus = (e) => {

        const userID = e.target.dataset.userid;
        const homeIndex = (e.target.dataset.homeindex) + '';
        const status = e.target.value;
        const homeAndUsersArr = [...this.props.homeAndUsers];

        let data = [
            ...homeAndUsersArr,
            {
                id: homeAndUsersArr.length + 1 + '',
                users: userID,
                home: homeIndex,
                status: status
            }
        ];

        this.props.updateHomeAndUsers(data)
    };

    saveHomeStatus = () => {
        const data = JSON.stringify([...this.props.homeAndUsers]);
        const fd = new FormData();
        fd.append("home", data);
        fetch(
                URL + 'updateHomework.php',
                {
                    method: 'POST',
                    body: fd
                }
        )
                .then((res, req) => {
                    console.log('res', res);
                    console.log('req', req);
                    if (res.status === 200) {
                        alert('Данные обновлены');
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                });
    };


    render() {
        const lessonsMaxNumber = Math.max.apply(null, this.props.home.map((item) => {
            return parseInt(item.lesson);
        }));

        let lessons = [];

        for (let i = 0; i < lessonsMaxNumber; i++) {
            lessons.push([]);
        }

        this.props.home.forEach((item, index) => {
            lessons[item.lesson - 1].push(
                    {
                        id: item.id,
                        type: item.type,
                        name: item.name
                    }
            )
        });

        let users = this.props.user;

        for (let k = 0; k < users.length; k++) {
            let homeArr = [];
            for (let i = 0; i < this.props.home.length; i++) {
                homeArr.push({users: users[k].id, home: this.props.home[i].id, status: "0"});
            }
            users[k].home = [...homeArr];
        }

        if (this.props.homeAndUsers) {
            for (let k = 0; k < this.props.homeAndUsers.length; k++) {
                for (let j = 0; j < users.length; j++) {
                    if (this.props.homeAndUsers[k].users === users[j].id) {
                        users[j].home[parseInt(this.props.homeAndUsers[k].home)] = {
                            users: this.props.homeAndUsers[k].users,
                            home: this.props.homeAndUsers[k].home,
                            status: this.props.homeAndUsers[k].status
                        }
                    }
                }
            }
        }


        return (
                <div className="TableStudents__wrap" ref={(ref) => {
                    this.scrollTable = ref
                }}>
                    <table>
                        <tbody>
                        <tr>
                            <td rowSpan={3}>Слушатели</td>
                            {lessons.map((item, index) => {
                                return (
                                        <td colSpan={item.length} key={index}>Lesson {index + 1}</td>
                                )
                            })}
                        </tr>
                        <tr>
                            {lessons.map((item, index) => {
                                return item.map((home, home_index) => {
                                    return (
                                            <td key={home_index}>{home.type === 'main' ? 'ДЗ' : 'ДОП'}</td>
                                    )
                                })
                            })}
                        </tr>
                        <tr ref={(ref) => {
                            this.scrollTr = ref
                        }}>
                            {lessons.map((item, index) => {
                                return item.map((home_name, home_name_index) => {
                                    return (
                                            <td key={home_name_index}>{home_name.name}</td>
                                    )
                                })
                            })}
                        </tr>

                        {/*Список студентов*/}
                        {
                            users ? users.map((user, user_index) => {
                                return (
                                        <tr key={user_index}>
                                            <td onDoubleClick={this.getPersonInfo} data-id={user_index}>
                                                {user.lastname + " " + user.name}
                                            </td>
                                            {user.home.map((home_item, home_index) => {
                                                return (
                                                        <td key={home_index}>
                                                            <select onChange={this.changeHomeStatus}
                                                                    value={home_item.status}
                                                                    data-userid={user.id}
                                                                    data-homeindex={home_item.home}
                                                                    data-status={home_item.status}>
                                                                <option value="0">Не готово</option>
                                                                <option value="1">Уточение</option>
                                                                <option value="2">Выполнено</option>
                                                            </select>
                                                        </td>
                                                )
                                            })}
                                        </tr>
                                )
                            }) : null
                        }
                        </tbody>
                    </table>
                    <button onClick={this.saveHomeStatus}>Сохранить</button>
                    <Modal isOpen={this.state.modalIsOpen}
                           title={'Информация о студенте'}
                           cbCloseModal={this.closeModal}>
                        <div className="current__user">
                            <div className="current__user--wrap">
                                <div className="current__user--photo">
                                    <img src="../../img/my.jpg" alt="photo"/>
                                    <button>Редактировать</button>
                                    <button>Удалить</button>
                                </div>
                                <div className="current__user--info">
                                    <h1>{this.state.currentUser.lastname + " " + this.state.currentUser.name}</h1>
                                    <p>{'Телефон: +' + this.state.currentUser.tel}</p>
                                    <p>{'Email: ' + this.state.currentUser.email}</p>
                                    <p>Работа: Сервис-деск</p>
                                    <p>Должность: Инженер-программист</p>
                                    <p>Учеба: БГУ</p>
                                    <h2>Посещаемость</h2>
                                    <div className="current__user--info--table">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>11.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                                <td>16.12.13</td>
                                            </tr>
                                            <tr>
                                                <td><i className="fas fa-check"/></td>
                                                <td><i className="fas fa-times"/></td>
                                                <td><i className="fas fa-check"/></td>
                                                <td><i className="fas fa-times"/></td>
                                                <td><i className="fas fa-check"/></td>
                                                <td><i className="fas fa-times"/></td>
                                                <td><i className="fas fa-check"/></td>
                                                <td><i className="fas fa-times"/></td>
                                                <td><i className="fas fa-check"/></td>
                                                <td><i className="fas fa-times"/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    homeAndUsers: state.homeAndUsers
});

const mapDispatchToProps = (dispatch) => ({
    updateHomeAndUsers: (data) => dispatch({type: 'LOAD_HOME_AND_USERS', payload: data})
});


export default connect(mapStateToProps, mapDispatchToProps)(TableStudents);