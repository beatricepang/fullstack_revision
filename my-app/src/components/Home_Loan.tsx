import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    useToast,
    Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHomeLoanHook } from "../context/HomeLoanHook";

export interface HomeLoanData {
    loanType: string;
    loanAmount: number;
    term: number;
    creditScore: string;
    houseAge: number;
}

export default function Home_Loan() {
    const toast = useToast();
    const { fetchData, loading, results, error, clearResults } = useHomeLoanHook();

    const [HomeLoanData, setFormData] = useState<HomeLoanData>({
        loanType: "Fixed Rate",
        loanAmount: 0,
        term: 1,
        creditScore: "Excellent",
        houseAge: 0,
    });

    const [errors, setErrors] = useState({
        loanType: "",
        loanAmount: "",
        term: "",
        creditScore: "",
        houseAge: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({
            loanType: "",
            loanAmount: "",
            term: "",
            creditScore: "",
            houseAge: "",
        });

        let hasErrors = false;

        if (HomeLoanData.loanAmount <= 0) {
            setErrors((prev) => ({ ...prev, loanAmount: "Please enter a valid loan amount" }));
            hasErrors = true;
        }

        if (HomeLoanData.term <= 0) {
            setErrors((prev) => ({ ...prev, term: "Enter a valid term" }));
            hasErrors = true;
        }

        if (hasErrors) {
            clearResults();
            toast({
                title: "Form submission failed",
                description: "Please fix the errors before submitting",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: "Form submitted!",
            description: "Thank you for your submission",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        fetchData(HomeLoanData);
    };

    return (
        <Box p={8} maxW="500px" mx="auto">
            <VStack spacing={8} align="stretch">
                <Heading textAlign="center">Query Form</Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="loanType">Loan Type</FormLabel>
                            <Select
                                id="loanType"
                                name="loanType"
                                value={HomeLoanData.loanType}
                                onChange={(e) => setFormData({ ...HomeLoanData, loanType: e.target.value })}
                            >
                                <option value="Fixed Rate">Fixed Rate</option>
                                <option value="Variable Rate">Variable Rate</option>
                                <option value="Interest Only">Interest Only</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
                            <Input
                                id="loanAmount"
                                name="loanAmount"
                                type="number"
                                value={HomeLoanData.loanAmount}
                                onChange={(e) =>
                                    setFormData({ ...HomeLoanData, loanAmount: parseInt(e.target.value) })
                                }
                            />
                            {errors.loanAmount && <Text color="red.500" fontSize="sm">{errors.loanAmount}</Text>}
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="term">Term (Years)</FormLabel>
                            <Input
                                id="term"
                                name="term"
                                type="number"
                                value={HomeLoanData.term}
                                onChange={(e) =>
                                    setFormData({ ...HomeLoanData, term: parseInt(e.target.value) })
                                }
                            />
                            {errors.term && <Text color="red.500" fontSize="sm">{errors.term}</Text>}
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="creditScore">Credit Score</FormLabel>
                            <Select
                                id="creditScore"
                                name="creditScore"
                                value={HomeLoanData.creditScore}
                                onChange={(e) => setFormData({ ...HomeLoanData, creditScore: e.target.value })}
                            >
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="houseAge">House Age</FormLabel>
                            <Select
                                id="houseAge"
                                name="houseAge"
                                value={HomeLoanData.houseAge}
                                onChange={(e) =>
                                    setFormData({ ...HomeLoanData, houseAge: Number(e.target.value) })
                                }
                            >
                                <option value={0}>New</option>
                                <option value={1}>1-10</option>
                                <option value={11}>11-30</option>
                                <option value={31}>31-50</option>
                                <option value={51}>50+</option>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            width="100%"
                            mt={4}
                            data-testid="submit-button"
                            isLoading={loading}
                        >
                            Submit
                        </Button>
                    </VStack>
                </form>

                {error && (
                    <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="red.50">
                        <Text color="red.600">Error: {error}</Text>
                    </Box>
                )}

                {results && (
                    <Box mt={6} p={4} borderWidth={1} borderRadius="md">
                        <Heading size="lg" data-testid="result-heading">Monthly Payment: ${results.monthlyPayment}</Heading>
                        <Heading size="lg">Total Payment: ${results.totalPayment}</Heading>
                        <Heading size="lg">Total Interest: ${results.totalInterest}</Heading>

                        <Heading size="md" mt={6} mb={2}>Breakdown:</Heading>
                        <Text data-testid="result1">Loan Amount: ${results.breakdown.loanAmount}</Text>
                        <Text data-testid="result2">Term (Years): {results.breakdown.term}</Text>
                        <Text data-testid="result3">Base Rate: {results.breakdown.baseRate}</Text>
                        <Text data-testid="result4">Adjusted Rate: {results.breakdown.adjustedRate}</Text>
                        <Text data-testid="result5">Credit Multiplier: {results.breakdown.creditMultiplier}</Text>
                        <Text data-testid="result6">House Age Multiplier: {results.breakdown.houseAgeMultiplier}</Text>
                        <Text data-testid="result7">House Age Category: {results.breakdown.houseAgeCategory}</Text>
                        <Text data-testid="result8">Term In Months: {results.breakdown.termInMonths}</Text>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
