import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterSelector from "@/app/components/FilterSelector";

describe("<FilterSelector />", () => {
  it("should render the filter selector", async () => {
    const { findByText } = render(
      <FilterSelector isSelected={false} text="teste" onSelect={() => null} />
    );

    const filterSelector = await findByText("teste");
    expect(filterSelector).toBeInTheDocument();
  });
  it("should call the onSelect method when clicked", async () => {
    const mockFunc = jest.fn();
    const { findByText } = render(
      <FilterSelector isSelected={false} text="teste" onSelect={mockFunc} />
    );

    const filterSelector = await findByText("teste");
    filterSelector.click();
    expect(mockFunc).toHaveBeenCalled();
  });
  it("should change the css classes when selected", async () => {
    const { findByText } = render(
      <FilterSelector isSelected text="teste" onSelect={() => null} />
    );

    const filterSelector = await findByText("teste");
    expect(filterSelector.classList.contains("bg-primary-500")).toBeTruthy();
  });
});
