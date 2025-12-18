import { createClient } from "@/lib/supabase"; // Use your new shared client
import Container from "@/components/Container/Container";
import { redirect } from "next/navigation";

export default async function AssignmentsPage() {
    // 1. Initialize Supabase
    const supabase = await createClient();

    // 2. Get the User (Security Check)
    // We double-check here even though Middleware did it, just to get the ID safely
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // 3. Fetch Assignments
    // We assume you have a foreign key linking 'assignments.student_id' to 'students.id'
    // OR 'assignments.user_id' linked to auth.users. 
    // Adjust the query below based on your actual table columns!
    const { data: assignments, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true });

    if (error) {
        console.error("Error fetching assignments:", error);
        return <div>Error loading assignments. Please try again.</div>;
    }

    return (
        <Container flow="column" gap="m" mainAxisAlign="center" crossAxisAlign="center">
            <h1>My Assignments</h1>

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