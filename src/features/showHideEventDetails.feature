Feature: Show and Hide Event Details
    Scenario: A user has filtered events by their city, but event details are hidden by default
        Given A user has utilized the filter search to narrow results down to events in their city
        When the user clicks to show event details
        Then the details of the event are shown

    Scenario: A user has an event expanded to show details, but is ready to hide them again
        Given A user is viewing an events details
        When the user clicks to hide event details
        Then the details of the event are now hidden from view