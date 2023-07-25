import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/Button";
import "@testing-library/jest-dom";

import { BsAt } from "react-icons/bs";

describe("<Button />", () => {
  it("should render the button", async () => {
    const { findByText } = render(<Button text="teste" onClick={() => null} />);

    const button = await findByText("teste");

    expect(button).toBeInTheDocument();
  });
  it("should call the prop function when clicked", async () => {
    const mockFunc = jest.fn();
    const { findByText } = render(
      <Button outline text="teste" onClick={mockFunc} />
    );

    const button = await findByText("teste");

    fireEvent.click(button);

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should render a icon inside the button", async () => {
    const { findByText } = render(
      <Button icon={BsAt} text="teste" onClick={() => {}} />
    );

    const button = await findByText("teste");

    expect(button.hasChildNodes()).toBeTruthy();
  });
  it("should change the styles when the prop 'outline' it's given", async () => {
    const { findByText } = render(
      <Button icon={BsAt} outline text="teste" onClick={() => {}} />
    );

    const button = await findByText("teste");

    expect(button.classList.contains("text-primary-500")).toBeTruthy();
  });
  it("should disable the button when the prop 'disabled' it's given", async () => {
    const mockFunc = jest.fn();
    const { findByText } = render(
      <Button icon={BsAt} disabled outline text="teste" onClick={mockFunc} />
    );

    const button = await findByText("teste");
    button.click();

    expect(mockFunc).not.toHaveBeenCalled();
  });
});
