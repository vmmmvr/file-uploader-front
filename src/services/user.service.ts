import { useMutation, useQuery } from "@tanstack/react-query";
import { getFilesRequest, getMeRequest, loginRequest, signupRequest, uploadFileRequest } from "./api";
import { UserloginRequest, UserSignupRequest } from "../interface/user";
import Cookies from 'js-cookie';


// Create a custom hook for user login
export const useUserLogin = () => {
    return useMutation({
      mutationFn: (data: UserloginRequest) => loginRequest(data),
      mutationKey: ["userLogin"],
      onSuccess: (data) => {
        console.log("Login successful", data);
        // Handle the success (e.g., storing token, redirecting)
      },
      onError: (error: any) => {
        console.error('Login failed:', error.response?.data);
      },
    });
  };


export const useUserSignup = () => {
    return useMutation({
      mutationFn: (data: UserSignupRequest) => signupRequest(data),
      mutationKey: ["userSignup"],
      onSuccess: (data) => {
        console.log("Signup successful", data);
        // Handle the success (e.g., storing token, redirecting)
      },
      onError: (error: any) => {
        console.error('Signup failed:', error.response?.data);
      },
    });
  };


  export const useGetMeQuery = () => {
    const token = Cookies.get('authToken') ?? "";  // Get the token from cookies
  
    // Use the useQuery hook from React Query to fetch the data
    return useQuery({
        queryKey: ['getMe'],
        queryFn: () => getMeRequest({ token }), 
        staleTime: Infinity, // Cache user data indefinitely until a logout happens
        retry: false,
        // Fetch user data by passing the token
      });
  };

  export const useFilesQuery = () => {
    const token = Cookies.get('authToken') ?? "";  // Get the token from cookies
  
    // Use the useQuery hook from React Query to fetch the data
    return useQuery({
        queryKey: ['getFiles'],
        queryFn: () => getFilesRequest({ token }), 
        retry: 2,
        // Fetch user data by passing the token
      });
  };


 

  
export const useUploadFileMutation = () => {
    // Retrieve the token from cookies
    const token = Cookies.get('authToken') ?? "";
  
    // Define the mutation function
    const mutationFn = ({ file, onUploadProgress } : {file: any, onUploadProgress: any}) => {
      return uploadFileRequest({
        file,
        token,
        onUploadProgress,
      });
    };
  
    // Use the mutation hook with the mutation function and options
    return useMutation(  {
        mutationFn: ({ file, onUploadProgress } : any) => uploadFileRequest({file, token, onUploadProgress }),
      mutationKey: ["uploadFile"],
      onSuccess: (data: any) => {
        console.log('File upload success:', data);
      },
      onError: (error: any) => {
        console.error('Upload error:', error);
      },
    });
  };