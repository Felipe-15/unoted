import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResponsiveHolder from "@/app/components/ResponsiveHolder";
import { BsTrashFill } from "react-icons/bs";

describe("<ResponsiveHolder />", () => {
  it("should render the responsive holder", () => {
    const { getByText } = render(
      <ResponsiveHolder
        buttonIcon={BsTrashFill}
        buttonTitle="test"
        title="test"
      >
        <div>test children</div>
      </ResponsiveHolder>
    );

    const holder = getByText(/test children/i);

    expect(holder).toBeVisible();
  });
  it("should change the responsive holder behavior when on mobile", () => {
    const { getByText } = render(
      <ResponsiveHolder
        buttonIcon={BsTrashFill}
        buttonTitle="test"
        title="test"
      >
        <div>test children</div>
      </ResponsiveHolder>
    );

    global.innerWidth = 460;

    global.dispatchEvent(new Event("resize"));

    const holder = getByText(/test children/i);

    expect(holder).toBeVisible();
  });
});
