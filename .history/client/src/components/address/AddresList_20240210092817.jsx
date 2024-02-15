import React, { useState } from 'react';
import NewAddress from './NewAddress';
import './yourStyles.css';

function AddressList() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    if (isEditing) {
        return <NewAddress />;
    }

    return (
        <>
            <div className="form-saved-left">
                {/* Your address list content */}
            </div>
            <div className="address-saved-edit">
                <div className="dropdown">
                    <button className="dropbtn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="grey"
                            stroke="rgb(130,130,130)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-grip-vertical"
                        >
                            <circle cx="9" cy="12" r="1" />
                            <circle cx="9" cy="5" r="1" />
                            <circle cx="9" cy="19" r="1" />
                        </svg>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" onClick={handleEdit}>Edit</a>
                        <a href="#">Delete</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddressList;
