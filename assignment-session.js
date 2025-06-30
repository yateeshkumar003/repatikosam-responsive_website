const questions = {
  htmlcssjs: [
    "Design a responsive navbar using HTML, CSS, and JS.",
    "Create a portfolio webpage with animations."
  ],
  javascript: [
    "Write a JavaScript function to debounce input.",
    "Implement a dynamic todo list using localStorage."
  ],
  c: [
    "Write a program to find factorial using recursion.",
    "Implement a simple calculator using switch-case."
  ],
  cpp: [
    "Create a class for BankAccount with deposit and withdraw functions.",
    "Use inheritance to model shapes: circle, rectangle."
  ],
  java: [
    "Implement hierarchical inheritance in Java.",
    "Create a Java program using custom exceptions."
  ],
  python: [
    "Write a Python program to check for palindrome.",
    "Create a class Student with attributes and display method."
  ],
  sql: [
    "Write a query to fetch top 3 highest salaries per department.",
    "Normalize a hospital table up to BCNF."
  ],
  cloud: [
    "Explain the difference between IaaS, PaaS, and SaaS.",
    "Deploy a static website using AWS S3 and CloudFront.",
    "What is the role of IAM in AWS security?",
    "Demonstrate setting up a VM on Google Cloud Platform."
  ]
};

const container = document.getElementById("questionContainer");
const select = document.getElementById("categorySelect");

function loadQuestions(category) {
  container.innerHTML = "";
  questions[category].forEach((q, index) => {
    const id = `${category}_q${index}`;
    const storedAns = localStorage.getItem(id) || "";

    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <h3>Q${index + 1}: ${q}</h3>
      <button onclick="toggleEditor('${id}')">
        ${storedAns ? "Re-Edit Answer" : "Upload Answer"}
      </button>
      <div id="${id}_editor" style="display: ${storedAns ? 'block' : 'none'};">
        <textarea id="${id}_textarea">${storedAns}</textarea>
        <button onclick="saveAnswer('${id}')">💾 Save Answer</button>
      </div>
    `;
    container.appendChild(div);
  });
}

window.toggleEditor = function (id) {
  const editor = document.getElementById(`${id}_editor`);
  editor.style.display = editor.style.display === "none" ? "block" : "none";
};

window.saveAnswer = function (id) {
  const textarea = document.getElementById(`${id}_textarea`);
  const value = textarea.value.trim();
  localStorage.setItem(id, value);
  alert("✅ Answer saved locally!");
};

select.addEventListener("change", (e) => {
  loadQuestions(e.target.value);
});

// Load initial category
loadQuestions(select.value);
