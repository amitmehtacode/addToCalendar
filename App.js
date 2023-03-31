import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNCalendarEvents from 'react-native-calendar-events';

const App = () => {
  const [eventTitle, setEventTile] = useState('Testing');
  const [eventLocation, setEventLocation] = useState('Hello');
  const [date, setDate] = useState(new Date());

  var calendars = '';
  var pickedCal = '';

  useEffect(() => {
    try {
      if (Platform.OS === 'android') {
        (async function androidCalendar() {
          calendars = await RNCalendarEvents.findCalendars();
          pickedCal = calendars.find(r => r.isPrimary && r.allowsModifications);
        })();
      }
    } catch (error) {
      console.log('asdasd', error);
    }
  }, []);

  useEffect(() => {
    try {
      RNCalendarEvents.findCalendars()
        .then(res => {})
        .catch(err => console.log('err', err));
      RNCalendarEvents.requestPermissions()
        .then(res => {
          console.log('Permission Response---------------->', res);
          if (res === 'authorized') {
          }
        })
        .catch(err => {
          console.log('error----->', err);
        });
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  const fetchAllEvent = () => {
    try {
      RNCalendarEvents.fetchAllEvents(
        new Date(1662607800000).toISOString(),
        new Date(1662611400000).toISOString(),
      )
        .then(data => {
          console.log('All Event----->', data);
        })
        .catch(err => console.log('err', err));
    } catch (error) {
      console.log('err', error);
    }
  };

  const createEvent = () => {
    try {
      const newDate = new Date(date);
      newDate.setHours(newDate.getHours() + 2);

      RNCalendarEvents.saveEvent(eventTitle, {
        calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
        startDate: new Date(1662607800000).toISOString(),
        endDate: new Date(1662611400000).toISOString(),
        location: eventLocation,
        // recurrence: 'daily',
        // url: 'asdasdasda',
      })
        .then(value => {
          console.log('Event Id--->', value);
          alert('event saved');
        })
        .catch(error => {
          console.log(' Did Not work Threw an error --->', error);
        });
    } catch (error) {
      console.log('err', error);
    }
  };

  const fetchEvent = eventId => {
    if (Platform.OS === 'android') {
      try {
        if (!isNaN(eventId)) {
          if (eventId) {
            try {
              RNCalendarEvents.findEventById(eventId).then(data => {
                console.log('Event Data-->', data);
              });
            } catch (error) {
              console.log('err', error);
            }
          }
        }
      } catch (error) {
        console.log('err', error);
      }
    } else {
      try {
        RNCalendarEvents.findEventById(eventId).then(data => {
          console.log('Event Data-->', data);
        });
      } catch (error) {
        console.log('err', error);
      }
    }
  };

  const deleteEvent = eventId => {
    try {
      RNCalendarEvents.removeEvent(eventId)
        .then(val => {
          console.log(val); //returns true if event is deleted
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('err', error);
    }
  };

  const deleteAllCalendar = id => {
    try {
      RNCalendarEvents.removeCalendar(id)
        .then(res => console.log('delete res--->', res))
        .catch(err => console.log('err----->', err));
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.singleElement}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Event Title"
                value={eventTitle}
                onChangeText={value => {
                  setEventTile(value);
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.singleElement}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Event Location"
                value={eventLocation}
                onChangeText={value => {
                  setEventLocation(value);
                }}
                multiline={true}
                numberOfLines={2}
              />
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          style={{
            flex: 2,
            padding: 25,
            height: 72,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => createEvent()}
        >
          <Text> Save Event </Text>
        </TouchableOpacity> */}
        <Button title="Save Event" onPress={() => createEvent()} />
        <Button title='Fetch Event' onPress={() => fetchEvent('950')} />

        {/* <Button title='Fetch Event' onPress={() => fetchEvent('80')} />
        <Button title='Fetch all Event' onPress={() => fetchAllEvent()} />

        <Button title='Delete Calender' onPress={() => deleteAllCalendar('5')} />

        <Button title='Delete Event By ID' onPress={() => deleteEvent('81')} /> */}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fff',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  singleElement: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 1,
  },

  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 1,
    margin: 2,
  },

  dateIcon: {
    padding: 10,
    width: '100%',
  },
});
