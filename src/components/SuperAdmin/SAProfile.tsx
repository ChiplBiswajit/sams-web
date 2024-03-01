import { superadminprofile } from "@/src/assets/SuperAdmin/dashboard";
import React, { useState } from "react";

export default function SAProfile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Sradhanjali Barik",
    contactNumber: "+91 8767546490",
    userType: "Super Admin",
    email: "chiplsuperadmin123@gmail.com",
    gender: "Female",
    password: "********",
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);

    // Close the dialog after submission
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    // Reset the form data
    setFormData({
      fullName: "Sradhanjali Barik",
      contactNumber: "+91 8767546490",
      userType: "Super Admin",
      email: "chiplsuperadmin123@gmail.com",
      gender: "Female",
      password: "********",
    });

    // Close the dialog without saving changes
    setIsDialogOpen(false);
  };
  return (
    <section className="h-screen p-2">
      <div className="bg-[#DCDFFF] w-full md:w-[84%] md:h-[88vh] h-[84vh] md:fixed rounded-lg shadow-2xl center flex flex-col items-center md:items-start">
        {" "}
        <span className="w-full items-center p-2 flex flex-col">
          <span className="h-32 w-32 bg-white rounded-full">
            <img src={superadminprofile.src} alt="loading..." className="p-1" />
          </span>
          <text className="text-xl font-serif font-semibold">@UserID001</text>
        </span>
        <div className="w-full flex flex-col md:gap-8 gap-5 mt-10 ">
          <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 px-8">
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Full Name:</span>
              <span className="text-base font-mono">Sradhanjali Barik</span>
            </div>
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Contact Number:</span>
              <span className="text-base font-mono">+91 8767546490</span>
            </div>
          </div>
          <div className="w-full flex  md:flex-row flex-col md:gap-0 gap-4 px-8">
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">User Type:</span>
              <span className="text-base font-mono">Super Admin</span>
            </div>
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Email ID:</span>
              <span className="text-base font-mono">
                chiplsuperadmin123@gmail.com
              </span>
            </div>
          </div>
          <div className="w-full flex  md:flex-row flex-col md:gap-0 gap-4 px-8">
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Gender:</span>
              <span className="text-base font-mono">Female</span>
            </div>
            <div className="w-[50%] flex-col flex md:items-center">
              <span className="font-bold text-lg ">Password:</span>
              <span className="text-base font-mono">********</span>
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
              Update Profile
            </h2>
            <form>
              <div className="w-full flex md:flex-row flex-col gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4  w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleInputChange("contactNumber", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="w-full flex md:flex-row flex-col gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    User Type
                  </label>
                  <select
                    value={formData.userType}
                    onChange={(e) =>
                      handleInputChange("userType", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Chipl Admin</option>
                    <option value="User">Fleet Admin</option>
                  </select>
                </div>
                <div className="mb-4  w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email ID
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="w-full flex md:flex-row flex-col gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4  w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
