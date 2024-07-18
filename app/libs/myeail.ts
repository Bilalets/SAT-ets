// myemail.ts

const isBrowser = typeof window !== 'undefined';

// Set email to localStorage
export const setEmail = (email: string) => {
  if (isBrowser) {
    localStorage.setItem('userEmail', email);
  }
};

// Get email from localStorage
export const getEmail = () => {
  if (isBrowser) {
    return localStorage.getItem('userEmail');
  }
  return null; // Or handle the case where localStorage is not available
};
