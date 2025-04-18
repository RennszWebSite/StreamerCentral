interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    username: string;
  };
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Login failed:', {
        status: response.status,
        statusText: response.statusText,
        message: data.message
      });
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login',
    };
  }
}
