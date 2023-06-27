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
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  return (
    <Card align="center">
      <CardHeader>
        <Text>No account? Sign up below.</Text>
      </CardHeader>
      <CardBody align="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email} isRequired>
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
          <FormControl isInvalid={errors.password} isRequired>
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
