import "./BottomSheet.css";
import { BottomSheetProps } from "@/Components/Types";
import { Row, Column} from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";

export default function BottomSheet(props: BottomSheetProps) {
    const { isOpen, onClose, title, className, children, ...bottomSheetProps } = props;
    const classNames = "app-bottomsheet " +
    (className ? className : "") +
    (isOpen ? "" : " hidden");
    
    const hide = isOpen ? "" : " hidden";

    return (
        <Column as="header" className="app-bottomsheet" wrap="nowrap" mainAxis="center" crossAxis="center" gap="xxl" fillWidth>
            <div className={"app-bottomsheet-backdrop" + hide} onClick={onClose} />
            
            <div {...bottomSheetProps} className={"app-bottomsheet-content" + hide}>
                    <Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="xxl" fillWidth>

                        <Button size="m" icon="x" onClick={onClose} />
                    </Row>        
                {children}
            </div>
        </Column>            
    );
}