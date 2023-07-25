import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateInput from "@/app/components/DateInput";

describe("<DateInput />", () => {
  it("should render the date input", async () => {
    const { findByText } = render(
      <DateInput date="" onSelectDate={() => null} />
    );

    const dateinput = await findByText("Hoje");

    expect(dateinput).toBeInTheDocument();
  });
  it("should call the callback function when change date value", async () => {
    const mockFunc = jest.fn();
    const { findByTestId } = render(
      <DateInput date="" onSelectDate={mockFunc} />
    );

    const dateinput = (await findByTestId("date-input")) as HTMLInputElement;

    fireEvent.change(dateinput, { target: { value: "2020-05-15" } });

    expect(mockFunc).toHaveBeenCalled();
  });
});
