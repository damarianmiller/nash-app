import "./BottomSheet.css";
import { BottomSheetProps } from "@/Components/Types";
import { Row, Column} from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";

export default function BottomSheet(props: BottomSheetProps) {
    const { isOpen, onClose, title, className, style, children, ...bottomSheetProps } = props;
    const classNames = "app-bottomsheet " +
    (className ? className : "");
    
    const hide = isOpen ? "" : " hidden";
    const styles  = {
        ...style,
        height: isOpen ? "75%" : "0",
    }

    return (
        <>
            <div className={"app-bottomsheet-backdrop" + hide} onClick={onClose} />

            <Column {...bottomSheetProps} className={classNames} style={styles} as="section" wrap="nowrap" mainAxis="start" crossAxis="center" gap="xxl" fillWidth>
                <Row as="header" wrap="nowrap" mainAxis="space-between" crossAxis="center" gap="m" fillWidth>
                    <h2>{title}</h2>
                    <Button size="m" icon="x" variant="push" onClick={onClose} />
                </Row>
                {children}
            </Column>  
        </>    
    );
}