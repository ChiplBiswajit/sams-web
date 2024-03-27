import { superadminprofile } from "@/src/assets/SuperAdmin/dashboard";
import React, { useCallback, useEffect, useState } from "react";

export default function SAProfile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    userId: "",
    emailId: "",
    gender: "",
    password: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
    updateProfileData(); // Call the function to update profile data

    // Close the dialog after submission
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    // Reset the form data
    const userDataString = sessionStorage.getItem("ProfileData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setFormData({
        name: userData.name,
        contactNo: userData.contactNo,
        userId: userData.userId,
        emailId: userData.emailId,
        gender: userData.gender,
        password: "********",
      });

      // Close the dialog without saving changes
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const userDataString = sessionStorage.getItem("ProfileData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setFormData({
        name: userData.name || "NA",
        contactNo: userData.contactNo || "NA",
        userId: userData.userId || "NA",
        emailId: userData.emailId || "NA",
        gender: userData.gender || "NA",
        password: "********", // Assuming password is not included in the profile data
      });
    }
  }, []);

  const updateProfileData = useCallback(async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      const userId = formData.userId; // Assuming userId is available in formData

      // const API_URL = `https://0r4mtgsn-3006.inc1.devtunnels.ms/users/updateProfile/${userId}`;
      const API_URL = `https://sams.24x7healthcare.lives/users/updateProfile/${userId}`;

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        // Optionally, you can perform any actions after successful update
      } else {
        console.error("Failed to update profile");
        // Handle error case here
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
      // Handle error case here
    }
  }, [formData.userId, formData, sessionStorage]);

  return (
    <section className="h-screen p-2">
      <div className="bg-[#DCDFFF] w-full md:w-[84%] md:h-[88vh] h-[84vh] md:fixed rounded-lg shadow-2xl center flex flex-col items-center md:items-start">
        {" "}
        <span className="w-full items-center pt-10 flex flex-col">
          <span className="h-24 w-24 bg-white rounded-full">
            <img src={superadminprofile.src} alt="loading..." className="p-1" />
          </span>
          <span className="font-bold text-lg ">User ID:</span>
          <span className="text-base font-serif  font-medium">
            {formData.userId}
          </span>
        </span>
        <div className="w-full flex flex-col md:gap-8 gap-5 mt-10 ">
          <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 px-8">
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Full Name:</span>
              <span className="text-base font-mono">{formData.name}</span>
            </div>
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Contact Number:</span>
              <span className="text-base font-mono">{formData.contactNo}</span>
            </div>
          </div>
          <div className="w-full flex  md:flex-row flex-col md:gap-0 gap-4 px-8">
            {/* <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">User Type:</span>
              <span className="text-base font-mono">Super Admin</span>
            </div> */}
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Gender:</span>
              <span className="text-base font-mono">{formData.gender}</span>
            </div>
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Email ID:</span>
              <span className="text-base font-mono">{formData.emailId}</span>
            </div>
          </div>
          <div className="w-full flex  md:flex-row flex-col md:gap-0 gap-4 px-8">
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Password:</span>
              <span className="text-base font-mono">{formData.password}</span>
            </div>
          </div>
        </div>
        <div className=" w-full center py-10">
          <button
            className="button-Profile-page"
            onClick={() => setIsDialogOpen(true)}
            role="button"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Update Profile Dialog */}
      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white  p-8 w-[70%] h-[70vh]  rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Edit Profile
            </h2>
            <form>
              <div className="w-full flex md:flex-row flex-col gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4  w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactNo}
                    onChange={(e) =>
                      handleInputChange("contactNo", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="w-full flex md:flex-row flex-col gap-4">
                <div className="mb-4  w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email ID
                  </label>
                  <input
                    type="text"
                    value={formData.emailId}
                    onChange={(e) =>
                      handleInputChange("emailId", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="flex w-full md:pt-10 pt-20 justify-end center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="button-Profile-page-cancel "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="button-Profile-page"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
