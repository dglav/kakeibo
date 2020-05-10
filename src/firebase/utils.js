import { db } from "./config";

const usersRef = db.collection("users");
async function getUserRef(username) {
  try {
    const users = await usersRef.where("username", "==", username).get();
    if (users.empty) throw new Error("User does not exist.");
    let userRef = null;
    users.forEach((user) => {
      userRef = usersRef.doc(user.id);
    });
    return userRef;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return "error";
  }
}

export async function uploadPurchase(purchase) {
  try {
    console.log("uploading purchase...", purchase);
    const username = "Drew";
    const userRef = await getUserRef(username);
    await userRef.collection("purchases").doc().set(purchase);
    return "success";
  } catch (error) {
    return "failure";
  }
}

export async function getPurchases() {
  try {
    const username = "Drew";
    const userRef = await getUserRef(username);
    let purchases = [];
    await userRef
      .collection("purchases")
      .get()
      .then((snapshot) => {
        snapshot.forEach((purchase) => {
          const purchaseData = purchase.data();
          const date = purchaseData.date.toDate();
          purchases.push({
            ...purchaseData,
            date:
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate(),
          });
        });
      });
    return purchases;
  } catch (error) {
    console.log(error);
  }
}
