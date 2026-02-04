"use client";
import Wrapper from "@/Components/Containers/Wrapper";
import Button from "@/Components/Buttons/Button";

import AssignmentCard from "@/Components/Specialty/AssignmentCard";
import { useQuery } from "@tanstack/react-query";

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const body = await res.json().catch(() => null);
    if (!res.ok) {
        const message =
            (body && (body.error || body.message)) || `Request failed (${res.status})`;
        throw new Error(message);
    }
    return body as T;
}


export default function AssignmentsPage() {
    const allAssignmentsQuery = useQuery({
        queryKey: ["all-assignments"],
        queryFn: () => fetchJSON<any[]>("/api/assignments/all-assignments"),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return (
        <Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="start" gap="xxl" fillWidth fillHeight>
            {/* Header Section */}
            <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="m" fillWidth>
                <Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="xxl" fillWidth>
                    <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="xs">
                        <h2>Assignments</h2>
                        <Wrapper flow="column" wrap="wrap" xAlign="start" yAlign="center" gap="s">
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

                {/* Add Options Here */}
            </Wrapper>
            {/* End Header Section */}

            <Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="l">
                {allAssignmentsQuery.data ? (allAssignmentsQuery.data.filter(assignment => true).sort().map((assignment, index) => {
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