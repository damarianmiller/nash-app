import "./ProgressBar.css";
import { ProgressBarProps } from "@/Components/Props";
import Container from "@/Components/Containers/Wrapper";
import Text from "@/Components/Text/Text";

export default function ProgressBar(props: ProgressBarProps) {
    const { size, caption, color, progress, barText, className, ...progressBarProps } = props;
    const classNames = "app-progressbar" + (className ? " " + className : "") + (size ? " size-" + size : "");

    const barStyles = {
        width: progress,
    }

    return (
        <div {...progressBarProps} className={classNames}>
            <div className={color ? " color-" + color : ""} style={barStyles}>
                <Text size={size} weight="heavy" tag="label">{barText}</Text>
            </div>
        </div>
    );
}