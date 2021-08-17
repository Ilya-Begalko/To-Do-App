import React, {useState, useEffect} from 'react'
import axios from "axios";

import {List, Badge} from '../../components'

import closeSvg from '../../assets/img/close.svg'

import './AddList.scss';

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert('Enter the name of the list');
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({data}) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = {...data, color: {name: color}};
                onAdd(listObj);
                onClose();
            })
            .catch(() => {
                alert('Error adding list')
            })
            .finally(() => {
                    setIsLoading(false)
                }
            );
    };

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: "list_add-button",
                        icon: (<svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 1V15"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 8H15"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>),
                        name: 'Add list',
                    },
                ]}
            />
            {visiblePopup && <div className="add-list_popup">
                <img
                    onClick={onClose}
                    src={closeSvg}
                    alt='Close add list'
                    className="add-list_popup-close-btn"/>
                <input
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    className="field"
                    type="text"
                    placeholder="List name"/>
                <div className="add-list_popup-colors">
                    {
                        colors.map(color => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                        ))}
                </div>
                <button
                    className="button"
                    onClick={addList}>
                    {isLoading ? 'ADDING...' : 'ADD'}
                </button>
            </div>}
        </div>
    );
}

export default AddList;