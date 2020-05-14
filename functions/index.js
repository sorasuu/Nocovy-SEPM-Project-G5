const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sendgridemail = require('@sendgrid/mail');
admin.initializeApp();

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

const MY_SENDGRID_API_KEY = "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"
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);

exports.productCreated = functions.firestore
  .document('products/{productId}')
  .onCreate((snap, context) => {

    const product = snap.data();
    const notification = {
      content: `Created a new listing: ${product.name}`,
      uid: `${product.supplierId}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      tag:'admin',
    }

    return createNotification(notification);

  });
exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'A new user need approval',
          user: `${newUser.displayName}`,
          time: admin.firestore.FieldValue.serverTimestamp(),
          tag:'admin',
        };

        return createNotification(notification);

      });
});
exports.userApproved = functions.firestore
  .document('users/{userId}')
  .onWrite(
    (change, context) => {
      var notification = null
      if (change.before.exists && change.after.exists) {
        const user = change.after.data()
        console.log(context.params)
        var msgbody = null
        if (user.pending === false && user.verify === true) {
          msgbody = {
            to: user.email,
            from: 'auto-no-reply@nocovy.com',
            templateId: 'd-622edc49b16e439280f4cd828c223aed',
            "dynamic_template_data": {
              name: user.displayName,
              text: user.displayName + " Your account has been approved by our admin. Enjoy our trading platform",
              subject: 'Acount verification approved',
            }
          }
          notification = {
            content: 'Account approved by the admin',
            time: admin.firestore.FieldValue.serverTimestamp(),
            uid: `${context.params.userId}`,
          }
        }
        if (user.pending === false && user.verify === false) {
          msgbody = {
            to: user.email,
            from: 'auto-no-reply@nocovy.com',
            templateId: 'd-622edc49b16e439280f4cd828c223aed',
            "dynamic_template_data": {
              name: user.displayName,
              text: user.displayName + " Your account has been declined by our admin. Please reupload your business cetificate for verification.",
              subject: 'Acount verification declined',
            }
          }
          notification = {
            content: 'Account verification declined please reupload your cetificate',
            time: admin.firestore.FieldValue.serverTimestamp(),
            uid: `${context.params.userId}`,

          }
          
        }
        return createNotification(notification).then(() => {
          if (msgbody) {
            return sendgridemail.send(msgbody)
              .then(() => console.log('owner  sent success'))
              .catch(err => console.log(err))
          } else { return null }
        })
      }
    }
  );
