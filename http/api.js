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

// submit records
export async function SummaryForm(recordData) {

  const token = await AsyncStorage.getItem("token");
  const {record} = recordData


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


  const formData = new FormData();





   formData.append("ba_id", baID);

  Object.entries(record).forEach(([key, value]) => {
    if(key === "t_date"){
      const date = new Date(value)
     if(isNaN(date.getDate())){
      throw new Error("Invalid date input")
     }

     const formattedDate = date.toISOString().split("T")["0"]
     formData.append(key, formattedDate)

    } else if(typeof value === "object"){
      const trueKeys = Object.entries(value)
      .filter(([keyTwo, valueTwo]) => valueTwo === true) // Keep only true values
      .map(([keyTwo]) => keyTwo); // Extract keys

    if (trueKeys.length > 0) {
      formData.append(key, trueKeys); // Store the array under the main key
    }

    }else{
      formData.append(key, value);
    }
  });

  const res = await fetch("https://iguru.co.ke/BAIMS/ep/BM.php", {
    method: "POST",
    body: formData,
  });



  const data = await res.json(); // Handle as plain text
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

// edit records
export async function RecordEditForm(recordData) {

  const token = await AsyncStorage.getItem("token");
   const {record} = recordData;


  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
     user= JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const baID = user?.ba_id || "Unknown";


  const formData = new FormData();
  formData.append("ba_id", baID)

  Object.entries(record).forEach(([key, value]) => {
  if(key === "t_date") {
        const date = new Date(value)
       if(isNaN(date.getDate())){
        throw new Error("Invalid date input")
       }
       const formattedDate = date.toISOString().split("T")["0"]
       formData.append(key, formattedDate)
    }else if(key === "r_id"){
      formData.append("record_id", value)
    }else if(typeof value === "object"){
      const trueKeys = Object.entries(value)
      .filter(([keyTwo, valueTwo]) => valueTwo === true) // Keep only true values
      .map(([keyTwo]) => keyTwo); // Extract keys

    if (trueKeys.length > 0) {
      formData.append(key, trueKeys); // Store the array under the main key
    }

    }else {
      formData.append(key, value);
    }
  });


  const res = await fetch("https://iguru.co.ke/BAIMS/ep/UPDATE-RECORD.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.json(); // Handle as plain text

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
export async function fetchRecordByDate(requestData) {

  const {formattedDate, ba_id, formID} = requestData;

  const fetchData = {
    ba_id: ba_id,
    form_id: formID,
    filter_date: formattedDate
  }

  const encodedData = new URLSearchParams(fetchData).toString();

  try {
    const response = await fetch(`https://iguru.co.ke/BAIMS/ep/FORM-DATA.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedData,
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


// export filteredData

export function filterAndSetFormState(record) {
  const formState = {}; // New object to store filtered values

  Object.entries(record).forEach(([key, value]) => {
    // Only keep keys that are NOT numbers
    if (isNaN(key)) {
      formState[key] = value;
    }
  });

  return formState;
}