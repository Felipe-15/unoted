import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import Category from "@/app/components/category/Category";
import "@testing-library/jest-dom";

describe("<Category />", () => {
  it("should render the category", async () => {
    const { findByPlaceholderText } = render(
      <Category
        color="#ff9000"
        name="teste"
        onDelete={() => null}
        onUpdate={() => null}
      />
    );

    const category = await findByPlaceholderText("Digite...");

    expect(category).toBeInTheDocument();
  });
  it("should call the prop delete function when clicked", async () => {
    const mockFunc = jest.fn();
    const { findByRole } = render(
      <Category
        color="#ff9000"
        name="teste"
        onDelete={mockFunc}
        onUpdate={() => null}
      />
    );

    const button = await findByRole("button");

    fireEvent.click(button);

    expect(mockFunc).toHaveBeenCalled();
  });

  it("should update the color when onBlur input color", async () => {
    const mockFunc = jest.fn();
    const { findByDisplayValue } = render(
      <Category
        color="#ff9000"
        name="teste"
        onDelete={() => null}
        onUpdate={mockFunc}
      />
    );
    const inputColor = (await findByDisplayValue(
      "#ff9000"
    )) as HTMLInputElement;

    inputColor.value = "#ff8000";

    act(() => {
      inputColor.focus();
      inputColor.blur();
    });

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should update the color when press 'Enter' in input color", async () => {
    const mockFunc = jest.fn();
    const { findByDisplayValue } = render(
      <Category
        color="#ff9000"
        name="teste"
        onDelete={() => null}
        onUpdate={mockFunc}
      />
    );
    const inputColor = (await findByDisplayValue(
      "#ff9000"
    )) as HTMLInputElement;

    inputColor.value = "#ff8000";
    act(() => fireEvent.keyUp(inputColor, { key: "Enter" }));

    expect(mockFunc).toHaveBeenCalled();
  });
});
