// useFetchData.js
import { useState, useEffect } from 'react';
import { fetchData } from './apiService';

export const useFetchData = (url, headers, dependencies = []) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(url, headers);
      if (result) {
        setData(result);
      }
    };
    getData();
  }, dependencies);

  return data;
};
