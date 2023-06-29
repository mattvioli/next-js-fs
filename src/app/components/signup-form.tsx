"use-client";
import {
  Input,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";
type Inputs = {
  email: string;
  password: string;
};

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      redirect("/members");
    }
  };

  return (
    <Card align="center">
      <CardHeader>
        <Text>No account? Sign up below.</Text>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.email)} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
              })}
            />
            <FormErrorMessage>Email is required.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
              })}
            />
            <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">
            Sign Up
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
