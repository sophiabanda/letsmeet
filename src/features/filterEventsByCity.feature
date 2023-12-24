Feature: Filter events by city

    Scenario: When a user hasn't searched for a city, show upcoming events from all cities
        Given user hasn't searched for any city
        When the user opens the app
        Then the user should see the list of upcoming events

    Scenario: User has fitlered for events by their city, and would like to narrow down the number of events shown on the page for ease of viewing and selection.
        Given a user would only like a specified number of results returned
        When the user selects the number of events they would like displayed
        Then the selected number of events is displayed for the user