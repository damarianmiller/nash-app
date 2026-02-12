import "./ProgressBar.css";
import { ProgressBarProps } from "@/Components/Types";
import Container from "@/Components/Containers/Wrappers";


export default function ProgressBar(props: ProgressBarProps) {
    const { size, caption, color, progress, barText, className, ...progressBarProps } = props;
    const classNames = "app-progressbar" + (className ? " " + className : "") + (size ? " size-" + size : "");

    const barStyles = {
        width: progress,
    }

    return (
        <div {...progressBarProps} className={classNames}>
            <div className={color ? " color-" + color : ""} style={barStyles}>
                <label>{barText}</label>
            </div>
        </div>
    );
}