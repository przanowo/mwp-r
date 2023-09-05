const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.updateCount = functions.firestore
    .document("products/{category}/product/{productId}")
    .onWrite(async (change, context) => {
      const category = context.params.category;
      const countRef = admin.firestore().collection("meta").doc(category);

      const doc = await countRef.get();
      let count = doc.exists ? doc.data().count : 0;
      if (!change.before.exists && change.after.exists) {
        count++;
      } else if (change.before.exists && !change.after.exists) {
        count--;
      }
      return countRef.set({count});
    });
