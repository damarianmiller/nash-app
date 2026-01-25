export default function calculateAssignmentCompletionProgress(assignment: any): {progress: string, label: string, color: string} {
    const currentDate = new Date();
    const assignedDate = new Date(assignment.createdOn);
    const dueDate = new Date(assignment.due);

    let daysToComplete = Math.floor((dueDate.getTime() - assignedDate.getTime()) / (1000 * 60 * 60 * 24));
    let daysUntilDue = Math.floor((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysToComplete <= 0 || daysUntilDue <= 0) return { progress: "100%", label: "Overdue!", color: "red"}

    const t = Math.min(1, Math.max(0, (daysUntilDue / daysToComplete)))
    const kShort = Math.log(0.05) / Math.log(0.5);
    const p = 2;
    const k = 1 + (kShort - 1) * Math.pow(2 / daysToComplete, p);
    const fill = 1 - Math.pow(t, k);

    let completionProgressLabel: string;
    if (daysUntilDue < 0) {
        completionProgressLabel = "Overdue!";
    } else if (daysUntilDue < 1) {
        completionProgressLabel = "Due < 24 Hours";
    } else {
        completionProgressLabel = "Due in " + daysUntilDue + " Days";
    }

    let completionProgressColor: string;
    if (daysUntilDue < 3) {
        completionProgressColor = "red"
    } else if (daysUntilDue < 5) {
        completionProgressColor = "yellow";
    } else {
        completionProgressColor = "green";
    }

    return {
        progress: Math.round(fill * 100) + "%",
        label: completionProgressLabel,
        color: completionProgressColor
    };
}