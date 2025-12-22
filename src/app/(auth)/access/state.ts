export type LoginState = {
    status: "waiting" | "sent" | "success" |"error";
    message: string;
    error?: string;
    fieldErrors?: {
        email?: string;
    }
};

export const initialLoginState: LoginState = {
    status: "waiting",
    message: "",
};