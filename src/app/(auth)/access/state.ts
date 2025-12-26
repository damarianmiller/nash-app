export type AuthenticationState = {
    status: "awaitingInput" | "sent" | "success" |"error";
    error: string | undefined;
};

export const initialAuthenticationState: AuthenticationState = {
    status: "awaitingInput",
    error: undefined,
};