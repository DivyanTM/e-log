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
            sessionStorage.setItem('username',result.data.username);

            const base64Url = result.token.split(".")[1]; 
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedData = JSON.parse(atob(base64));
        
            if(decodedData.user.role_id===2){
                window.location='CEDashboard.html';
            }else if(decodedData.user.role_id===1){
                window.location='index.html';
            }
            // window.location = 'index.html';
        } else {
            alert(result.data.message || 'Invalid credentials');
        }
    } catch (error) {
        alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
});
