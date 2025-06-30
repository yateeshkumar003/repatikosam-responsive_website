// mock-session.js

document.getElementById("scheduleMeetingBtn").addEventListener("click", () => {
  alert("This will redirect to Microsoft Teams auth and schedule a meeting.");
  // TODO: Implement Microsoft OAuth login and Teams API call
});

// Simulate and load existing meetings from localStorage
function loadMeetings() {
  const meetings = JSON.parse(localStorage.getItem("mock_meetings") || "[]");
  const list = document.getElementById("meetingsList");
  list.innerHTML = "";

  if (meetings.length === 0) {
    list.innerHTML = "<li>No scheduled meetings yet.</li>";
  } else {
    meetings.forEach((meeting) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${meeting.title}</strong><br><small>${meeting.time}</small>`;
      list.appendChild(li);
    });
  }
}

loadMeetings();
