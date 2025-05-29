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
import { useCustomContextHook } from "../context/CustomContextHook";

export interface PetFormData {
  breed: string;
  age: number;
  hasPreExistingConditions: boolean;
  coverageLevel: string;
}

export default function QueryForm() {
  const toast = useToast();
  const { fetchData, loading, results, error, clearResults } = useCustomContextHook();

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: "Error fetching results",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } else if (results) {
  //     toast({
  //       title: "Results fetched successfully!",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // }, [error, results, toast]);


  const [formData, setFormData] = useState<PetFormData>({
    breed: "Labrador Retriever",
    age: 0,
    hasPreExistingConditions: false,
    coverageLevel: "basic",
  });


  const [errors, setErrors] = useState({
    breed: "",
    age: "",
    hasPreExistingConditions: "",
    coverageLevel: "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      breed: "",
      age: "",
      hasPreExistingConditions: "",
      coverageLevel: "",
    });

    let hasErrors = false;

    // // Validate breed
    // if (!formData.breed) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     breed: "Please select a breed",
    //   }));
    //   hasErrors = true;
    // }

    // Validate age
    // if (!formData.age || formData.age <= 0) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     age: "Please enter a valid age",
    //   }));
    //   hasErrors = true;
    // }

    // Validate age
    if (formData.age < 0) {
      setErrors((prev) => ({
        ...prev,
        age: "Please enter a valid age",
      }));
      hasErrors = true;
    }

    // if (formData.hasPreExistingConditions === null) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     hasPreExistingConditions: "Please indicate if there are any pre-existing conditions",
    //   }));
    //   hasErrors = true;
    // }

    // Validate coverage level
    // if (!formData.coverageLevel) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     coverageLevel: "Please select a coverage level",
    //   }));
    //   hasErrors = true;
    // }

    // If there are validation errors, do not submit the form}
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
    else {
      toast({
        title: "Form submitted!",
        description: "Thank you for your submission",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Form data:", formData);
      fetchData(formData)

    }
  };

  return (
    <Box p={8} maxW="500px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Query Form</Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>

            <FormControl isRequired>
              <FormLabel htmlFor="breed">Breed</FormLabel>
              <Select
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                aria-label="Breed"
              >
                <option value="Labrador Retriever">Labrador Retriever</option>
                <option value="German Shepherd">German Shepherd</option>
                <option value="Golden Retriever">Golden Retriever</option>
                <option value="French Bulldog">French Bulldog</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Poodle">Poodle</option>
                <option value="Beagle">Beagle</option>
                <option value="Rottweiler">Rottweiler</option>
                <option value="Dachshund">Dachshund</option>
                <option value="Yorkshire Terrier">Yorkshire Terrier</option>
              </Select>
              {/* {errors.breed && (
                <Text color="red.500" fontSize="sm">
                  {errors.breed}
                </Text>
              )} */}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="age">Age</FormLabel>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                aria-label="Age"
              />
              {errors.age && (
                <Text color="red.500" fontSize="sm">
                  {errors.age}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="preexistingConditions">Prexisting Conditions</FormLabel>
              <Select
                id="preexistingConditions"
                name="preexistingConditions"
                value={formData.hasPreExistingConditions ? "true" : "false"}
                onChange={(e) =>
                  setFormData({ ...formData, hasPreExistingConditions: e.target.value === "true" })
                }
                aria-label="PreexistingConditions"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
              {/* {errors.hasPreExistingConditions && (
                <Text color="red.500" fontSize="sm">
                  {errors.hasPreExistingConditions}
                </Text>
              )} */}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="coverageLevel">Coverage Level</FormLabel>
              <Select
                id="coverageLevel"
                name="coverageLevel"
                value={formData.coverageLevel}
                onChange={(e) =>
                  setFormData({ ...formData, coverageLevel: e.target.value })
                }
                aria-label="CoverageLevel"
              >
                <option value="basic">basic</option>
                <option value="standard">standard</option>
                <option value="premium">premium</option>
              </Select>
              {/* {errors.coverageLevel && (
                <Text color="red.500" fontSize="sm">
                  {errors.coverageLevel}
                </Text>
              )} */}
            </FormControl>

            <Button type="submit" colorScheme="blue" width="100%" mt={4} data-testid="submit-button">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </VStack>
        </form>
        {error ? (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="red.50">
            <Text color="red.600">Error: {error}</Text>
          </Box>
        ) : results && (
          <Box mt={6} p={4} borderWidth={1} borderRadius="md">
            <Heading size="lg" data-testid="result-heading">Total Premium: ${results.totalPremium}</Heading>
            <Heading size="md" mt={6} mb={1} data-testid="result-subheading">Breakdown:</Heading>
            <Text mb={1} data-testid="result1">Base Premium: ${results.breakdown.basePremium}</Text>
            <Text mb={1} data-testid="result2">Age Adjustment: ${results.breakdown.ageAdjustment}</Text>
            <Text mb={1} data-testid="result3">Pre-existing Conditions Adjustment: ${results.breakdown.preExistingConditionsAdjustment}</Text>
            <Text mb={1} data-testid="result4">Coverage Level Adjustment: ${results.breakdown.coverageLevelAdjustment}</Text>
          </Box>
        )
        }
      </VStack>
    </Box>
  );
}
