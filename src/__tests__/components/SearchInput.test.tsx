import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "@/app/components/SearchInput";
import userEvent from "@testing-library/user-event";

describe("<SearchInput />", () => {
  it("should render the input on screen", () => {
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={() => null} />
    );

    const input = getByPlaceholderText(/buscar/i);

    expect(input).toBeVisible();
  });
  it("should call the onSearch function when 'Enter' is pressed", async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(<SearchInput onSearch={mockFn} />);

    const input = getByPlaceholderText(/buscar/i);

    await user.type(input, "test{enter}");

    expect(mockFn).toHaveBeenCalled();
  });
});
