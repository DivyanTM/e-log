$('#login').on('click', async () => {
    const username = $('#username').val();
    const password = $('#password').val();

    if (!username) {
        alert('Enter username');
        return;
    }
    if (!password) {
        alert('Enter password');
        return;
    }

    try {
        const result = await api.login(username, password);
        if (result.token) {
            sessionStorage.setItem('token', result.token);
            window.location = 'index.html';
        } else {
            alert(result.data.message || 'Invalid credentials');
        }
    } catch (error) {
        alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
});
