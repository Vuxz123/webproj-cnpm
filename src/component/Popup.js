import React from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="popup-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;