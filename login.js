const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');
const loginForm = document.getElementById('login-form');
const signUpForm = document.querySelector('.sign-up form');

signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signUp');
    wrapper.classList.remove('animate-signIn');
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/ttkh');
        const data = await response.json();

        const user = data.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Đăng nhập thành công');
            window.location.href = 'home.html'
        } else {
            alert('Tên đăng nhập hoặc mật khẩu sai');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Xảy ra lỗi hãy kiểm tra kết nối');
    }
});

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    const newUser = {
        username,
        email,
        password
    };

    try {
        const response = await fetch('http://localhost:3000/ttkh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            alert('Đăng ký thành công');
            signInLink.click();
        } else {
            alert('Đăng ký thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Xảy ra lỗi hãy kiểm tra kết nối');
    }
});