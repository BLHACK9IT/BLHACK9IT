      // Base API Configuration
      export const API_BASE_URL = 'http://ddd4-105-117-1-12.ngrok-free.app/api/controllers/';

      // Error handler utility 
      export const handleApiError = (error) => {
        console.error('API Error:', error);
        
        if (error.message.includes('Failed to fetch')) {
          return 'Network error - please check your connection';
        }
        
        return error.message || 'An unexpected error occurred';
      };

      // Auth endpoints
      export const AuthAPI = {
      login: async (email, password) => {
          const response = await fetch(`http://ddd4-105-117-1-12.ngrok-free.app/api/controllers/auth.php?action=login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }
          
          return await response.json();
        },

        register: async (userData) => {
          const response = await fetch(`http://ddd4-105-117-1-12.ngrok-free.app/api/controllers/auth.php?action=register`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
          });
          return await response.json();
        }
      };