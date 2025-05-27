export interface User {
    email: string;
    password: string;
}

export const DEFAULT_USERS: User[] = [
    { email: "JohnDoe01@gmail.com", password: "securePassword123" },
];