import React, { useState } from "react";
import { Button, Input, VStack, Text } from "@chakra-ui/react";

interface SignInData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    // parse in the email and password
    const [formData, setFormData] = useState<SignInData>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle the submit 
    const handleSubmit = () => {
        const { email, password } = formData;
        if (!email || !password) {
            setError("Both feilds required");
        }
        else {

            setError("");
            console.log("Form submitted:", formData);
        }

    }




    return (
        <VStack spacing={4}>
            <Text>Sign In</Text>
            <Input placeholder="Email" />
            <Input placeholder="Password" type="password" />
            <Button colorScheme="blue">Submit</Button>
        </VStack>
    );
};

