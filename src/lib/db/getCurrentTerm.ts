import createClient from "@/lib/supabase/server";
import { format } from "date-fns";
import getStudentProfile from "./getStudentProfile";

export async function getCurrentTerm(institution_id: string) {
	const today = format(new Date(), "yyyy-MM-dd");
    const supabase = await createClient();
	const { data: term, error } = await supabase
		.from("terms")
		.select("id, name, start_date, end_date")
		.eq("institution_id", institution_id)
		.lte("start_date", today)
		.gte("end_date", today)
		.order("start_date", { ascending: false })
		.limit(1)
		.maybeSingle();
	if (error) {
		return null;
	}
	return term;
}