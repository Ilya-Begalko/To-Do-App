import React, {useState} from 'react'
import List from "../List/List";
import Badge from "../Badge/Badge";

import closeSvg from '../../assets/img/close.svg'

import './AddList.scss';

const AddList = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id)

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
                    onClick={()=>setVisiblePopup(false)}
                    src={closeSvg}
                    alt='Close add list'
                    className="add-list_popup-close-btn"/>
                <input
                    className="field"
                    type="text"
                    placeholder="List name"/>
                <div className="add-list_popup-colors">
                    {
                        colors.map(color => (
                            <Badge
                                onClick={ () => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                        ))}
                </div>
                <button className="button">ADD</button>
            </div>}
        </div>
    );
}

export default AddList;