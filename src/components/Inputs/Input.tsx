"use client";
import "./Input.css";
import { InputProps } from "@/Components/Types";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import Icon from "@/Components/Icons/Icon";

import { useState } from "react";

    
export default function Input(props: InputProps) {
    const { size, label, icon, className, ...inputProps } = props;
    let classNames = "app-input" + 
    (className ? " " + className : "") + 
    (size ? " size-" + size : "");

    return (
        <Row className={classNames} wrap="nowrap" mainAxis="center" crossAxis="start" gap="m">
            {icon && <Icon size={size} name={icon} />}
            <Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="none" fillWidth >
                <label>{label}</label>
                <input {...inputProps} size={16} />
            </Column>
            
        </Row>
    );
}

type TextProps = Omit<InputProps, "type">;

export function Text(props: TextProps) {
    const { size, name, label, placeholder, icon, required, className, ...inputProps } = props;
    const classNames = "app-input" +
        (className ? " " + className : "") +
        (size ? " size-" + size : "");

    return (
        <Input {...inputProps} size={size} name={name} type="text" label={label} placeholder={placeholder} icon={icon} required={required} />
    );
}

type NumberProps = Omit<InputProps, "type"> & {
    min: number;
    max: number;
    step: number;
};

export function Number(props: NumberProps) {
    const { size, name, label, placeholder, icon, required, className, ...inputProps } = props;
    const classNames = "app-input" +
        (className ? " " + className : "") +
        (size ? " size-" + size : "");

    return (
        <Input {...inputProps} size={size} name={name} type="number" label={label} placeholder={placeholder} icon={icon} required={required} />
    );
}

type EmailProps = Omit<InputProps, "type" | "placeholder" | "icon">;

export function Email(props: EmailProps) {
    const { size, name, required, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} name={name} type="email" placeholder="Email Address" icon="at-sign" required={required} />
    );
}

type DateTimeProps = Omit<InputProps, "type" | "placeholder" | "icon">;
export function DateTime(props: DateTimeProps) {
    const { size, name, required, ...inputProps } = props;
    return (
        <Input {...inputProps} size={size} name={name} type="datetime-local" placeholder="Select Date and Time" icon="calendar-clock" required={required} />
    );
} 

type DropdownProps = Omit<InputProps, "type" | "placeholder"> & {
    options: { label: string; value: string }[];
};

export function Dropdown(props: DropdownProps) {
    const { size, name, label, icon, options, required, className, ...inputProps } = props;
    const classNames =
        "app-input dropdown" +
        (className ? " " + className : "");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ label: string, value: string }>({ label, value: "" });

    return (
        <Column className={classNames} wrap="nowrap" mainAxis="center" crossAxis="center" gap="xl">
            <Row wrap="nowrap" mainAxis="space-between" crossAxis="center" gap="none" fillWidth onClick={() => setDropdownOpen(!dropdownOpen)}>
                <Row wrap="nowrap" mainAxis="start" crossAxis="start" gap="m" size={size}>
                    <Icon size={size} name={icon} />
                    <label>{selectedOption.label}</label>
                    <input {...inputProps} type="hidden" name={name} value={selectedOption.value} required={required} />
                </Row>
                <Button type="button" size={size} icon={dropdownOpen ? "chevron-up" : "chevron-down"} onClick={() => setDropdownOpen(!dropdownOpen)} />
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
                                checked={selectedOption.value === option.value}
                                onChange={() => { setSelectedOption(option); setDropdownOpen(false); }}
                                required={required}
                            />
                            <label htmlFor={name + "-radio-" + index}>{option.label}</label>
                        </Row>
                    ))}
                </Column>
            )}
        </Column>
    );
}