"use client";
import Button from "@/Components/Buttons/Button";
import SegmentedController from "@/Components/Buttons/SegmentedController/SegmentedController";
import Text from "@/Components/Text/Text";
import Wrapper from "@/Components/Containers/Wrapper";
import Accordion from "@/Components/Containers/Accordion/Accordion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@/Components/Containers/Card/Card";

type Course = {
	id: string;
	title: string;
	code: string;
	description: string;
	credit_hours: number;
};

type Term = {
	id: string;
	name: string;
	start_date: string;
	end_date: string;
	courses: Course[];
};

type Institution = {
	id: string;
	name: string;
	slug: string;
	courses: Course[];
}

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



function CourseCard({ course, button }: { course: Course, button?: string }) {
	return (
		<Card flow="column" wrap="nowrap" xAlign="start" yAlign="start" gap="s" size="m" fillWidth={true}>
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





export default function CoursesPage() {
	const [viewCourses, setViewCourses] = useState<"My courses" | "All courses">("My courses");
	const currentTerm = "Spring 2026";

	const enrolledQuery = useQuery({
		queryKey: ["courses", "enrolled"],
		queryFn: () => fetchJSON<Term[]>("/api/courses/enrolled-courses"),
		enabled: viewCourses === "My courses", // only fetch when tab is active
		staleTime: 1000 * 60 * 10, // 10 min "caching is fine"
	});

	const allCoursesQuery = useQuery({
		queryKey: ["courses", "all"],
		queryFn: () => fetchJSON<Institution[]>("/api/courses/all-courses"),
		enabled: viewCourses === "All courses",
		staleTime: 1000 * 60 * 10,
	});

	const activeQuery = viewCourses === "My courses" ? enrolledQuery : allCoursesQuery;

	return (
		<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="start" gap="xxl" fillWidth fillHeight>
			{/* Header Section */}
			<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="m" fillWidth>
				<Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="xxl" fillWidth>
					<Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="xs">
						<Text tag="h2">Courses</Text>
					</Wrapper>
					<Wrapper flow="row" wrap="nowrap" xAlign="end" yAlign="center" gap="s">
						<Button size="m" icon="search" />
						<Button size="m" icon="plus" href="/courses/create" />
					</Wrapper>
				</Wrapper>
				<SegmentedController
					options={[
						{ label: "My courses", icon: "user" },
						{ label: "All courses", icon: "list" },
					]}
					active={viewCourses}
					onChange={(label: string) => setViewCourses(label as any)}
				/>
			</Wrapper>
			{/* End Header Section */}

			{/* status */}
			{activeQuery.isLoading && <Text tag="p">Loading…</Text>}
			{activeQuery.isError && <Text tag="p">{(activeQuery.error as Error).message}</Text>}

			{/* view: My courses */}
			{viewCourses === "My courses" && activeQuery.isSuccess && (
				<Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="m">
					{(enrolledQuery.data ?? []).map((term) => (
						<Accordion
							key={term.id}
							header={<Text tag="h3">{term.name}</Text>}
							content={
								<Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="center" gap="m" fillWidth={true}>
									{term.courses.length === 0 ? (
										<Text tag="h6">No courses</Text>
									) : (
										term.courses.map((course) => (
											<CourseCard key={course.id} course={course} button="arrow-right" />
										))
									)}
								</Wrapper>
							}
							defaultOpen={term.name === currentTerm}
						/>
					))}
				</Wrapper>
			)}
			{/* view: All courses */}
			{viewCourses === "All courses" && activeQuery.isSuccess && (
				<Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="m">
					{(allCoursesQuery.data ?? []).map((institution) => (
						<Accordion
							key={institution.id}
							header={<Text tag="h3">{institution.name}</Text>}
							content={
								<Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="center" gap="m" fillWidth={true}>
									{institution.courses.length === 0 ? (
										<Text tag="h6">No courses</Text>
									) : (
										institution.courses.map((course) => (
											<CourseCard key={course.id} course={course} button="badge-plus" />
										))
									)}
								</Wrapper>
							}
						/>
					))}
				</Wrapper>
			)}
		</Wrapper>
	);
}