const tabs = document.querySelectorAll(".tab-btn");
const title = document.getElementById("meetingTitle");
const scheduleBtn = document.getElementById("scheduleBtn");
const meetingList = document.getElementById("meetingList");

let selectedType = "gd";

const meetingLabels = {
  gd: "Group Discussion",
  jam: "JAM",
  class: "Daily Class"
};

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
    title.textContent = `Schedule ${meetingLabels[selectedType]}`;
  });
});

scheduleBtn.addEventListener("click", () => {
  const meetingId = `${selectedType}_${Date.now()}`;
  const joinUrl = "https://teams.microsoft.com/l/meetup-join/dummy-link";

  const newMeeting = {
    id: meetingId,
    type: selectedType,
    label: meetingLabels[selectedType],
    link: joinUrl
  };

  const meetings = JSON.parse(localStorage.getItem("scheduled_meetings") || "[]");
  meetings.push(newMeeting);
  localStorage.setItem("scheduled_meetings", JSON.stringify(meetings));
  loadMeetings();
});

function loadMeetings() {
  meetingList.innerHTML = "";
  const meetings = JSON.parse(localStorage.getItem("scheduled_meetings") || "[]");

  meetings.forEach((meeting) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${meeting.label} scheduled!
      <a href="${meeting.link}" target="_blank" class="join-btn">Join</a>
    `;
    meetingList.appendChild(li);
  });
}

loadMeetings();
