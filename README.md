# Integrating Calendar Events in a React Native App

In this tutorial, we'll explore how to integrate calendar events functionality into a React Native application. We'll cover features such as creating events, fetching events, and handling permissions using the [react-native-calendar-events](https://www.npmjs.com/package/react-native-calendar-events) library.

#### Check out the demo video showcasing the features of add to calendar in action!

---

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/18yryp2eiwbjeaxd82vy.gif)

---


## Prerequisites

Before we begin, make sure you have the following set up:

- Node.js and npm installed on your development machine.
- A basic understanding of React Native development.
- An Android or iOS device or emulator for testing the app.

## iOS specific instructions
For updating the Info.plist key/value via XCode, add a Privacy - Calendars Usage Description key with a usage description as the value. Resulting change to Info.plist should look something like:

```
<key>NSCalendarsUsageDescription</key>
<string>This app requires access to the calendar</string>
```



## Setting Up the Project

**1). Create a new React Native project using the following command:**

```
npx react-native init CalendarEventsApp
```

**2). Navigate to the project directory:**

```
cd CalendarEventsApp
```



**3).Install the required dependencies:**

```
npm install --save react-native-calendar-events
--- or ---
yarn add react-native-calendar-events
```

## Package.json Dependencies
Below are the dependencies specified in the `package.json` file for a React Native project:

```
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.3",
    "react-native-calendar-events": "^2.2.0"
  }
}
```

_Calendar permission request_


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4fvlwm3v1vq8iiffowv6.png)


## Integrating Calendar Events

**1). Fetching Calendars and Requesting Permissions**

First, let's set up the functionality to fetch calendars and request necessary permissions. We'll do this in the main component of our application `(App.js)`.


```
// Import necessary components and libraries
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Platform,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

// Define the main App component
const App = () => {
  // State variables for event data
  const [eventTitle, setEventTitle] = useState('Gym Workout');
  const [eventLocation, setEventLocation] = useState('New Delhi');
  const [eventId, setEventId] = useState('');
  const [calendars, setCalendars] = useState([]);
  const [pickedCal, setPickedCal] = useState(null);

  // Effect hook to fetch calendars and request permissions (Android specific)
  useEffect(() => {
    async function loadCalendars() {
      try {
        const perms = await RNCalendarEvents.requestPermissions();
        if (perms === 'authorized') {
          const allCalendars = await RNCalendarEvents.findCalendars();
          const primaryCal = allCalendars.find(
            (cal) => cal.isPrimary && cal.allowsModifications
          );
          setCalendars(allCalendars);
          setPickedCal(primaryCal);
        } else {
          console.log('Calendar permission denied.');
        }
      } catch (error) {
        console.log('Error while fetching calendars:', error);
      }
    }

    if (Platform.OS === 'android') {
      loadCalendars();
    }
  }, []);

  // Event creation function
  const createEvent = async () => {
    try {
      // Code for creating and saving the event
      // ...
    } catch (error) {
      console.log('Error while saving event:', error);
    }
  };

  // Event fetching function
  const fetchEvent = async () => {
    try {
      // Code for fetching event by ID
      // ...
    } catch (error) {
      console.log('Error while fetching event:', error);
    }
  };

  // Render the UI components
  return (
    <View style={styles.container}>
      {/* UI components for input fields and buttons */}
      {/* ... */}
    </View>
  );
};

export default App;

// Styles for the components
const styles = StyleSheet.create({
  // Style definitions
});

```

**2). Creating and Fetching Events**

Next, let's implement the functionality for creating new events and fetching events by ID.

```
// Inside the main App component

// Event creation function
const createEvent = async () => {
  try {
    const savedEventId = await RNCalendarEvents.saveEvent(eventTitle, {
      calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      location: eventLocation,
    });
    
    setEventId(savedEventId);
    alert('Event saved successfully.');
  } catch (error) {
    console.log('Error while saving event:', error);
  }
};

// Event fetching function
const fetchEvent = async () => {
  try {
    const eventData = await RNCalendarEvents.findEventById(eventId);
    console.log('Event Data:', eventData);
  } catch (error) {
    console.log('Error while fetching event:', error);
  }
};

// Render the UI components
return (
  <View style={styles.container}>
    {/* UI components for input fields and buttons */}
    <TextInput
      style={styles.textInput}
      placeholder="Enter Event Title"
      value={eventTitle}
      onChangeText={setEventTitle}
    />
    <TextInput
      style={styles.textInput}
      placeholder="Enter Event Location"
      value={eventLocation}
      onChangeText={setEventLocation}
      multiline={true}
      numberOfLines={2}
    />
    <Button title="Save Event" onPress={createEvent} />
    <Button title="Fetch Event" onPress={fetchEvent} />
  </View>
);

```

If everything goes well the save event returns the event-id which can be used to search and delete the event, and within the native device calendar you can find the created event


Screenshot 1

![saved ss](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/55lmua2k6grrouf3gwbr.png)

---

Screenshot 2

![calendar ss](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uikh3k0rpjl5zmf7l0ba.png)


## note
It's possible that the "Add to Calendar" feature might not work on an Android emulator. You can check it on a real device it work properly there.

## Conclusion

In this tutorial, we've covered the basics of integrating calendar events functionality into a React Native app using the react-native-calendar-events library. You can further enhance this functionality by adding features like deleting events, fetching all events, or handling different recurrence patterns for events. Experiment with the code and explore the possibilities to tailor it to your specific application needs. Happy coding!

## After reading the post consider the following:

- Subscribe to receive newsletters with the latest blog posts
- Download the source code for this post from my [github](https://github.com/amitmehtacode/addToCalendar) 
