import React, { useState } from "react";
import { Input } from "../../components/input";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  name: string;
  email: string;
  DOB: string;
  LGA: string;
  phoneNumber: string;
  password: string;
  confirmPsw: string;
  gender: string;
  preferedName: string;
}

interface IResponse {
  message: string;
}

export const SignUpUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    DOB: "",
    LGA: "",
    phoneNumber: "",
    password: "",
    confirmPsw: "",
    gender: "",
    preferedName: "",
  });
const { confirmPsw, ...newFormData } = formData;
  const { mutate, isPending, error, isError } = useMutation<IResponse>({
    mutationFn: async () => {
      const res = await fetch(
        `http://localhost:8000/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFormData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error, newFormData)
        throw new Error(error && data.error || "Failed to register user" );
      }

      return res.json();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "name",
      "email",
      "DOB",
      "phoneNumber",
      "LGA",
      "password",
      "confirmPsw",
    ];

    const missing = requiredFields.filter((f) => !formData[f]);

    if (missing.length > 0) {
      alert(`Please fill in all fields. Missing: ${missing.join(", ")}`);
      return;
    }

    if (formData.password !== formData.confirmPsw) {
      alert("Passwords do not match.");
      return;
    }

    mutate();
  };

  const LGAs = [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "kaiamo",
    "Moro",
    "Offa",
    "oke-ero",
    "Oyun",
    "patigi",
  ];

  return (
    <section className="min-h-screen bg-[#000306] font-inter relative">
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 pt-20">
        <h2 className="text-white text-[26px] font-[600] px-5 mb-3 max-w-4xl  mx-auto">
          Welcome back
        </h2>
        <p className="text-white text-[14px] px-5 max-w-4xl mx-auto">
          We only need a few detail about you to get you started!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl xl:max-w-5xl mx-auto space-y-8"
        >
          <div className="text-white xl:flex">
            <aside className="p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  action={handleChange}
                />

                <Input
                  label="Date of Birth (Day and month only)"
                  name="DOB"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={formData.DOB}
                  action={handleChange}
                />

                <div className="flex flex-col">
                  <label className="text-sm mb-2 text-gray-300">Gender</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white py-3 px-5 rounded-lg appearance-none"
                  >
                    <option value="" disabled>
                      Select Your Gender
                    </option>
                    <option value="Male" className="text-black">
                      Male
                    </option>
                    <option value="Female" className="text-black">
                      Female
                    </option>
                  </select>
                </div>

                <Input
                  label="Prefered Name"
                  name="preferedName"
                  placeholder="Enter your prefered name or nick name"
                  value={formData.preferedName}
                  action={handleChange}
                />
              </div>
            </aside>

            <aside className="p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  action={handleChange}
                />

                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+234..."
                  value={formData.phoneNumber}
                  action={handleChange}
                />
              </div>

              <div className="mt-6 flex flex-col">
                <label htmlFor="LGA" className="text-sm mb-2 text-gray-300">
                  LGA
                </label>
                <select
                  id="LGA"
                  name="LGA"
                  value={formData.LGA}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white py-3 px-5 rounded-lg"
                >
                  <option value="" disabled>
                    Select Your Local Goverment
                  </option>
                  {LGAs.map((LGA) => (
                    <option key={LGA} value={LGA} className="text-black">
                      {LGA}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Password"
                  name="password"
                  placeholder="************"
                  type="password"
                  value={formData.password}
                  action={handleChange}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPsw"
                  placeholder="************"
                  value={formData.confirmPsw}
                  action={handleChange}
                />
              </div>
            </aside>
          </div>
          <div>
            {
              isError && 
              <span className="text-white">{error.message}</span>
            }
          </div>
          <div className="flex items-center justify-center w-full md:px-10 px-5">
            <button
              type="submit"
              className={`mt-8 w-full px-6 py-4 rounded-xl text-lg font-bold transition 
                 ${
                   isPending
                     ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                     : "bg-red-500 text-white hover:bg-red-800"
                 }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpUser;
