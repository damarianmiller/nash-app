import Card from "@/Components/Containers/Cards/Card";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";

type Course = {
    id: string;
    title: string;
    code: string;
    credit_hours: number;
}
export default function CourseCard({ course, button }: { course: Course, button?: string }) {
    return (
        <Card>
            <Row wrap="nowrap" mainAxis="space-between" crossAxis="center" gap="xl" fillWidth>
                <Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="s">
                    <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="xl">
                        <h6>{course.code}</h6>
                        <p>{course.credit_hours} Credit Hours</p>
                    </Row>
                    <h5>{course.title}</h5>
                </Column>
                <Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                    <Button size="l" icon={button} variant="push" href={"/courses/" + course.id} />
                </Column>
            </Row>
        </Card>
    );
}