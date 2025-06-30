const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "text/x-csrc", // default to C
  theme: "default"
});

document.getElementById("language").addEventListener("change", function () {
  const langId = this.value;
  if (langId === "71") {
    editor.setOption("mode", "python");
  } else if (langId === "62") {
    editor.setOption("mode", "text/x-java");
  } else {
    editor.setOption("mode", "text/x-csrc");
  }
});

async function runCode() {
  const code = editor.getValue();
  const stdin = document.getElementById("stdin").value;
  const languageId = document.getElementById("language").value;
  const outputEle = document.getElementById("output");

  outputEle.innerText = "⏳ Running...";

  try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "1a4e8cc276msh33b832ea5b8dea2p1377d5jsn6f812632f2eb", // ✅ Replace with your valid key
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: stdin
      })
    });

    const result = await response.json();
    outputEle.innerText = result.stdout || result.stderr || result.compile_output || "⚠️ No output returned.";
  } catch (error) {
    outputEle.innerText = "❌ Error executing code:\n" + error;
  }
}

// ⏱️ Stopwatch Logic
let seconds = 0;
let maxMinutes = 15; // session length in minutes
let stopwatch = setInterval(() => {
  seconds++;
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  document.getElementById("timer").innerText = `⏱️ ${mins}:${secs}`;

  if (seconds >= maxMinutes * 60) {
    clearInterval(stopwatch);
    alert("⏰ Time's up! Your session has ended.");
    window.location.href = "home.html"; // 🔁 redirect or replace with desired page
  }
}, 1000);

// ❌ Quit button logic
function quitSession() {
  if (confirm("Are you sure you want to quit this coding session?")) {
    clearInterval(stopwatch);
   window.location.href = "../../home.html";
 // if home.html is one folder up
// 🔁 replace with your homepage
  }
}
