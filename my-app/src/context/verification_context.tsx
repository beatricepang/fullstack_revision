import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, DEFAULT_USERS } from "../types/user";
import { Course, DEFAULT_COURSES } from "../types/course";


interface VerificationContextType {
    currentUser: User | null;
    users: User[];
    login: (email: string, password: string) => User | null;
    logout: () => void;
    courses: Course[];
    setCurrentUser: (user: User | null) => void;
    setUsers: (users: User[]) => void;
    setCourses: (courses: Course[]) => void;
}

// Create a context
const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

// Context Provider component
export function VerificationProvider({ children }: { children: ReactNode }) {
    // Global state: logged-in user, all users, all courses
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    // Load data from localStorage on component mount
    useEffect(() => {
        // Initialize users from localStorage or use defaults
        const storedUsers: string | null = localStorage.getItem("users");
        if (!storedUsers || storedUsers.length === 0) {
            // If no users are found in localStorage, set default users
            localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
            setUsers(DEFAULT_USERS);
        }
        else {
            setUsers(JSON.parse(storedUsers));
        }

        // Initialize courses from localStorage or use defaults
        const storedCourses: string | null = localStorage.getItem("courses");
        if (!storedCourses || storedCourses.length === 0) {
            // If no courses are found in localStorage, set default courses
            localStorage.setItem("courses", JSON.stringify(DEFAULT_COURSES));
            setCourses(DEFAULT_COURSES);
        }
        else {
            setCourses(JSON.parse(storedCourses));
        }

        // Check for existing logged-in user in localStorage
        // If a user is found, set it as the current user
        const storedUser: string | null = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    // Save users, courses, and currentUser to localStorage when they change
    // ie, sync the state with localStorage
    useEffect(() => {
        if (users && users.length > 0) {
            localStorage.setItem("users", JSON.stringify(users));
        }

        if (courses && courses.length > 0) {
            localStorage.setItem("courses", JSON.stringify(courses));
        }

        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
    }, [users, courses, currentUser]);

    // Handles user sign in logic
    const login = (email: string, password: string): User | null => {
        const foundUser: User | undefined = users.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            setCurrentUser(foundUser);
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            return foundUser;
        }
        return null;
    };

    // Handles user sign out logic
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        // Returns provider functions to any component that calls useVerificationContext()
        <VerificationContext.Provider value={{ currentUser, users, login, logout, courses, setCurrentUser, setUsers, setCourses }}>
            {children}
        </VerificationContext.Provider>
    );
}

// Hook to access the verification context
export function useVerificationContext() {
    const context: VerificationContextType | undefined = useContext(VerificationContext);
    // Guard clause to ensure hook is used within a Provider
    if (context === undefined) {
        throw new Error("useVerification must be used within a VerificationProvider");
    }
    return context;
}
