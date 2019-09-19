import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


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
    .document('alerts/{alertId}')
    .onCreate(async snapshot => {
         alerta = snapshot.data();

        const notification: admin.messaging.Notification = {
            title: 'Alarma Activada!',
            body: alerta.nombre + ' activo la alarma su dirección es ' + alerta.calle + ' #' + alerta.casa
        };

        const payload: admin.messaging.Message = {
            notification,
            webpush: {
                "headers": {
                    "Urgency": "high"
                  },
                notification: {
                    icon: 'https://p7.hiclipart.com/preview/627/944/843/emergency-safety-kill-switch-panic-button-push-button-emergency.jpg',
                    click_action: "http://localhost:4200/",
                    requireInteraction: true
                },
            },
            topic: 'alerts'
        };
        return admin.messaging().send(payload);
    })

