import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen, within, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("User has fitlered for events by their city and would like to narrow down the number of events shown on the page for ease of viewing and selection.", ({
    given,
    when,
    then,
  }) => {
    const user = userEvent.setup();
    let submitButton;
    let eventList;
    let eventListItems;
    let numberInput;
    given(
      "a user would only like a specified number of results returned",
      async () => {
        render(<App />);
        eventList = screen.queryByRole("list");
        submitButton = screen.getByRole("button", { name: /submit/i });
        await waitFor(() => {
          eventListItems = within(eventList).queryAllByRole("listitem");
          expect(eventListItems.length).toBe(35);
        });
        expect(submitButton).toBeInTheDocument();
      }
    );

    when(
      "the user selects the number of events they would like displayed",
      async () => {
        numberInput = screen.getByRole("spinbutton");
        await user.type(numberInput, "{backspace}{backspace}5");
        await user.click(submitButton);
        await waitFor(() => {
          eventListItems = within(eventList).queryAllByRole("listitem");
          expect(eventListItems.length).toBe(5);
        });
        //waitFor is going to wait for whatever previous actions exist to
        //take place and update state before running/searching
      }
    );
    then(
      "a maximum of the selected number of events is displayed for the user",
      () => {
        expect(eventListItems.length).toBe(5);
      }
    );
  });
});
