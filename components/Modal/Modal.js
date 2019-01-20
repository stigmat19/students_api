import React from 'react';
import PropTypes from 'prop-types';


import './Modal.scss';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isOpen: nextProps.isOpen
        })
    }

    static propTypes = {
        inputs: PropTypes.array,
        isOpen: PropTypes.bool,
        title: PropTypes.string,
        cbCloseModal: PropTypes.func
    };

    static defaultProps = {
        inputs: [
            {
                type: 'text',
                placeholder: 'Имя',
                value: ''
            },
            {
                type: 'text',
                placeholder: 'Фамилия',
                value: ''
            }
        ],
        isOpen: false,
        title: 'Добавить студента',
    };

    closeModal = () => {
        this.setState({
            isOpen: false
        }, () => {

        });
        this.props.cbCloseModal(false)
    };

    saveValue = () => {
        console.log('state', this.state);
    };

    getInputValue = (e) => {
        const ind = e.target.dataset.id;
        const val = e.target.value;

        let result = [
            ...this.props.inputs
        ];

        result[ind].value = val;

        this.setState({
            inputs: [...result]
        }, () => {

        })
    };

    render() {
        return (
            <div className="Modal__wrap" style={{display: this.state.isOpen?'block':'none'}}>
                <div className="Modal__wrap--content">
                    <h2>{this.props.title}</h2>
                    {
                      !this.props.children?this.props.inputs.map((item, index) => {
                            return (
                                <input key={index}
                                       type={item.type}
                                       placeholder={item.placeholder}
                                       data-id={index}
                                       onChange={this.getInputValue}/>
                            )
                        }):this.props.children
                    }
                    <button onClick={this.saveValue}>Сохранить</button>
                    <svg width="25"
                         height="25"
                         xmlns="http://www.w3.org/2000/svg" onClick={this.closeModal}>
                        <line x1="0" y1="0" x2="25" y2="25" stroke="#70747e" strokeWidth="5" />
                        <line x1="0" y1="25" x2="25" y2="0" stroke="#70747e" strokeWidth="5" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default Modal;