import Wrapper from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import { eachDayOfInterval, subDays, addDays, getDate } from "date-fns";

export default function WeekdaySelector() {
    const today = new Date();

    const weekStart = subDays(today, 3);
    const weekEnd = addDays(today, 3);
    const currentWeek = eachDayOfInterval({
        start: weekStart,
        end: weekEnd
    });

    return (
        <Wrapper className="daySelector" flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="xl" fillWidth>
            {currentWeek.map((date, index) => (
                <Button
                    key={index}
                    size="m"
                    variant="inline"
                    text={date.getDate().toString()}
                    active={getDate(today) === getDate(date)}
                    />
            ))}
        </Wrapper>
    );
}