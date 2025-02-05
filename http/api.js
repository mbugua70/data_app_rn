import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function LoginHander({ name, password }) {
  if (!name || !password) {
    throw new Error("No username and password provided!");
  }

  const userData = {
    username: name,
    password: password,
  };

  const encodedDat = new URLSearchParams(userData).toString();

  const res = await fetch("https://iguru.co.ke/BAIMS/ep/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodedDat,
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

export async function SummaryForm(recordData) {

  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const baID = user?.ba_id || "Unknown";
;

  const formData = new FormData(recordData);
  formData.append("ba_id", baID)

  // console.log("Submitting data:", Object.fromEntries(formData.entries()));

  const res = await fetch("https://iguru.co.ke/BAIMS/ep/BM.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.json(); // Handle as plain text
  if (res.ok) {
    console.log("submitted")
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

export async function fetchRecordData(phone) {
  const baPhone = {
    ba_phone: phone,
  };

  const encodedDat = new URLSearchParams(baPhone).toString();

  try {
    const response = await fetch(`https://iguru.co.ke/coke/api/REPORT.php/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedDat,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }
    const data = await response.text();

    return data;
  } catch (error) {
    console.log("Error found");
    console.error("Error fetching package data:", error);
    return error;
  }
}
