"use client";
import "./Input.css";
import { InputProps } from "@/Components/Types";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import Icon from "@/Components/Icons/Icon";

import { useState } from "react";

    
export default function Input(props: InputProps) {
    const { size, label, icon, error, className, ...inputProps } = props;
    const classNames = "app-input" + 
    (className ? " " + className : "") + 
    (size ? " size-" + size : "") +
    (error ? " error" : "");

    const [errorVisible, setErrorVisible] = useState(false);

    return (
        <Row className={classNames} wrap="nowrap" mainAxis="center" crossAxis="stretch" gap="m">
            {icon && <Icon size={size} name={icon} />}
            <Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="xxs" fillWidth >
                <label>{label}</label>
                <input {...inputProps} size={16} />
                {error && errorVisible && <p className="error-message">{error}</p>}
            </Column>
            <Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="none">
                {error && <Button className="error-button" size={size} icon="circle-alert" onClick={() => setErrorVisible(!errorVisible)} />}
            </Column>
        </Row>
    );
}

type TextProps = Omit<InputProps, "type">;

export function Text(props: TextProps) {
    const { size, name, label, placeholder, icon, onChange, value, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} type="text" name={name} label={label} placeholder={placeholder} icon={icon} onChange={onChange} value={value}/>
    );
}

type NumberProps = Omit<InputProps, "type"> & {
    min: number;
    max: number;
    step: number;
};
export function Number(props: NumberProps) {
    const { size, name, label, placeholder, icon, onChange, value, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} name={name} type="number" label={label} placeholder={placeholder} icon={icon} onChange={onChange} value={value} />
    );
}

type EmailProps = Omit<InputProps, "type" | "label" | "placeholder" | "icon">;
export function Email(props: EmailProps) {
    const { size, name, onChange, value, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} type="email" name={name} label="Email Address" placeholder="email@domain.com" icon="at-sign" onChange={onChange} value={value} />
    );
}

type DateTimeProps = Omit<InputProps, "type" | "placeholder" | "icon">;
export function DateTime(props: DateTimeProps) {
    const { size, name, label, onChange, value, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} type="datetime-local" name={name} label={label} placeholder="Select Date and Time" icon="calendar-clock" onChange={onChange} value={value} />
    );
} 

type DropdownProps = Omit<InputProps, "type" | "placeholder"> & {
    options: { label: string; value: string }[];
};
export function Dropdown(props: DropdownProps) {
    const { size, name, label, icon, options, onChange, value, error, className, ...inputProps } = props;
    const classNames =
        "app-input dropdown" +
        (className ? " " + className : "") + 
        (size ? " size-" + size : "") +
        (error ? " error" : "");

    const [errorVisible, setErrorVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedOptionLabel = options.find(option => option.value === value)?.label ?? label;

    return (
        <Column className={classNames} wrap="nowrap" mainAxis="center" crossAxis="center" gap="xl">
            <Row wrap="nowrap" mainAxis="space-between" crossAxis="stretch" gap="none" fillWidth>
                <Row wrap="nowrap" mainAxis="start" crossAxis="start" gap="m" size={size} onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <Icon size={size} name={icon} />
                    <Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="xxs">
                        <label>{selectedOptionLabel}</label>
                        {error && errorVisible && <p className="error-message">{error}</p>}
                    </Column>
                    <input {...inputProps} type="hidden" name={name} value={value} />
                </Row>
                <Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                    <Button type="button" size={size} icon={dropdownOpen ? "chevron-up" : "chevron-down"} onClick={() => setDropdownOpen(!dropdownOpen)} />
                    {error && <Button className="error-button" size={size} icon="circle-alert" onClick={() => setErrorVisible(!errorVisible)} />}
                </Row>
            </Row>
            {dropdownOpen && (
                <Column wrap="nowrap" mainAxis="center" crossAxis="start" gap="m" fillWidth>
                    {options && options.map((option, index) => (
                        <Row key={index} wrap="nowrap" mainAxis="start" crossAxis="center" gap="s" size={size}>
                            <input
                                id={name + "-radio-" + index}
                                type="radio"
                                name={name + "-radio"}
                                value={option.value}
                                checked={value === option.value}
                                onChange={() => {
                                    onChange?.({
                                        target: { name, value: option.value}
                                    } as React.ChangeEvent<HTMLInputElement>);
                                    setDropdownOpen(false);
                                }}
                            />
                            <label htmlFor={name + "-radio-" + index}>{option.label}</label>
                        </Row>
                    ))}
                </Column>
            )}
        </Column>
    );
}