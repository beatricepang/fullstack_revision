import { HomeLoanData } from "@/components/Home_Loan";
import { createContext, useContext, useState, ReactNode } from "react";

export interface HomeLoanDataResults {

    monthlyPayment: number,
    totalPayment: number,
    totalInterest: number,
    breakdown: {
        loanAmount: number,
        term: number,
        baseRate: number,
        adjustedRate: number,
        creditMultiplier: number,
        houseAgeMultiplier: number,
        houseAgeCategory: number,
        termInMonths: number
    }

}

interface HomeLoanHookType {
    fetchData: (formData: HomeLoanData) => Promise<void>;
    loading: boolean;
    results: HomeLoanDataResults | null;
    error: string | null;
    clearResults: () => void;
}

// Create a context
const CustomContextHook = createContext<HomeLoanHookType | undefined>(undefined);

// Context Provider component
export function ContextHookProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<HomeLoanDataResults | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (formData: HomeLoanData) => {
        setLoading(true);
        try {
            const response = await fetch("https://home-loan.matthayward.workers.dev/calculate", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data: HomeLoanDataResults = await response.json();
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
export function useHomeLoanHook() {
    const context: HomeLoanHookType | undefined = useContext(CustomContextHook);
    // Guard clause to ensure hook is used within a Provider
    if (context === undefined) {
        throw new Error("useContextHook must be used within a ContextHookProvider");
    }
    return context;
}
