"use client";
import "./Input.css";
import { InputProps } from "@/Components/Types";
import Icon from "@/Components/Icons/Icon";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";

import { useState } from "react";

export function InputField(props: InputProps) {
    const { size, className, ...inputProps } = props;
    const classNames = "app-input" + (className ? " " + className : "") + (size ? " size-" + size : "");

    return (
        <input {...inputProps} className={classNames} />
    );
}
    
export default function Input(props: InputProps) {
    const { size, name, type, placeholder, icon, className, ...inputProps } = props;
    let classNames = "app-input" + 
    (className ? " " + className : "") + 
    (size ? " size-" + size : "");

    return (
        <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="m" {...inputProps} className={classNames}>
            {icon && <Icon size={size} name={icon} />}
            <input {...inputProps} size={16} type={type} name={name} placeholder={placeholder} />
        </Row>
    );
}

type TextProps = Omit<InputProps, "type">

export function Text(props: TextProps) {
    const { size, name, placeholder, icon, className, ...inputProps } = props;
    const classNames = "app-input" +
        (className ? " " + className : "") +
        (size ? " size-" + size : "");

    return (
        <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="m" {...inputProps} className={classNames}>
            {icon && <Icon size={size} name={icon} />}
            <input {...inputProps} size={16} type="text" name={name} placeholder={placeholder} />
        </Row>
    );
}

type EmailProps = Omit<InputProps, "type" | "placeholder" | "icon">
export function Email(props: EmailProps) {
    const { size, name, required, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} name={name} type="email" placeholder="Email Address" icon="at-sign" required={required} />
    );
}

type DateTimeProps = Omit<InputProps, "type" | "placeholder" | "icon">
export function DateTime(props: DateTimeProps) {
    const { size, name, required, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} name={name} type="datetime-local" placeholder="Select Date and Time" icon="calendar-clock" required={required} />
    );
} 

type DropdownProps = Omit<InputProps, "type"> & {
    options: { label: string; value: string }[];
}
export function Dropdown(props: DropdownProps) {
    const { size, name, placeholder, icon, options, required, className, ...inputProps } = props;
    const classNames =
        "app-input dropdown" +
        (className ? " " + className : "");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ label: string, value: string } | string>(placeholder);

    return (
        <Column {...inputProps} className={classNames}>
            <Row wrap="nowrap" mainAxis="space-between" crossAxis="center" gap="none" fillWidth onClick={() => setDropdownOpen(!dropdownOpen)}>
                <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="l">
                    <Icon size={size} name={icon} />
                    <label>{typeof selectedOption === "string" ? selectedOption : selectedOption.label}</label>
                </Row>
                <Button type="button" size={size} icon={dropdownOpen ? "chevron-up" : "chevron-down"} variant="inline" onClick={() => setDropdownOpen(!dropdownOpen)} />
            </Row>
            <Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="m" className={dropdownOpen ? "" : "hidden"}>
                {options && options.map((option, index) => (
                    <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="s" key={index}>
                        <input type="radio" name={name} value={option.value} onChange={() => { setSelectedOption(option); setDropdownOpen(false); }} />
                        <label>{option.label}</label>
                    </Row>
                ))}
            </Column>
        </Column>
    );
} 