import { Client, Account, ID } from "react-native-appwrite";

const client = new Client()
  .setProject("67c5cb910010b98a526c")
  .setPlatform("com.iguru.BAIM");

const account = new Account(client);

// Function to create a user using only their name
export const createUser = async (name) => {

  try {
    const user = await account.createAnonymousSession();
    return { userId: user.$id, name };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// create document
export const submitForm = async (userId, formId, formTitle) => {
    try {
      await databases.createDocument(
        '67c5cde1002e937d84b4',
        '67c5d02f003158be6947',
        ID.unique(),
        {
          user_id: userId,
          form_id: formId,
          form_title: formTitle,
          submission_date: new Date().toISOString().split("T")[0], // Stores only the date
        }
      );
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
