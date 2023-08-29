import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry(failureCount, error) {
          if (failureCount >= 3) {
            return false;
          }
  
          if (error instanceof Error && axios.isAxiosError(error)) {
            if (
              error.response?.status &&
              error.response.status >= 400 &&
              error.response.status < 500
            ) {
              return false;
            }
          }
  
          return true;
        },
      },
    },
  });

export default queryClient;
