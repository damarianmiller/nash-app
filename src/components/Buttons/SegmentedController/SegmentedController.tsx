import "./SegmentedController.css";
import { SegmentedControllerProps } from "@/Components/Types";
import { Row } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";

export default function SegmentedController(props: SegmentedControllerProps) {
    const { options, active, className, ...segmentedControllerProps } = props;
    const classNames =
        "app-segmented-controller" +
        (className ? " " + className : "");
    return (
        <Row {...segmentedControllerProps} className={classNames} wrap="nowrap" mainAxis="center" crossAxis="center" gap="xs">
            {options.map((option: any, index: number) => (
                <Button key={index} variant="slab" size="xs" icon={option.icon} text={option.label} active={active === option.label} onClick={() => { props.onChange(option.label); }}/>
            ))}
        </Row>
    );
}