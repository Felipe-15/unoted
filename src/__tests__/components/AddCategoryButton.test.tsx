import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddCategoryButton from "@/app/components/AddCategoryButton";

describe("<AddCategoryButton />", () => {
  it("should render the add category button", async () => {
    const { findByRole } = render(<AddCategoryButton onClick={() => null} />);

    const button = (await findByRole("button")) as HTMLButtonElement;

    expect(button).toBeInTheDocument();
  });
  it("should call the onClick callback", async () => {
    const mockFunc = jest.fn();
    const { findByRole } = render(<AddCategoryButton onClick={mockFunc} />);

    const button = (await findByRole("button")) as HTMLButtonElement;

    button.click();

    expect(mockFunc).toHaveBeenCalled();
  });
});
