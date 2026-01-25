"use client";
import "./Text.css";
import { TextProps } from "@/Components/Props"
import { useEffect, useRef, useState } from "react";
import Input from "../Inputs/Input";

export default function Text(props: TextProps) {
    const { size, weight, align, tag, editable, className, children, ...textProps } = props;
    const classNames = "app-text" + (className ? " " + className : "") + (size ? " size-" + size : "") + (weight ? " weight-" + weight : "") + (align ? " text-align-" + align : "");
    const Tag = tag;

    const initalValue: string = children ? children.toString() : "";
    const [editInProgress, setEditInProgress] = useState(false);
    const [value, setValue] = useState(initalValue);
    const [draftValue, setDraftValue] = useState(initalValue);
    if (editable) {
        const inputRef = useRef<HTMLInputElement>(null);
        
        useEffect(() => {
            if (editInProgress) {
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        }, [editInProgress]);

        function cancelChanges() {
            setEditInProgress(false);
            setDraftValue(value);
        }

        function commitChanges() {
            setEditInProgress(false);
            if (draftValue === "") {
                setEditInProgress(false);
                setDraftValue(value);
            } else {
                setEditInProgress(false);
                setValue(draftValue);
            }
        }

        if (editInProgress) {  
            return (
                <Input
                    ref={inputRef}
                    size="m"
                    type="text"
                    name="editableText"
                    value={draftValue}
                    placeholder="Enter text..."
                    required={true}
                    onChange={(e) => setDraftValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commitChanges();
                        if (e.key === "Escape") cancelChanges();
                    }}
                    onBlur={(e) => { commitChanges(); }}
                />
            );
        }

        return (
            <Tag {...textProps} className={classNames} onClick={() => setEditInProgress(true)}>
                { value }
            </Tag>
        );
    }
    return (
        <Tag {...textProps} className={classNames}>
            { children }
        </Tag>
    );
}