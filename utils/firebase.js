import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
    init: async () => {
        if (!firebase?.apps?.length) {

            // Initialize the Firebase app with the credentials
            firebase?.initializeApp({
                apiKey: "AIzaSyB7WeR-Y-x5r3jGc2-eZEC31w--la61kRQ",
                authDomain: "ubout-367713.firebaseapp.com",
                projectId: "ubout-367713",
                storageBucket: "ubout-367713.appspot.com",
                messagingSenderId: "87939184502",
                appId: "1:87939184502:web:40815f49c01b3ef83cec57",
                measurementId: "G-1CP4JRDPVE"
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await localforage.getItem("fcm_token");

                // Return the token if it is alredy in our local storage
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === "granted") {
                    // Get new token from Firebase
                    const fcm_token = await messaging.getToken({
                        vapidKey: "BAa7UptN5-fs4nSw9VEzghrajjqOwz5JYzogaSnHO3mpnabRvlIxLejcV37_kLguJ0megZ1WIXvrzk46x9zPXpA",
                    });

                    // Set token in our local storage
                    if (fcm_token) {
                        localforage.setItem("fcm_token", fcm_token);
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};
export { firebaseCloudMessaging };