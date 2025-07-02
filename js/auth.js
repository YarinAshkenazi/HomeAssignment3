// login
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      alert('All fields must be filled');
      return;
    }

    const users = JSON.parse(localStorage.getItem('usersList') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      alert('Incorrect username or password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`WELCOME, ${user.username}!`);
    window.location.href = 'index.html';
  });
});




//register

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (username === "" || password === "") {
      alert("All fields must be filled");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const users = JSON.parse(localStorage.getItem("usersList") || "[]");

    // Check if the user already exists
    const exists = users.some(user => user.username === username);
    if (exists) {
      alert("Username already exists. Try a different one.");
      return;
    }

    // Add the new user to the list
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("usersList", JSON.stringify(users));

    // Auto-login
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "index.html";
  });
});