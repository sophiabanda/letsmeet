import { loadFeature, defineFeature } from "jest-cucumber";
import Event from "../components/Event";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, (test) => {
  test("A user has filtered events by their city, but event details are hidden by default", ({
    given,
    when,
    then,
  }) => {
    let detailsButton;
    let eventDetails;
    given(
      "A user has utilized the filter search to narrow results down to events in their city",
      () => {
        render(<Event />);
        detailsButton = screen.queryByRole("button", {
          name: /show details/i,
        });

        expect(detailsButton).toBeInTheDocument();
      }
    );

    when("the user clicks to show event details", async () => {
      const user = userEvent.setup();
      await user.click(detailsButton);
    });

    then("the details of the event are shown", () => {
      eventDetails = screen.getByTestId("event-details");
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test("A user has an event expanded to show details, but is ready to hide them again", ({
    given,
    when,
    then,
  }) => {
    let detailsButton;
    let eventDetails;
    let user = userEvent.setup();
    given("A user is viewing an events details", async () => {
      render(<Event />);
      detailsButton = screen.queryByRole("button", {
        name: /show details/i,
      });
      await user.click(detailsButton);
      eventDetails = screen.getByTestId("event-details");

      expect(eventDetails).toBeInTheDocument();
    });

    when("the user clicks to hide event details", async () => {
      await user.click(detailsButton);
    });

    then("the details of the event are now hidden from view", () => {
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});
