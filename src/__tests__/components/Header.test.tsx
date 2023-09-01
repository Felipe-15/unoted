import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/components/Header";

describe("<Header />", () => {
  it("should render the add category button", async () => {
    const { findByRole } = render(<Header />);

    const header = (await findByRole("heading")) as HTMLButtonElement;

    expect(header).toBeInTheDocument();
  });
});
