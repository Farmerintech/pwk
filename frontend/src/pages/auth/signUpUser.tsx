import React, { useState } from "react";
import { Input } from "../../components/input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { confirmPsw, ...newFormData } = formData;

  const { mutate, isPending, error, isError } = useMutation<IResponse>({
    mutationFn: async () => {
      const res = await fetch(`https://pwk.onrender.com/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFormData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register user");
      return data;
    },
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      // Optionally reset form on success
      setFormData({
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
    "Asa","Baruten","Edu","Ekiti","Ifelodun","Ilorin East","Ilorin South","Ilorin West",
    "Irepodun","Isin","Kaiama","Moro","Offa","Oke-ero","Oyun","Patigi",
  ];

  return (
    <section className="min-h-screen bg-stone-50 font-inter relative py-16">
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20">
        <h2 className="text-gray-900 text-[26px] font-[600] px-5 mb-3 max-w-4xl mx-auto">
          Welcome! Let's get started
        </h2>
        <p className="text-gray-700 text-[14px] px-5 max-w-4xl mx-auto mb-10">
          We only need a few details about you to create your account.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-8">
          <div className="xl:flex xl:gap-8">
            {/* Personal Details */}
            <aside className="flex-1 bg-white p-6 rounded-2xl mb-8 xl:mb-0">
              <h2 className="text-gray-900 text-xl font-semibold mb-4">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  action={handleChange}
                />
                <Input
                  label="Date of Birth (Day and Month Only)"
                  name="DOB"
                  type="date"
                  placeholder="mm/dd"
                  value={formData.DOB}
                  action={handleChange}
                />
                <div className="flex flex-col">
                  <label className="text-gray-900 text-sm mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-stone-50 outline-none text-gray-900 py-3 px-5 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="" disabled>Select Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <Input
                  label="Preferred Name"
                  name="preferedName"
                  placeholder="Enter your nickname"
                  value={formData.preferedName}
                  action={handleChange}
                />
              </div>
            </aside>

            {/* Contact & Security */}
            <aside className="flex-1 bg-white p-6 rounded-2xl">
              <h2 className="text-gray-900 text-xl font-semibold mb-4">
                Contact & Security
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

              <div className="mt-6">
                <label className="text-gray-900 text-sm mb-2 block">LGA</label>
                <select
                  name="LGA"
                  value={formData.LGA}
                  onChange={handleChange}
                  className="w-full bg-stone-100 text-gray-900 py-3 px-5 rounded-lg focus:ring-2 outline-none focus:ring-green-500"
                >
                  <option value="" disabled>Select Your Local Government</option>
                  {LGAs.map(lga => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                  name="confirmPsw"
                  placeholder="************"
                  type="password"
                  value={formData.confirmPsw}
                  action={handleChange}
                />
              </div>
            </aside>
          </div>

          {/* Error & Success Messages */}
          {isError && <span className="text-red-500 px-10">{error?.message}</span>}
          {successMessage && <span className="text-green-600 px-10">{successMessage}</span>}

          <div className="flex items-center justify-center w-full px-5 md:px-10">
            <button
              type="submit"
              className={`mt-8 w-full px-6 py-3 rounded-xl text-lg font-bold transition
                ${isPending
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                }`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
             <span className="text-gray-700 text-sm px-10 mt-4">
               Already have account? <Link to="/sign_in" className="text-green-500 hover:underline cursor-pointer">Login</Link>
      </span>
        </form>
      </div>
    </section>
  );
};

export default SignUpUser;
