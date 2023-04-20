import React from "react";

function IntegerInput({value ,onChange}) {
    const v = value;
    function handleIncrement() {
        onChange(v + 1);
    }

    function handleDecrement() {
        onChange(Math.min(v - 1, 0));
    }

    function handleChange(event) {
        const newValue = parseInt(event.target.value);
        onChange(isNaN(newValue) ? 0 : newValue);
    }

    return (
        <div className="input-group">
            <button className="input-group-button" type="button" onClick={handleDecrement}>-</button>
            <input className="input-group-field" type="text" min="0" value={v} onChange={handleChange} />
            <button className="input-group-button" type="button" onClick={handleIncrement}>+</button>
        </div>
    );
}

export default IntegerInput;