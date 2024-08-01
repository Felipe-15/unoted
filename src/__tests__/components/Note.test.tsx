import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Note from "@/app/components/Note";
import { INote } from "@/interfaces/Note";

const mock: INote = {
  category_id: "test",
  content: "content test",
  created_at: "2023-12-24",
  creator_id: "test",
  id: "123",
  title: "title test",
};

describe("<Note />", () => {
  it("should render the note", () => {
    const { getByText } = render(
      <Note
        {...mock}
        createdAt={mock.created_at}
        noteId="123"
        onDelete={() => null}
        color="#12312"
      />
    );

    const note = getByText(/title test/i);

    expect(note).toBeVisible();
  });
  it("should call the onDelete func when the trash button is clicked", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <Note
        {...mock}
        createdAt={mock.created_at}
        noteId="123"
        onDelete={mockFn}
        color="#12312"
      />
    );

    const deleteButton = getByRole("button");

    deleteButton.click();

    expect(mockFn).toHaveBeenCalled();
  });
});
