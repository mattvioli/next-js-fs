import { render, screen } from "@testing-library/react";
import { SignUp } from "./signup-form";

describe("signup-form", () => {
  it("renders", () => {
    render(<SignUp />);
    expect(screen.getByText(/No account?/));
    expect(screen.getByText(/Sign up below./));
    expect(screen.getByText(/Email address/));
    expect(screen.getByText(/Password/));
    expect(screen.getByText(/Sign Up/));
  });
});
