import { render, screen } from "@testing-library/react";
import { NumberOfEvents } from "../components/NumberOfEvents";
import { userEvent } from "@testing-library/user-event";

const { currentNoE, setCurrentNoE } = NumberOfEvents;

it("contains a textbox allowing you to select your optimal number of events to display", () => {
  render(<NumberOfEvents />);
  const numberInput = screen.queryByRole("spinbutton");
  expect(numberInput).toBeInTheDocument();
});

it("contains a default value of events length", () => {
  render(<NumberOfEvents />);
  const eventsListLength = screen.queryAllByRole("listitem");

  expect(eventsListLength).toHaveLength(eventsListLength.length);
});

it("has value that changes with user input", async () => {
  render(
    <NumberOfEvents currentNoE={currentNoE} setCurrentNoE={setCurrentNoE} />
  );
  const user = userEvent.setup();
  const numberInput = screen.queryByRole("spinbutton");
  const submitButton = screen.queryByRole("button", /submit/i);

  await user.type(numberInput, "{backspace}{backspace}10");
  await user.click(submitButton);
});

// console.error
// Warning: A component is changing an uncontrolled input to be controlled.
//       This is likely caused by the value changing from undefined to a defined value,
//     which should not happen.Decide between using a controlled or uncontrolled input
//     element for the lifetime of the component.
//     More info: https://reactjs.org/link/controlled-components
