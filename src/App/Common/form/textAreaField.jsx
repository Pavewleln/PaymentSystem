import React from "react";

const TextAreaField = ({label, name, value, onChange, error, placeholder}) => {
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    placeholder={placeholder}
                />

                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};

export default TextAreaField;
