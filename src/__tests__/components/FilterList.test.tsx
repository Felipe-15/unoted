import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterList from "@/app/components/FilterList";
import { ICategory } from "@/interfaces/Category";

const mockDinamicFilter = {
  selectedFilter: null,
  dinamicFilters: [
    {
      color: "test",
      creator_id: "test",
      id: "test",
      name: "test",
      type: "note" as "note",
    },
  ],
  onSelectFilter: (category: ICategory) => console.log(category),
};
describe("<FilterList />", () => {
  it("should render the children filter components", () => {
    const { getByText } = render(
      <FilterList>
        <li>a test item</li>
      </FilterList>
    );

    const listItem = getByText(/a test item/i) as HTMLButtonElement;

    expect(listItem).toBeInTheDocument();
  });
  it("should render the filters with dinamic configs", () => {
    const { getByText } = render(
      <FilterList dinamicConfig={mockDinamicFilter}>
        <div></div>
      </FilterList>
    );

    const dinamicFilter = getByText(/test/i) as HTMLButtonElement;

    expect(dinamicFilter).toBeVisible();
  });
  it("should call the select function when a filter is selected", () => {
    const mock = jest.fn();
    const { getByRole } = render(
      <FilterList
        dinamicConfig={{ ...mockDinamicFilter, onSelectFilter: mock }}
      >
        <div></div>
      </FilterList>
    );

    const filterButton = getByRole("button");

    filterButton.click();

    expect(mock).toHaveBeenCalled();
  });
});
