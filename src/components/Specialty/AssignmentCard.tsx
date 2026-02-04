import calculateAssignmentCompletionProgress from "@/lib/calcProgress";
import Card from "../Containers/Card/Card";
import Wrapper from "../Containers/Wrapper";
import Button from "../Buttons/Button";
import Chip from "../Containers/Chip/Chip";
import ProgressBar from "../Indicators/ProgressBar/ProgressBar";

export default function AssignmentCard({ assignment }: any) {
    const dueDate = new Date(assignment.due_date);
    const dueDay = new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(dueDate);
    const dueMonth = new Intl.DateTimeFormat("en-us", { month: "short" }).format(dueDate);
    return (
        <Card flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="none" size="l" color="light">
            <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="xl" fillWidth>
                <Wrapper flow="column" wrap="wrap" xAlign="center" yAlign="center" gap="s">
                    <h5>{dueMonth}</h5>
                    <h5>{dueDay}</h5>
                </Wrapper>
                <Wrapper flow="column" wrap="wrap" xAlign="stretch" yAlign="start" gap="m" fillWidth>
                    <Wrapper flow="row" wrap="wrap" xAlign="start" yAlign="center" gap="s">
                        <Chip size="s" color={assignment.course.title}>
                            <label>{assignment.course.code}</label>
                        </Chip>
                        <Chip size="s" color={assignment.type}>
                            <label>{assignment.type}</label>
                        </Chip>
                    </Wrapper>
                    <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="xs">
                        <h5>{assignment.title}</h5>
                        <p>{assignment.description}</p>
                    </Wrapper>
                    <ProgressBar size="xs" color={calculateAssignmentCompletionProgress(assignment).color} progress={calculateAssignmentCompletionProgress(assignment).progress} barText={calculateAssignmentCompletionProgress(assignment).label} />
                </Wrapper>
                <Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="s">
                    <Button size="l" icon="arrow-right" href={"/assignments/" + assignment.id} />
                </Wrapper>
            </Wrapper>
        </Card>
    );
}