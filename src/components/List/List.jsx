import React from 'react'
import classNames from "classnames";
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg'

import Badge from '../Badge/Badge'

import './List.scss'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure want to delete the list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, {
                        active: activeItem && activeItem.id === item.id
                    })}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>{item.icon ? (item.icon)
                        :
                        <Badge color={item.color.name}/>
                    }
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && <img
                        className='list_remove-icon'
                        src={removeSvg}
                        alt={'Remove list'}
                        onClick={() => removeList(item)}
                    />}
                </li>
            ))}
        </ul>
    );
};

export default List;