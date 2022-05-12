function Select({ text, category_name, options, handleOnChange, value }) {
    return (
        <div className="form-control">
            <label htmlFor={category_name} className="label label-text">
                {text}
            </label>
            <select
                name={category_name}
                id={category_name}
                onChange={handleOnChange}
                value={value || ""}
                className="select select-bordered select-primary w-full"
            >
                <option>Selecione uma opção</option>
                {options.map(({ category_name, id }) => (
                    <option value={id} key={id}>
                        {category_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
