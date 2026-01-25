import Card from "@/Components/Containers/Card/Card";
import Chip from "@/Components/Containers/Chip/Chip";
import Wrapper from "@/Components/Containers/Wrapper";
import Text from "@/Components/Text/Text";
import { assignments } from "../assignments";
import calculateAssignmentCompletionProgress from "../calcProgress";
import ProgressBar from "@/Components/Indicators/ProgressBar/ProgressBar";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";


interface PageProps {
    params: {
        assignmentId:string
    }
}

export default async function Assignment({params}: PageProps) {
    const { assignmentId }  = await params;
    const assignment = assignments.filter(assignment => assignment.id.toString() === assignmentId)[0];

    const completionProgress = calculateAssignmentCompletionProgress(assignment)

    const dueDate = parseISO(assignment.due);

    return (
        <Wrapper flow="column" wrap="wrap" xAlign="start" yAlign="center" gap="xl">
            <Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="xs">
                <Chip size="m" curve="rounded" color={assignment.course.color}>
                    <label>{assignment.course.code}</label>
                </Chip>
                <Chip size="m" curve="rounded" color={assignment.type.color}>
                    <label>{assignment.type.name}</label>
                </Chip>
            </Wrapper>
            <Text tag="h2" editable={true}>{assignment.title}</Text>
            
            <Card>
                <Text tag="p" editable={true}>{assignment.description}</Text>
            </Card>


        </Wrapper>
    );
}




/*




*/