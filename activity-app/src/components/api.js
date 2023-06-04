export const registerUser = async (email, phone, password, fullname) => {
    const url = 'http://localhost:3016/users/register';
    const requestBody = {
      email: email,
      phone_number: phone,
      password: password,
      full_name: fullname,
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error('Registration failed');
    }
  
    const data = await response.json();
    return data;
  };
  
  export const loginUser = async (email, password) => {
    const url = 'http://localhost:3016/users/login';
    const requestBody = {
      email: email,
      password: password,
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    const token = data.token; 
    return token;
  };
  