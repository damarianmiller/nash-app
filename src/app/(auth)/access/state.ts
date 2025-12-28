export type AuthenticationState = {
	status: "awaitingInput" | "inProgress" | "authenticated" | "error";
	error: string | undefined;
};

export const initialAuthenticationState: AuthenticationState = {
	status: "awaitingInput",
	error: undefined,
};

export type RegistrationState = {
    status: "awaitingInput" | "registering" | "success" | "error";
    error: string | undefined;
}; 

export const initialRegistrationState: RegistrationState = {
    status: "awaitingInput",
    error: undefined,
};