import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import Wrapper from "@/Components/Containers/Wrapper";
import Button from "@/Components/Buttons/Button";
import Chip from "@/Components/Containers/Chip/Chip";
import Card from "@/Components/Containers/Card/Card";
import ProgressBar from "@/Components/Indicators/ProgressBar/ProgressBar";



import {assignments} from "./assignments";
import calculateAssignmentCompletionProgress from "./calcProgress";

function AssignmentCard({ assignment }: any) {
    const dueDate = new Date(assignment.due);
    const dueDay = new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(dueDate);
    const dueMonth = new Intl.DateTimeFormat("en-us", { month: "short" }).format(dueDate);
    return (
        <Card flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="none" size="l" color="light">
            <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="xl">
                <Wrapper flow="column" wrap="wrap" xAlign="center" yAlign="center" gap="s">
                    <h5>{dueMonth}</h5>
                    <h5>{dueDay}</h5>
                </Wrapper>
                <Wrapper flow="column" wrap="wrap" xAlign="stretch" yAlign="start" gap="m" fill={true}>
                    <Wrapper flow="row" wrap="wrap" xAlign="start" yAlign="center" gap="s">
                        <Chip size="s" color={assignment.course.color}>
                            <label>{assignment.course.code}</label>
                        </Chip>
                        <Chip size="s" color={assignment.type.color}>
                            <label>{assignment.type.name}</label>
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

export default function AssignmentsPage() {
    return (
        <Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="m">
            <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="s">
                <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="xs">
                    <h2>Assignments</h2>
                    <Wrapper flow="row" wrap="wrap" xAlign="start" yAlign="center" gap="s">
                        <p>Viewing all assignments.</p>
                        <p>Sorted by due date.</p>
                    </Wrapper>
                </Wrapper>
                <Wrapper flow="row" wrap="nowrap" xAlign="end" yAlign="center" gap="s">
                    <Button size="m" icon="list-filter" />
                    <Button size="m" icon="arrow-up-down" />
                    <Button size="m" icon="plus" href="/assignments/create" />
                </Wrapper>
            </Wrapper>
            <Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="l">
                {assignments ? (assignments.filter(assignment => true).sort().map((assignment, index) => {
                    return (
                        <AssignmentCard key={index} assignment={assignment}/>
                    );
                })) : (
                    <>
                        <p>No assignments to be found</p>
                    </>
                )}
            </Wrapper>
        </Wrapper>
    );
}