import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import Chip from "@/Components/Containers/Chip/Chip";
import AssignmentCard from "@/Components/Containers/Cards/AssignmentCard/AssignmentCard";

import createClient from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { isEnrolled } from "@/lib/auth/isEnrolled";
import { getUser } from "@/lib/auth/getUser";



export default async function CoursePage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;

    const supabase = await createClient();
    const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("id, title, code, description, credit_hours")
        .eq("id", courseId)
        .single();

    if (courseError || !course) return notFound();

    const { data: assignments, error: assignmentsError } = await supabase
        .from("assignments")
        .select("id, type, title, description, due_date, assigned_date, course: courses(id, code, title, description)")
        .eq("course_id", courseId)
        .order("due_date", { ascending: true });

    const isEnrolledInCourse = await isEnrolled(await getUser(), course);

    return (isEnrolledInCourse ? (
        <Column wrap="nowrap" xAlign="start" yAlign="start" gap="xxl" fillHeight>
            <Row wrap="nowrap" xAlign="space-between" yAlign="center" gap="l" fillWidth>
                <Column wrap="nowrap" xAlign="start" yAlign="start" gap="s">
                    <Chip size="m">{course.code}</Chip>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                </Column>
                
                <Row wrap="wrap" xAlign="end" yAlign="center" gap="s">
                    <Button size="m" icon="flag" />
                    <Button size="m" icon="door-open" />
                </Row>
            </Row>
            



            <Column wrap="nowrap" xAlign="start" yAlign="start" gap="m" fillWidth>
                <h3>Assignments</h3>
                {assignments && assignments.map((assignment, index) => (
                    <AssignmentCard key={index} assignment={assignment} />
                ))}

            </Column>
        </Column>
    ) : (
        <Column wrap="nowrap" xAlign="center" yAlign="center" gap="l">
            <Row wrap="nowrap" xAlign="space-between" yAlign="center" gap="l" fillWidth>
                <Column wrap="nowrap" xAlign="start" yAlign="start" gap="s">
                    <Chip size="m">{course.code}</Chip>
                    <h2>{course.title}</h2>
                </Column>

                <Row wrap="nowrap" xAlign="end" yAlign="center" gap="xs">
                    <Button size="m" icon="flag"/>
                    <Button size="m" icon="badge-plus" />
                </Row>
            </Row>
            <p>{course.description}</p>
        </Column>
    ));
}
