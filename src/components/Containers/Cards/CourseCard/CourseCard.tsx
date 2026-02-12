import Card from "@/Components/Containers/Cards/Card";
import Wrapper from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import Text from "@/Components/Text/Text";

type Course = {
    id: string;
    title: string;
    code: string;
    credit_hours: number;
}
export default function CourseCard({ course, button }: { course: Course, button?: string }) {
    return (
        <Card size="m">
            <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="xl" fillWidth={true}>
                <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="s">
                    <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="xl">
                        <Text tag="h6">{course.code}</Text>
                        <Text tag="p">{course.credit_hours} Credit Hours</Text>
                    </Wrapper>
                    <Text tag="h5">{course.title}</Text>
                </Wrapper>
                <Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="s">
                    <Button size="l" icon={button} href={"/courses/" + course.id} />
                </Wrapper>
            </Wrapper>
        </Card>
    );
}