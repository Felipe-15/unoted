import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/components/Header";

describe("<Header />", () => {
  it("should render the header", () => {
    const { getByPlaceholderText } = render(
      <Header
        onSearch={(text: string) => null}
        user={{ name: "test", id: "test", photo: "https://test" }}
      />
    );

    const header = getByPlaceholderText(/buscar/i);

    expect(header).toBeVisible();
  });
  it("should render a skeleton to the user when not loaded yet", () => {
    const { getByPlaceholderText } = render(
      <Header onSearch={(text: string) => null} />
    );

    const header = getByPlaceholderText(/buscar/i);

    expect(header).toBeVisible();
  });
});
