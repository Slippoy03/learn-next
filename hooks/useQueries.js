import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(
    async ({ url = "", method = "GET" } = {}) => {
      try {
        const response = awaitfetch(url, { method });
        const result = await response.json();
        setData({
          ...data,
          data: result,
          isLoading: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
      }
    },
    [data]
  );

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl });
    }
  }, [fetchingData, prefixUrl]);

  return { ...data };
};
