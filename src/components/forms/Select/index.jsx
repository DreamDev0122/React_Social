import React from 'react';
import Select from 'react-select';

const SelectInput = (props) => {
  // props
  const {
    title,
    options,
    onChange,
    isMulti,
    value,
    placeholder,
    name,
  } = props;

  // handler
  const handleChange = (value, item) => {
    onChange(item.name, value);
  }

  // render
  return (
    <>
      <p>{title}</p>
      <Select
        name={name}
        options={options}
        onChange={handleChange}
        value={value}
        isMulti={isMulti}
        placeholder={placeholder}
      />
    </>
  );
}

export default SelectInput;
