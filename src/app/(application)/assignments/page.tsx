"use client";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import AssignmentCard from "@/Components/Containers/Cards/AssignmentCard/AssignmentCard";
import BottomSheet from "@/Components/Containers/BottomSheet/BottomSheet";
import Form from "@/Components/Forms/Form";
import * as Input from "@/Components/Inputs/Input";

import { useQuery } from "@tanstack/react-query";
import fetchJSON from "@/lib/fetchJSON";
import { useState } from "react";


function FilterAssignments() {
	return (
		<>
		</>
	);
}

function SortAssignments() {
	return (
		<>
		</>
	);
}

function CreateAssignment() {
	const currentCoursesQuery = useQuery({
		queryKey: ["current-courses"],
		queryFn: () => fetchJSON<any[]>("/api/courses/current-courses"),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const assignmentTypes = ["Exam", "Quiz", "Reading", "Project", "Presentation"];
	const courseOptions = currentCoursesQuery.data?.map(course => ({ label: course.title, value: course.id })) || [];
	const assignmentTypeOptions = assignmentTypes.map(type => ({ label: type, value: type.toLowerCase() }));

	return (
		<Form process="single-step" action={() => { }}>
			<Input.Text size="l" name="title" placeholder="Title" icon="case-sensitive" required />
			<Input.Text size="l" name="description" placeholder="Description" icon="text-align-start" />
			<Input.Dropdown size="l" name="course" placeholder="Course" icon="apple" options={courseOptions} required />
			<Input.Dropdown size="l" name="type" placeholder="Type" icon="logs" options={assignmentTypeOptions} required />
			<Input.DateTime size="l" name="dueDate" required />
			<Button type="submit" size="l" icon="pencil" text="Create"/>
		</Form>
	);
}

export default function AssignmentsPage() {
	const allAssignmentsQuery = useQuery({
		queryKey: ["all-assignments"],
		queryFn: () => fetchJSON<any[]>("/api/assignments/all-assignments"),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const [sheetOpen, setSheetOpen] = useState(false);
	const [sheetContent, setSheetContent] = useState<"Create Assignment" | "Sort Assignments" | "Filter Assignments" | "">("");

	return (
		<>	
			<Row as="header" wrap="wrap" mainAxis="space-around" crossAxis="center" gap="m" fillWidth>
				<Column wrap="nowrap" mainAxis="start" crossAxis="center" gap="xs">
					<h2>Assignments</h2>
				</Column>
				<Row wrap="nowrap" mainAxis="end" crossAxis="center" gap="s">
					<Button size="m" icon="list-filter" onClick={() => { setSheetContent("Filter Assignments"); setSheetOpen(true);}}/>
					<Button size="m" icon="arrow-up-down" onClick={() => { setSheetContent("Sort Assignments"); setSheetOpen(true); }} />
					<Button size="m" icon="plus" onClick={() => { setSheetContent("Create Assignment"); setSheetOpen(true); }} />
				</Row>
			</Row>
		
			<Column wrap="nowrap" mainAxis="start" crossAxis="start" gap="l">
				{allAssignmentsQuery.data ? (allAssignmentsQuery.data.filter(assignment => true).sort().map((assignment, index) => {
					return (
						<AssignmentCard key={index} assignment={assignment}/>
					);
				})) : (
					<>
						<p>No assignments to be found</p>
					</>
				)}
			</Column>
			<BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title={sheetContent}>
				{sheetContent === "Create Assignment" && <CreateAssignment />}
				{sheetContent === "Sort Assignments" && <SortAssignments />}
				{sheetContent === "Filter Assignments" && <FilterAssignments />}
			</BottomSheet>
		</>
	);
}