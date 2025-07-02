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