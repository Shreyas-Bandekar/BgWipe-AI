import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(0); // Initialize with 0 instead of false
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      console.log("Client token:", token ? "Token received" : "No token");

      if (!token) {
        console.warn("No authentication token available");
        toast.error("Please sign in to continue");
        return;
      }

      // Decode token to see its structure (for debugging)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decoded = JSON.parse(jsonPayload);
        console.log("Client-side decoded token - sub:", decoded.sub, "exp:", new Date(decoded.exp * 1000));
      } catch (decodeError) {
        console.warn("Could not decode token on client:", decodeError);
      }

      const response = await axios.get(backendUrl + `/api/user/credits`, {
        headers: {
          token: token,
        },
      });

      console.log("Credits response:", response.data);

      if (response.data.success) {
        setCredit(response.data.userCredits);
        console.log("Credits loaded successfully:", response.data.userCredits);
        // Only show toast if credits are low
        if (response.data.userCredits <= 1 && response.data.userCredits > 0) {
          toast.warning(`⚠️ Low credits: ${response.data.userCredits} remaining`);
        } else if (response.data.userCredits === 0) {
          toast.error("❌ No credits remaining. Please purchase more credits.");
        }
      } else {
        console.warn("Failed to load credits:", response.data.message);
        setCredit(0);
        toast.error(response.data.message || "Failed to load credits");
      }
    } catch (error) {
      console.error("Credits error:", error);
      setCredit(0);

      // More specific error handling
      if (error.response?.status === 404) {
        toast.error("User account not found. Creating account...");
        // Retry once after a short delay to allow account creation
        setTimeout(() => loadCreditsData(), 2000);
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please try logging in again.");
        openSignIn();
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to load credits");
      }
    }
  };

  const removeBg = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      if (!image) {
        toast.error("Please select an image first");
        return;
      }

      // Validate file type
      if (!image.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (image.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }

      setImage(image);
      setResultImage(false);
      setIsProcessing(true);

      navigate("/result");

      const token = await getToken();

      const formData = new FormData();
      formData.append("image", image); // Server expects 'image' field name

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-bg",
        formData,
        { 
          headers: { 
            token,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      console.log("Background removal response:", data);

      if (data.success) {
        setResultImage(data.resultImage);
        
        // Always update credit balance from server response
        if (data.creditBalance !== undefined) {
          setCredit(data.creditBalance);
          console.log("Updated credit balance:", data.creditBalance);
        }
        
        // Show different message based on whether this was a free removal
        if (data.freeUsed) {
          toast.success("🎉 Free background removal used successfully!");
        } else {
          toast.success(`✨ Background removed successfully! Credits remaining: ${data.creditBalance}`);
        }
      } else {
        toast.error(data.message || "Failed to remove background");
        
        // Update credit balance even on failure (in case credits were deducted)
        if (data.creditBalance !== undefined) {
          setCredit(data.creditBalance);
        }
        
        // Navigate back to home on error
        navigate("/");
      }
    } catch (error) {
      console.error("Background removal error:", error);
      
      if (error.response?.status === 413) {
        toast.error("Image file is too large. Please try a smaller image.");
      } else if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to remove background");
      }
      
      // Navigate back to home on error
      navigate("/");
    } finally {
      setIsProcessing(false);
    }
  };



  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
    isProcessing,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;