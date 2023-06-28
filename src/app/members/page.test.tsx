import { render, screen } from "@testing-library/react";
import MembersSection from "./page";
import { MockedProvider } from "@apollo/client/testing";
import { GET_POKEMON } from "./../../queries/pokemon";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { email: "ash@ketchem.com" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    })
  };
});
const mocks = [
  {
    request: {
      query: GET_POKEMON
    },
    result: {
      data: { gen1_species: [{ id: "1", name: "Bulbasaur" }] }
    }
  }
];

describe("MembersSection", () => {
  it("renders the welcome banner and the table", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MembersSection />
      </MockedProvider>
    );
    expect(screen.getByText(/Welcome, this is the members section!/));
    expect(await screen.findByText(/Bulbasaur/));
  });
});
