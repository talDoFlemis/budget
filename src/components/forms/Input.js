function Input({ type, text, name, placeholder, handleOnChange, value, max, min }) {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label label-text">
                {text}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                max={max}
                min={min}
                className="input input-bordered"
            />
        </div>
    );
}

export default Input;
