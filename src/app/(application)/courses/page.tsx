"use client";
import Button from "@/Components/Buttons/Button";
import SegmentedController from "@/Components/Buttons/SegmentedController/SegmentedController";

import { Row, Column} from "@/Components/Containers/Wrappers";

import Accordion from "@/Components/Containers/Accordion/Accordion";
import CourseCard from "@/Components/Containers/Cards/CourseCard/CourseCard";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchJSON from "@/lib/fetchJSON";

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
		<>
			<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="l" fillWidth>
				<Row wrap="wrap" mainAxis="space-around" crossAxis="center" gap="m" fillWidth>
					<Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="xs">
						<h2>Courses</h2>
					</Column>
					<Column wrap="nowrap" mainAxis="end" crossAxis="center" gap="s">
						<Button size="m" icon="search" />
						<Button size="m" icon="plus" href="/courses/create" />
					</Column>
				</Row>

				<SegmentedController
					options={[
						{ label: "My courses", icon: "user" },
						{ label: "All courses", icon: "list" },
					]}
					active={viewCourses}
					onChange={(label: string) => setViewCourses(label as any)}
				/>
			</Column>
			

			{/* status */}
			{activeQuery.isLoading && <p>Loading…</p>}
			{activeQuery.isError && <p>{(activeQuery.error as Error).message}</p>}

			{/* view: My courses */}
			{viewCourses === "My courses" && activeQuery.isSuccess && (
				<Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="m">
					{(enrolledQuery.data ?? []).map((term) => (
						<Accordion
							key={term.id}
							header={<h3>{term.name}</h3>}
							content={
								<Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="m" fillWidth={true}>
									{term.courses.length === 0 ? (
										<h6>No courses</h6>
									) : (
										term.courses.map((course) => (
											<CourseCard key={course.id} course={course} button="arrow-right" />
										))
									)}
								</Column>
							}
							isOpenByDefault={term.name === currentTerm}
						/>
					))}
				</Column>
			)}
			{/* view: All courses */}
			{viewCourses === "All courses" && activeQuery.isSuccess && (
				<Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="m">
					{(allCoursesQuery.data ?? []).map((institution, index) => (
						<Accordion
							key={institution.id}
							header={<h3>{institution.name}</h3>}
							isOpenByDefault={index === 0}
							content={
								<Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="m" fillWidth={true}>
									{institution.courses.length === 0 ? (
										<h6>No courses</h6>
									) : (
										institution.courses.map((course) => (
											<CourseCard key={course.id} course={course} button="badge-plus" />
										))
									)}
								</Column>
							}
						/>
					))}
				</Column>
			)}
		</>
	);
}