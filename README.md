# letsmeet

Welcome to **Let's Meet!** An app where you find events by location, with offline functionality.
Check me out now at https://sophiabanda.github.io/letsmeet/

# Dependencies

```"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4",
    "workbox-background-sync": "^6.6.0",
    "workbox-broadcast-update": "^6.6.0",
    "workbox-cacheable-response": "^6.6.0",
    "workbox-core": "^6.6.0",
    "workbox-expiration": "^6.6.0",
    "workbox-google-analytics": "^6.6.0",
    "workbox-navigation-preload": "^6.6.0",
    "workbox-precaching": "^6.6.0",
    "workbox-range-requests": "^6.6.0",
    "workbox-routing": "^6.6.0",
    "workbox-strategies": "^6.6.0",
    "workbox-streams": "^6.6.0"
  }
```

**Dev Dependencies**

```"devDependencies": {
    "gh-pages": "^6.0.0"
  }
```

# To run locally

```
Inside the directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!


Happy hacking!

```

## User Scenarios

**_As a user,
I should be able to use the search to filter by city
So I can find events in cities I am interestd in_**

**Scenario:** A user can log-in the the homepage of the app and wants to see what events are taking place in their city this week
**Given:** A user logs in
**When:** The user is taken to the homepage of the app
**Then:** They are presented with a search bar to search for events in their city

**_As a logged-in user,
I should be able to hide events details
So that I can see more or less information about an event._**

**Scenario:** A user has filtered events by their city, but only cares to see the event type and title.
**Given:** A user has utilzed the filter search to narrow results down to events in their city
**When:** The user clicks to hide events details
**Then:** The detailed event description is hidden from view

**_As a logged-in user,
I should be able to specify the number of events I want to view in the app
So that I can see more or fewer events in the list at once._**

**Scenario:** User has fitlered for events by their city, toggled off event details, and would like to narrow down the number of events shown on the page for ease of viewing and selection.
**Given:** A user would only like a specified number of results returned
**When:** The user selects the number of events they would like displayed
**Then:** A maximum of the selected number of events is displayed for the user

**_As a logged-in user,
I should be able to use the app when it’s offline
So that I can view the events last displayed when I logged in._**

**Scenario:** A user would like to be able to check on event details of event they’ve seen previously displayed, even if their service is out of range.
**Given:** A user has logged in to check out upcoming or saved events
**When:** They arrive at the home page
**Then:** A list of events of events that populate with last online login will be displayed and available

**_As a user,
I should be able to add the app shortcut to my homescreen
So that I can open the app faster._**

**Scenario:** A user finds that they are utilizing Meet fairly frequently and would like to make locating and opening the app as easy as possible.
**Given:** A user has the app open in their browser
**When:** The user selects the “add to home page” option
**Then:** The user can add the app to their preferred page

**_As a logged-in user,
I should be able to see a chart of all events in all cities
So that I know what events are organized in which city._**

**Scenario:** A user is interested in seeing all upcoming events in the (U.S.?) because they are traveling and might want to attend an event out of state on their travels.
**Given:** A user has logged in to check out upcoming events
**When:** The user selects the “See all events occurring in the next 7 days in the U.S. here” button
**Then:** A chart appears on screen listing all upcoming events with details of location and descritpion
