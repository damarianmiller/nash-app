import { createClient } from "@/lib/supabase/server";
import Container from "@/components/Container/Container";
import { redirect } from "next/navigation";
import Button from "@/components/Button/Button";

export default async function AssignmentsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/access");
    }
    const { data: assignments, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true });

    if (error) {
        console.error("Error fetching assignments:", error);
    }

    return (
        <Container flow="column" gap="m" mainAxisAlign="start" crossAxisAlign="start">
            <Container flow="row" mainAxisAlign="space-between" crossAxisAlign="center" gap="s">
                <h2>Assignments</h2>
                <Container flow="row" mainAxisAlign="space-between" crossAxisAlign="center" gap="s">
                    <Button icon={["list-filter", 20]} label="Filter" />
                    <Button icon={["arrow-up-down", 20]} label="Sort" />
                </Container>
            </Container>

            {/* 4. Empty State */}
            {(!assignments || assignments.length === 0) && (
                <div style={{ padding: "2rem", textAlign: "center", background: "#f5f5f5", borderRadius: "8px" }}>
                    <p>You have no assignments yet! Time to relax. 🏝️</p>
                </div>
            )}

            {/* 5. The List */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {assignments?.map((assignment) => (
                    <div
                        key={assignment.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "1rem",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <div>
                            <h3>{assignment.title}</h3>
                            <p style={{ color: "#666", fontSize: "0.9rem" }}>
                                Due: {new Date(assignment.due_date).toLocaleDateString()}
                            </p>
                        </div>
                        <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            background: assignment.status === 'Completed' ? '#d4edda' : '#fff3cd',
                            color: assignment.status === 'Completed' ? '#155724' : '#856404',
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                        }}>
                            {assignment.status || 'Pending'}
                        </span>
                    </div>
                ))}
            </div>
        </Container>
    );
}