import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { NumberOfEvents } from "../components/NumberOfEvents";

it("contains a textbox allowing you to select your optimal number of events to display", () => {
  render(<NumberOfEvents />);
  const textBox = screen.queryByRole("textbox");

  expect(textBox).toBeInTheDocument();
});

it("contains a default value of 32", () => {
  render(<NumberOfEvents />);
  const default32 = screen.getByDisplayValue("32");

  expect(default32).toBeInTheDocument();
});

it("has value that changes with user input", async () => {
  render(<NumberOfEvents />);
  const user = userEvent.setup();
  const textBox = screen.queryByRole("textbox");
  const submitButton = screen.queryByRole("button", /submit/i);

  await user.type(textBox, "{backspace}{backspace}10");
  await user.click(submitButton);

  const listOfCities = screen.queryByRole("listitem");

  expect(listOfCities).toBeInTheDocument();
});
