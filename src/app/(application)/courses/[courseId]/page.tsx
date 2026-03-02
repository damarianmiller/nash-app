import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import Chip from "@/Components/Containers/Chip/Chip";
import Card from "@/Components/Containers/Cards/Card";
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

    const enrolled = false;

    if (enrolled) {
        return (
            <>
                <Column as="header" wrap="nowrap" mainAxis="center" crossAxis="start" gap="l" fillWidth>
                    <Row wrap="wrap" mainAxis="space-between" crossAxis="center" gap="m" fillWidth>
                        <Column wrap="nowrap" mainAxis="center" crossAxis="start" gap="xs">
                            <Chip>{course.code}</Chip>
                            <h2>{course.title}</h2>
                        </Column>
                        <Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                            <Button size="m" icon="flag" variant="push" />
                            <Button size="m" icon="badge-plus" variant="push" />
                        </Row>
                    </Row>
                    <p>{course.description}</p>
                </Column>
            </>
        );
    }
    return (
        <>
            <Column as="header" wrap="nowrap" mainAxis="center" crossAxis="start" gap="l" fillWidth>
                <Row wrap="wrap" mainAxis="space-between" crossAxis="center" gap="m" fillWidth>
                    <Column wrap="nowrap" mainAxis="center" crossAxis="start" gap="xs">
                        <Chip>{course.code}</Chip>
                        <h2>{course.title}</h2>                        
                    </Column>
                    <Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                        <Button size="m" icon="flag" variant="push" />
                        <Button size="m" icon="badge-plus" variant="push" />
                    </Row>
                </Row>
                <p>{course.description}</p>
            </Column>

            <Column as="section" wrap="nowrap" mainAxis="center" crossAxis="stretch" gap="m" fillWidth>
                <Card>
                    <h4>Students</h4>
                    <Button size="m" icon="badge-plus" text="Join Course" variant="push" />
                </Card>
                
            </Column>
            
        </>
    );
}
