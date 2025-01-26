// Show Sign-Up Page
function showSignUp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signUpPage").style.display = "block";
}

// Show Login Page
function showLogin() {
  document.getElementById("signUpPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// Handle Sign-Up
function handleSignUp(event) {
  event.preventDefault();

  const username = document.getElementById("signUpUsername").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password === confirmPassword) {
    // Save the new user credentials (this is just a simulation, you would use a database in a real app)
    localStorage.setItem(username, password); // Simulates saving credentials
    alert("Account created successfully! Please log in.");
    document.getElementById("menuGreeting").textContent = `Hello, welcome ${username}!`;
      showSection('Menu');
    // Redirect to profile page for profile setup
    showProfilePage();
  } else {
    document.getElementById("signUpError").style.display = "block";
  }
}

// Show Profile Setup Page
function showProfilePage() {
  document.getElementById("signUpPage").style.display = "none";
  document.getElementById("profilePage").style.display = "block";
}

// Handle Profile Information Submission
function handleProfileSubmission(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const dob = document.getElementById("dob").value;

  const birthDate = new Date(dob);
  const age = calculateAge(birthDate);

  // Save profile information to localStorage (simulation)
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("dob", dob);
  localStorage.setItem("age", age);

  alert("Profile created successfully!");
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

// Calculate Age from Date of Birth
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Update Age Field When Date of Birth is Selected
document.getElementById("dob").addEventListener("input", function() {
  const dob = new Date(this.value);
  const age = calculateAge(dob);
  document.getElementById("age").value = age;
});

// Handle Login (Updated)
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if the credentials match what was "saved" during sign-up
  const storedPassword = localStorage.getItem(username); // Simulates fetching credentials
  if (storedPassword && storedPassword === password) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

// Show the relevant section
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.tracker-section');
  sections.forEach(section => section.style.display = 'none');
  
  // Show the selected section
  const sectionToShow = document.getElementById(sectionId);
  sectionToShow.style.display = 'block';
}

const weightEntries = JSON.parse(localStorage.getItem("weightEntries")) || [];

// Track Weight
function trackWeight() {
  const weightInput = document.getElementById("weightInput").value;
  const weightStatus = document.getElementById("weightStatus");
  
  if (weightInput) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    // Save the weight and date entry
    weightEntries.push({ date: formattedDate, weight: weightInput });
    localStorage.setItem("weightEntries", JSON.stringify(weightEntries));

    // Update status message
    weightStatus.textContent = `Your current weight is ${weightInput} kg. Tracked on ${formattedDate}`;
    displayWeightTable();
  } else {
    weightStatus.textContent = "Please enter a valid weight.";
  }
}

// Delete Weight Entry
function deleteWeightEntry(index) {
  weightEntries.splice(index, 1); // Remove the entry at the specified index
  localStorage.setItem("weightEntries", JSON.stringify(weightEntries));
  displayWeightTable(); // Refresh the table after deletion
}

// Display Weight Table
function displayWeightTable() {
  const tableBody = document.querySelector("#weightTable tbody");
  tableBody.innerHTML = ""; // Clear existing entries

  weightEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    
    const dateCell = document.createElement("td");
    dateCell.textContent = entry.date;
    dateCell.style.border = "1px solid black";
    dateCell.style.padding = "8px";
    
    const weightCell = document.createElement("td");
    weightCell.textContent = entry.weight;
    weightCell.style.border = "1px solid black";
    weightCell.style.padding = "8px";
    
    // Create the delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteWeightEntry(index);
    deleteCell.style.border = "1px solid black";
    deleteCell.style.padding = "8px";
    deleteCell.appendChild(deleteButton);

    row.appendChild(dateCell);
    row.appendChild(weightCell);
    row.appendChild(deleteCell);
    tableBody.appendChild(row);
  });
}

// Load weight entries on page load
document.addEventListener("DOMContentLoaded", displayWeightTable);


// Medicine Reminder (Handles Multiple Reminders)
function setMedicineReminder() {
  const medicineInput = document.getElementById("medicineInput").value;
  const medicineTime = document.getElementById("medicineTime").value;
  const medicineReminderStatus = document.getElementById("medicineReminderStatus");

  if (medicineInput && medicineTime) {
    // Fetch existing reminders from localStorage or initialize as an empty array
    const reminders = JSON.parse(localStorage.getItem("medicineReminders")) || [];

    // Add new reminder to the list
    reminders.push({ medicine: medicineInput, time: medicineTime });

    // Save updated reminders back to localStorage
    localStorage.setItem("medicineReminders", JSON.stringify(reminders));

    // Update the display with the new reminder
    displayMedicineReminders();

    // Clear input fields
    document.getElementById("medicineInput").value = "";
    document.getElementById("medicineTime").value = "";

    medicineReminderStatus.textContent = `Reminder set: Take ${medicineInput} at ${medicineTime}.`;
  } else {
    medicineReminderStatus.textContent = "Please fill in both fields.";
  }
}

const reminders = JSON.parse(localStorage.getItem("medicineReminders")) || [];

// Display All Medicine Reminders
function displayMedicineReminders() {
  const reminderList = document.getElementById("medicineReminderList");
  reminderList.innerHTML = ""; // Clear existing reminders

  reminders.forEach((reminder, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Medicine: ${reminder.medicine}, Time: ${reminder.time}`;

    // Add a delete button for each reminder
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteMedicineReminder(index);
    listItem.appendChild(deleteButton);

    reminderList.appendChild(listItem);
  });
}

// Set Medicine Reminder
function setMedicineReminder() {
  const medicine = document.getElementById('medicineInput').value;
  const time = document.getElementById('medicineTime').value;
  const reminderTime = new Date();
  const [hours, minutes] = time.split(':');
  reminderTime.setHours(hours, minutes, 0, 0);

  if (medicine && time) {
    reminders.push({ medicine, time: reminderTime.toLocaleTimeString() });
    localStorage.setItem("medicineReminders", JSON.stringify(reminders));
    displayMedicineReminders();
    document.getElementById('medicineReminderStatus').innerText = `Reminder set for ${medicine} at ${time}`;

    // Start checking the reminder time
    checkReminder();
  } else {
    document.getElementById('medicineReminderStatus').innerText = 'Please enter valid details.';
  }
}

// Delete a Specific Medicine Reminder
function deleteMedicineReminder(index) {
  reminders.splice(index, 1);
  localStorage.setItem("medicineReminders", JSON.stringify(reminders));
  displayMedicineReminders();
}

// Check for reminders
function checkReminder() {
  setInterval(() => {
    const currentTime = new Date();
    reminders.forEach((reminder) => {
      const [hours, minutes] = reminder.time.split(':');
      if (currentTime.getHours() === parseInt(hours) &&
          currentTime.getMinutes() === parseInt(minutes) &&
          currentTime.getSeconds() === 0) {
        alert(`It's time to take your medicine: ${reminder.medicine}`);
      }
    });
  }, 1000); // Check every second
}

// Load reminders on page load
document.addEventListener("DOMContentLoaded", displayMedicineReminders);



// Appointment Reminder
function setAppointmentReminder() {
  const appointmentDate = document.getElementById("appointmentDate").value;
  const appointmentReminderStatus = document.getElementById("appointmentReminderStatus");

  if (appointmentDate) {
    appointmentReminderStatus.textContent = `Appointment set for ${appointmentDate}.`;
  } else {
    appointmentReminderStatus.textContent = "Please choose a valid date.";
  }
}

// Food Suggestions
// Food Suggestions for Each Trimester
function showFoodSuggestions() {
  const trimester = prompt(
    "Enter your trimester (1 for First, 2 for Second, 3 for Third):"
  );

  const foodSuggestions = document.getElementById("foodSuggestions");
  foodSuggestions.innerHTML = ""; // Clear any previous suggestions

  let foodList = [];
  let additionalInfo = "";

  switch (trimester) {
    case "1":
      foodList = [
        "Folic acid-rich foods (leafy greens, citrus fruits, legumes, fortified cereals)",
        "Easily digestible carbohydrates (rice, toast)",
        "Ginger for nausea relief",
        "Plenty of fluids",
      ];
      additionalInfo = "* Limit: Caffeine, alcohol, and raw or undercooked foods.";
      break;

    case "2":
      foodList = [
        "Iron-rich foods (red meat, poultry, fortified cereals, beans, spinach)",
        "Calcium-rich foods (dairy products, leafy greens, almonds)",
        "A variety of fruits and vegetables",
      ];
      additionalInfo =
        "* Consider: Increasing protein intake to support fetal growth.";
      break;

    case "3":
      foodList = [
        "Calcium-rich foods (dairy products, leafy greens, almonds)",
        "Fiber-rich foods to prevent constipation",
        "Fluids to stay hydrated",
      ];
      additionalInfo =
        "* Limit: Large meals to avoid heartburn, spicy foods if they cause discomfort.";
      break;

    default:
      alert("Invalid trimester. Please enter 1, 2, or 3.");
      return;
  }

  const generalGuidelines = [
    "Prioritize whole foods: Choose fruits, vegetables, whole grains, lean protein, and healthy fats.",
    "Limit processed foods: Reduce intake of sugary drinks, fast food, and processed snacks.",
    "Hydration: Drink plenty of water throughout the day.",
    "Mindful eating: Pay attention to your body's signals and eat when you're hungry.",
  ];

  const nutrientInfo = [
    "Folic Acid: Crucial for neural tube development (baby's brain and spinal cord). Start taking supplements (400-800 mcg) even before conception and continue throughout the first trimester.",
    "Iron: Prevents anemia in the mother. Sources: red meat, poultry, fortified cereals, beans, spinach.",
    "Calcium: Builds strong bones for the baby. Sources: dairy products, leafy greens, almonds.",
    "Vitamin D: Aids in calcium absorption. Sources: fatty fish, fortified milk, sunlight exposure.",
    "Omega-3 Fatty Acids: Important for brain development. Sources: fatty fish, flaxseeds, walnuts.",
    "Protein: Builds and repairs tissues. Sources: meat, poultry, fish, lentils, eggs, beans, dairy products.",
  ];

  // Add food suggestions
  foodList.forEach((food) => {
    const listItem = document.createElement("li");
    listItem.textContent = food;
    foodSuggestions.appendChild(listItem);
  });

  // Add additional trimester info
  if (additionalInfo) {
    const infoItem = document.createElement("p");
    infoItem.textContent = additionalInfo;
    infoItem.style.fontStyle = "italic";
    foodSuggestions.appendChild(infoItem);
  }

  // Add general guidelines
  const guidelineHeader = document.createElement("h3");
  guidelineHeader.textContent = "General Dietary Guidelines:";
  foodSuggestions.appendChild(guidelineHeader);

  generalGuidelines.forEach((guideline) => {
    const guidelineItem = document.createElement("li");
    guidelineItem.textContent = guideline;
    foodSuggestions.appendChild(guidelineItem);
  });

  // Add nutrient information
  const nutrientHeader = document.createElement("h3");
  nutrientHeader.textContent = "Important Nutritional Information:";
  foodSuggestions.appendChild(nutrientHeader);

  nutrientInfo.forEach((nutrient) => {
    const nutrientItem = document.createElement("li");
    nutrientItem.textContent = nutrient;
    foodSuggestions.appendChild(nutrientItem);
  });
}
let storedUserData = {}; // Object to store Name and Password after sign-up

async function handleSignUp(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const username = document.getElementById('signUpUsername').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const signUpError = document.getElementById('signUpError');
  const signUpMessage = document.getElementById('signUpMessage');

  // Clear previous error/message
  signUpError.style.display = 'none';
  signUpMessage.style.display = 'none';

  // Validate password confirmation
  if (password !== confirmPassword) {
    signUpError.textContent = 'Passwords do not match. Please try again.';
    signUpError.style.display = 'block';
    return;
  }

  // Temporarily store user credentials
  storedUserData = {
    Name: username,
    Password: password,
  };

  // Prepare data for Airtable
  const data = {
    fields: {
      Name: username,
      Password: password,
    },
  };

  try {
    setTimeout(() => {
      showProfileSetup(); // Call the function to display the Profile Setup page
    }, 1000); 

  } catch (error) {
    console.error(error);
    signUpError.textContent = 'An error occurred while saving data to Airtable. Please try again.';
    signUpError.style.display = 'block';
  }
}

// Function to display the Profile Setup page
function showProfileSetup() {
  document.getElementById('signUpPage').style.display = 'none'; // Hide sign-up page
  document.getElementById('profilePage').style.display = 'block'; // Show profile setup page
}

// Function to display the Sign-Up page
function showSignUp() {
  document.getElementById('loginPage').style.display = 'none'; // Hide login page
  document.getElementById('signUpPage').style.display = 'block'; // Show sign-up page
}

// Function to display the Login page
function showLogin() {
  document.getElementById('signUpPage').style.display = 'none'; // Hide sign-up page
  document.getElementById('loginPage').style.display = 'block'; // Show login page
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// Handle Profile Form Submission
async function handleProfileSubmission(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const fullName = document.getElementById('fullName').value;
  const dob = document.getElementById('dob').value;
  const age = document.getElementById('age').value;
  const profileError = document.getElementById('profileError');
  const profileMessage = document.getElementById('profileMessage');

  // Clear previous error/message
  profileError.style.display = 'none';
  profileMessage.style.display = 'none';

  // Ensure required fields are filled
  if (!fullName || !dob || !age) {
    profileError.textContent = 'All fields are required. Please fill in all fields.';
    profileError.style.display = 'block';
    return;
  }

  // Prepare data for Airtable
  const data = {
    fields: {
      ...storedUserData, // Include Name and Password from sign-up
      FullName: fullName,
      DateOfBirth: dob,
      Age: age,
    },
  };

  try {
    // Replace with your actual Airtable Base ID, Table Name, and API Key
    const response = await fetch('https://api.airtable.com/v0/app2DOrYy6ZxOLpcv/Table 1', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer patR4p9qmbyu52Z3r.9a4b62a280f3b5ea238ef3e103979bcddf7bc82269abb822908f46c62f039cb4',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      profileMessage.textContent = 'Profile saved successfully! Redirecting to the main app...';
      profileMessage.style.display = 'block';

      // Clear form fields
      document.getElementById('profileForm').reset();

      // Redirect to the main app page after a short delay
      setTimeout(() => {
        showAppPage(); // Call the function to display the main app page
      }, 1000); // 1-second delay
    } else {
      throw new Error('Failed to save profile data to Airtable.');
    }
  } catch (error) {
    console.error(error);
    profileError.textContent = 'An error occurred while saving your profile. Please try again.';
    profileError.style.display = 'block';
  }
}

// Function to display the Main App Page
function showAppPage() {
  document.getElementById('profilePage').style.display = 'none'; // Hide profile page
  document.getElementById('appPage').style.display = 'block'; // Show main app page
}


// Default to showing
showSection('Menu');
