import { Segment } from "motion";
import "./SegmentedController.css";
import Button from "@/Components/Buttons/Button";

type SegmentedControllerProps = {
    options: { label: string; icon: string }[];
    active: string;
    onChange: (label: string) => void;
}

export default function SegmentedController(props: SegmentedControllerProps) {
    const { options, ...segmentedControllerProps } = props;
    const classNames = "app-segmented-controller";
    return (
        <div {...segmentedControllerProps} className={classNames}>
            {options.map((option: any, index: number) => (
                <Button key={index} varient="slab" size="xs" icon={option.icon} text={option.label} active={props.active === option.label} onClick={() => { props.onChange(option.label); }}/>
            ))}
        </div>
    );
}