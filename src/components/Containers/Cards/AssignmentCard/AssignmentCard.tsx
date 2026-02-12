import calculateAssignmentCompletionProgress from "@/lib/calcProgress";
import Card from "../Card";
import { Row, Column } from "../../Wrappers";
import Button from "../../../Buttons/Button";
import Chip from "../../Chip/Chip";
import ProgressBar from "../../../Indicators/ProgressBar/ProgressBar";

export default function AssignmentCard({ assignment }: any) {
    const dueDate = new Date(assignment.due_date);
    const dueDay = new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(dueDate);
    const dueMonth = new Intl.DateTimeFormat("en-us", { month: "short" }).format(dueDate);
    return (
        <Card size="l" color="light">
            <Row wrap="nowrap" mainAxis="space-between" crossAxis="center" gap="xl" fillWidth>
                {assignment.due_date && (
                    <Column wrap="wrap" mainAxis="center" crossAxis="center" gap="s">
                        <h5>{dueMonth}</h5>
                        <h5>{dueDay}</h5>
                    </Column>
                )}
                <Column wrap="wrap" mainAxis="stretch" crossAxis="start" gap="m" fillWidth>
                    <Row wrap="wrap" mainAxis="start" crossAxis="center" gap="s">
                        {assignment.course && (
                            <Chip size="s" color={assignment.course.title}>
                                <label>{assignment.course.code}</label>
                            </Chip>
                        )}
                        {assignment.type && (
                            <Chip size="s" color={assignment.type}>
                                <label>{assignment.type}</label>
                            </Chip>
                        )}
                    </Row>
                    <Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="xs">
                        {assignment.title && (
                            <h3>{assignment.title}</h3>
                        )}
                        {assignment.description && (
                            <p>{assignment.description}</p>
                        )}
                    </Column>
                    <ProgressBar size="xs" color={calculateAssignmentCompletionProgress(assignment).color} progress={calculateAssignmentCompletionProgress(assignment).progress} barText={calculateAssignmentCompletionProgress(assignment).label} />
                </Column>
                <Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                    {assignment.id && (
                        <Button size="l" icon="arrow-right" href={"/assignments/" + assignment.id} />
                    )}                    
                </Column>
            </Row>
        </Card>
    );
}