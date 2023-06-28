import { render, screen } from "@testing-library/react";
import MembersSection from "./page";
import { MockedProvider } from "@apollo/client/testing";
import { GET_POKEMON } from "./../../queries/pokemon";

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