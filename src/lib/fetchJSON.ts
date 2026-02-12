export default async function fetchJSON<T>(url: string): Promise<T> {
	const res = await fetch(url);
	const body = await res.json().catch(() => null);
	if (!res.ok) {
		const message =
			(body && (body.error || body.message)) ||
			`Request failed (${res.status})`;
		throw new Error(message);
	}
	return body as T;
}
