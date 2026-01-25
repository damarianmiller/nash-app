"use client";
import Button from "@/Components/Buttons/Button";
import SegmentedController from "@/Components/Buttons/SegmentedController/SegmentedController";
import Text from "@/Components/Text/Text";
import Wrapper from "@/Components/Containers/Wrapper";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase/client";
import Card from "@/Components/Containers/Card/Card";


export default function CoursesPage() {
    const [viewCourses, setViewCourses] = useState("My courses");
    const courseViews = [{ label: "My courses", icon: "user" }, { label: "All courses", icon: "list" }];


    return (
        <Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="start" gap="xxl" fillHeight={true} fillWidth={true}>
            <Wrapper flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="s" fillWidth={true}>
                <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="xs">
                    <Text tag="h2">Courses</Text>
                </Wrapper>
                <Wrapper flow="row" wrap="nowrap" xAlign="end" yAlign="center" gap="s">
                    <Button size="m" icon="search" />
                    <Button size="m" icon="plus" href="/courses/create" />
                </Wrapper>
            </Wrapper>
            <SegmentedController
            options={courseViews}
            active={viewCourses}
            onChange={(label: string) => setViewCourses(label)}
            />

            <Wrapper flow="column" wrap="nowrap" xAlign="stretch" yAlign="start" gap="m">
                {viewCourses === "My courses" ? (
                    
                    <>
                        <Text tag="p">Displaying my courses...</Text>
                    </>
                ) : (
                    courses.map((course) => (
                        <Card key={course.id} flow="row" wrap="nowrap" xAlign="space-between" yAlign="center" gap="xl" size="m">                        
                            <Wrapper flow="column" wrap="nowrap" xAlign="start" yAlign="center" gap="l"> 
                                <Wrapper flow="row" wrap="nowrap" xAlign="start" yAlign="center" gap="xl">
                                    <Text tag="h3">{course.code}</Text>
                                    <Text tag="h6">{course.credit_hours} credits</Text>
                                </Wrapper>       
                                
                                <Text tag="h5">{course.title}</Text>
                                <Text tag="p">{course.description}</Text>
                            </Wrapper>
                            <Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="s">
                                <Button size="m" icon="badge-plus" />
                            </Wrapper>
                        </Card>
                    ))
                )}
            </Wrapper>
        </Wrapper>
    );
}