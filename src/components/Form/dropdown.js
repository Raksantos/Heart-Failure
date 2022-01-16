import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core';

export default function Dropdown({ name, items }) {
    const inputRef = useRef(null);
    const { fieldName, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <select ref={inputRef} defaultValue={items[0].value} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            {items.map(item => {
                return (<option key={item.value} value={item.value}>{item.name}</option>);
            })}
        </select>
    )
}
