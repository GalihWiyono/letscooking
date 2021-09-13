import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router/index';
import firebase from 'firebase/app'
import { AuthProvider } from './Router/navigation/AuthProvider';

const firebaseConfig = {
  apiKey: "AIzaSyBqy-K-i0kL0YdUXhUUB5vob71J2fBxZmw",
  authDomain: "letscooking-e5a5e.firebaseapp.com",
  projectId: "letscooking-e5a5e",
  storageBucket: "letscooking-e5a5e.appspot.com",
  messagingSenderId: "866289746672",
  appId: "1:866289746672:web:beecec40dad34cd4e7b835"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
