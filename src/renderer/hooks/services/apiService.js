// apiService.js
export const fetchData = async (url, headers) => {
  try {
    const response = await fetch(url, { headers, method: 'GET' });
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    return null;
  }
};
