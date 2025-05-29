import { PetFormData } from "@/components/QueryForm";
import { createContext, useContext, useState, ReactNode } from "react";

export interface PetInsuranceResults {
    totalPremium: number;
    breakdown: {
        basePremium: number;
        ageAdjustment: number;
        preExistingConditionsAdjustment: number;
        coverageLevelAdjustment: number;
    }
}

interface CustomContextHookType {
    fetchData: (formData: PetFormData) => Promise<void>;
    loading: boolean;
    results: PetInsuranceResults | null;
    error: string | null;
    clearResults: () => void;
}

// Create a context
const CustomContextHook = createContext<CustomContextHookType | undefined>(undefined);

// Context Provider component
export function ContextHookProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<PetInsuranceResults | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (formData: PetFormData) => {
        setLoading(true);
        try {
            const response = await fetch("https://pet-insurance.matthayward.workers.dev/calculate", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data: PetInsuranceResults = await response.json();
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setResults(null);
        } finally {
            setLoading(false);
        }
    }

    const clearResults = () => {
        setResults(null);
        setError(null);
        setLoading(false);
    }

    return (
        // Returns provider functions to any component that calls useContextHook
        <CustomContextHook.Provider value={{ fetchData, loading, results, error, clearResults }}>
            {children}
        </CustomContextHook.Provider>
    );
}

// Hook to access the context hook context
export function useCustomContextHook() {
    const context: CustomContextHookType | undefined = useContext(CustomContextHook);
    // Guard clause to ensure hook is used within a Provider
    if (context === undefined) {
        throw new Error("useContextHook must be used within a ContextHookProvider");
    }
    return context;
}
