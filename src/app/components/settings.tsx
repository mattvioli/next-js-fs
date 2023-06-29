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
  CircularProgress
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

type Inputs = {
  id: string;
  username: string;
  jobTitle: string;
};

export function Settings() {
  const { update, status, data: sessions } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({ defaultValues: { id: sessions?.user.id } });

  if (status === "loading") return <CircularProgress />;

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json"
      }
    });
    update();
  };

  return (
    <Card display="flex" justify="center" align="center">
      <CardHeader>
        <Text>Set profile information.</Text>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.username)}>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              type="username"
              placeholder="Enter username"
              marginBottom="8px"
              {...register("username")}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.jobTitle)}>
            <FormLabel>Job Title</FormLabel>
            <Input
              id="jobTitle"
              type="jobTitle"
              placeholder="Enter Job Title"
              marginBottom="8px"
              {...register("jobTitle")}
            />
          </FormControl>
          <Button width="100%" isLoading={isSubmitting} type="submit">
            Update profile
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
