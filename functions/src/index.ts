import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const subscribeToTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().subscribeToTopic(data.token, data.topic);
    return `subscribed to ${data.topic}`;
  }
);

export const unsubscribeFromTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
    return `unsubscribed from ${data.topic}`;
  }
);
let alerta: any;
export const sendOnFirestoreCreate = functions.firestore
  .document("alerts/{alertId}")
  .onCreate(async snapshot => {
    alerta = snapshot.data();

    // These registration tokens come from the client FCM SDKs.
    const registrationTokens = alerta.tokenUser;

    const message = {
      notification: {
        title: "Alarma Activada!",
        body:
          alerta.nombre +
          " activo la alarma su dirección es " +
          alerta.calle +
          " #" +
          alerta.casa
      },
      webpush: {
        headers: {
          Urgency: "high"
        },
        notification: {
          icon:
            "https://firebasestorage.googleapis.com/v0/b/vecinosvigia.appspot.com/o/ic_launcher.png?alt=media&token=7f8ec432-1e35-469e-96be-a6582eab9a6a",
          click_action: "http://vecinosvigia.web.app/",
          requireInteraction: true
        }
      },
      tokens: registrationTokens
    };

    // admin
    //   .messaging()
    //   .sendMulticast(message)
    //   .then(response => {
    //     if (response.failureCount > 0) {
    //       const failedTokens: any = [];
    //       response.responses.forEach((resp, idx) => {
    //         if (!resp.success) {
    //           failedTokens.push(registrationTokens[idx]);
    //         }
    //       });
    //       console.log("List of tokens that caused failures: " + failedTokens);
    //     }
    //   });

    // const payload: admin.messaging.Message = {
    //     notification,
    //     webpush: {
    //         "headers": {
    //             "Urgency": "high"
    //           },
    //         notification: {
    //             icon: 'https://firebasestorage.googleapis.com/v0/b/vecinosvigia.appspot.com/o/ic_launcher.png?alt=media&token=7f8ec432-1e35-469e-96be-a6582eab9a6a',
    //             click_action: "http://localhost:4200/",
    //             requireInteraction: true
    //         },
    //     },
    //     topic: 'alerts'
    // };
    return admin.messaging().sendMulticast(message);
  });
