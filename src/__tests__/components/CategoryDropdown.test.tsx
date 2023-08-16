import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import { ICategory } from "@/interfaces/Category";

const categoriesMock: ICategory[] = [
  {
    id: "1",
    color: "#ff9000",
    creator_id: "1",
    name: "teste 1",
    type: "note",
  },
  {
    id: "2",
    color: "#ff9000",
    creator_id: "2",
    name: "teste 2",
    type: "note",
  },
  {
    id: "3",
    color: "#ff9000",
    creator_id: "3",
    name: "teste 3",
    type: "note",
  },
];

describe("<CategoryDropdown>", () => {
  it("should render the category dropdown", async () => {
    const { findByText } = render(
      <CategoryDropdown
        categories={categoriesMock}
        onSelectCategory={() => null}
      />
    );

    const dropdown = await findByText("Nenhuma");

    expect(dropdown).toBeInTheDocument();
  });
  it("should open the dropdown when clicked", async () => {
    const { findByRole, findByTestId } = render(
      <CategoryDropdown
        categories={categoriesMock}
        onSelectCategory={() => null}
      />
    );

    const dropdown = await findByRole("button");
    act(() => {
      dropdown.click();
    });
    const categoryList = await findByTestId("category-filter-list");
    expect(categoryList.classList.contains("overflow-y-auto")).toBeTruthy();
  });
  it("should call the onClick method", async () => {
    const mockFunc = jest.fn();
    const { findByText } = render(
      <CategoryDropdown
        categories={categoriesMock}
        onSelectCategory={mockFunc}
      />
    );

    const dropdown = await findByText("teste 1");

    dropdown.click();

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should change style when selected", async () => {
    const { findByText, findAllByText } = render(
      <CategoryDropdown
        categories={categoriesMock}
        selectedCategory={categoriesMock[0]}
        onSelectCategory={() => null}
      />
    );

    const unselected = await findByText("teste 2");
    const selected = await findAllByText("teste 1");

    const unselectedStyles = unselected.classList;
    const selectedStyles = selected[0].classList;

    expect(unselectedStyles.contains("cursor-pointer")).toBeTruthy();
    expect(
      selectedStyles.contains("data-[selected-category=true]:bg-background-800")
    ).toBeTruthy();
  });
});
