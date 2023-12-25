Feature: Specify number of events to display
    Scenario: User has fitlered for events by their city and would like to narrow down the number of events shown on the page for ease of viewing and selection.
        Given a user would only like a specified number of results returned
        When the user selects the number of events they would like displayed
        Then a maximum of the selected number of events is displayed for the user