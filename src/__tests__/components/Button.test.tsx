import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/Button";
import "@testing-library/jest-dom";

import { BsAt } from "react-icons/bs";

describe("<Button />", () => {
  it("should render the button", async () => {
    const { findByText } = render(
      <Button text="teste de botão" onClick={() => null} />
    );

    const button = await findByText("teste de botão");

    expect(button).toBeInTheDocument();
  });
  it("should call the prop function when clicked", async () => {
    const mockFunc = jest.fn();
    const { findByText } = render(
      <Button outline text="teste de botão" onClick={mockFunc} />
    );

    const button = await findByText("teste de botão");

    fireEvent.click(button);

    expect(mockFunc).toHaveBeenCalled();
  });
  it("should render a icon inside the button", async () => {
    const { findByText } = render(
      <Button icon={BsAt} text="teste de botão" onClick={() => {}} />
    );

    const button = await findByText("teste de botão");

    expect(button.hasChildNodes()).toBeTruthy();
  });
});
