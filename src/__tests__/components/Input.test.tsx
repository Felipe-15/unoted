import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "@/app/components/Input";

import { BsAt } from "react-icons/bs";

describe("<Input />", () => {
  it("should render the input", async () => {
    const { findByPlaceholderText } = render(<Input placeholder="teste" />);

    const input = await findByPlaceholderText("teste");

    expect(input).toBeInTheDocument();
  });
  it("should render the icon inside the input", async () => {
    const { findByTestId } = render(<Input placeholder="teste" icon={BsAt} />);

    const inputIcon = await findByTestId("input-icon");

    expect(inputIcon).toBeInTheDocument();
  });
  it("should display an error message when it's given", async () => {
    const { findByText } = render(<Input placeholder="teste" error="erro" />);

    const inputError = await findByText("erro");

    expect(inputError).toBeInTheDocument();
  });
  it("should change the input holder style when has a error message", async () => {
    const { findByTestId } = render(
      <Input placeholder="teste" error="error" />
    );

    const inputHolder = await findByTestId("input-holder");

    expect(inputHolder.classList.contains("border-danger")).toBeTruthy();
  });
  it("should change the input holder style when it's focused and return when lose focus", async () => {
    const { findByTestId, findByPlaceholderText } = render(
      <Input placeholder="teste" />
    );

    const input = await findByPlaceholderText("teste");

    act(() => {
      input.focus();
    });

    const inputHolder = await findByTestId("input-holder");

    expect(inputHolder.classList.contains("border-primary-500")).toBeTruthy();

    act(() => {
      input.blur();
    });

    expect(
      inputHolder.classList.contains("border-primary-500")
    ).not.toBeTruthy();
  });
});
