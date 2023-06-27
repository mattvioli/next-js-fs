import { render, screen } from "@testing-library/react";
import { SignIn } from "./signin-btn";

describe("signin-btn", () => {
  it("renders", () => {
    render(<SignIn />);
    expect(screen.getByText(/Sign in/));
  });
});
