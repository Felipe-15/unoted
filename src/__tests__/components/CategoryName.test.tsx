import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryName from "@/app/components/category/CategoryName";
import "@testing-library/jest-dom";

describe("<CategoryName />", () => {
  it("should render the category name", async () => {
    const { findByPlaceholderText } = render(
      <CategoryName defaultName="teste" onUpdate={() => {}} />
    );

    const inputCategory = await findByPlaceholderText("Digite...");

    expect(inputCategory).toBeInTheDocument();
  });
  it("should call the onUpdate when onBlur", async () => {
    const mockFunc = jest.fn();
    const { findByPlaceholderText } = render(
      <CategoryName defaultName="teste" onUpdate={mockFunc} />
    );

    const inputCategory = (await findByPlaceholderText(
      "Digite..."
    )) as HTMLInputElement;

    inputCategory.value = "teste2";
    inputCategory.focus();
    inputCategory.blur();

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should call the onUpdate when press 'Enter' key", async () => {
    const mockFunc = jest.fn();
    const { findByPlaceholderText } = render(
      <CategoryName defaultName="teste" onUpdate={mockFunc} />
    );

    const inputCategory = (await findByPlaceholderText(
      "Digite..."
    )) as HTMLInputElement;

    inputCategory.value = "teste2";

    fireEvent.keyUp(inputCategory, { key: "Enter" });

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should change the width when type", async () => {
    const user = userEvent.setup();
    const { findByPlaceholderText } = render(
      <CategoryName defaultName="teste" onUpdate={() => {}} />
    );

    const inputCategory = (await findByPlaceholderText(
      "Digite..."
    )) as HTMLInputElement;

    const oldWidth = inputCategory.style.width;

    await user.type(inputCategory, "Novo texto");

    const newWidth = inputCategory.style.width;

    expect(oldWidth !== newWidth).toBeTruthy();
  });
});
