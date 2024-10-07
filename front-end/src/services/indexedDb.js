let request = indexedDB.open("usersdb", 1); // "myDatabase" is the database name

let db = null
let objStoreName = "users"

request.onupgradeneeded = function (event) {
    let db = event.target.result;
    // Create an object store
    let objectStore = db.createObjectStore(objStoreName, { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("department", "department", { unique: false });
    objectStore.createIndex("designation", "designation", { unique: false });
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database open");
};

request.onerror = function (event) {
    console.error("Error opening database", event);
};

//Create
export const createUsers = async (users) => {
  let transaction = db.transaction([objStoreName], "readwrite");
  let objectStore = transaction.objectStore(objStoreName);

  const key = await generateKey()
  const { encryptedData, iv } = await encryptData(user, key);

  let requestAdd = objectStore.add({
      id: 1,
      encryptedData: encryptedData,
      iv: Array.from(iv), // Store IV as an array
  });

  requestAdd.onsuccess = function (event) {
      console.log("Encrypted data added successfully");
  };

  requestAdd.onerror = function (event) {
      console.error("Error adding encrypted data", event);
  };

}

//read
export const readUsers = () => {
  let transaction = db.transaction([objStoreName], "readonly");
  let objectStore = transaction.objectStore(objStoreName);

  let requestGet = objectStore.get(1); // Get the item with key '1'

  requestGet.onsuccess = async function (event) {
      const result = requestGet.result;

      if (result) {
          const key = await generateKey(); // Use the same key used for encryption
          const decryptedData = await decryptData(
              result.encryptedData,
              key,
              new Uint8Array(result.iv) // Convert IV back to Uint8Array
          );

          console.log("Decrypted Data:", decryptedData);
      }
  };

  requestGet.onerror = function (event) {
      console.error("Error fetching data", event);
  };

}

//update
export const updateUsers = async (users) => {
  let transaction = db.transaction([objStoreName], "readwrite");
  let objectStore = transaction.objectStore(objStoreName);

  const key = await generateKey()

  const { encryptedData, iv } = await encryptData(users, key);

  let requestUpdate = objectStore.put({
      id: 1,
      encryptedData: encryptedData,
      iv: Array.from(iv), // Store IV as an array
  });

  requestUpdate.onsuccess = function (event) {
      console.log("Encrypted data updated successfully");
  };

  requestUpdate.onerror = function (event) {
      console.error("Error updating encrypted data", event);
  };

}

//delete
export const deleteUsers = () => {
  let transaction = db.transaction([objStoreName], "readwrite");
  let objectStore = transaction.objectStore(objStoreName);

  let requestDelete = objectStore.delete(1);

  requestDelete.onsuccess = function (event) {
      console.log("Data deleted successfully");
  };

  requestDelete.onerror = function (event) {
      console.error("Error deleting data", event);
  };
}
