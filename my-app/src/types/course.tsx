export interface Course {
    id: string;
    name: string;
    description: string;
}

export const DEFAULT_COURSES: Course[] = [
    { id: "1", name: "Math 101", description: "Basic Mathematics" },
    { id: "2", name: "History 101", description: "World History Overview" },
];