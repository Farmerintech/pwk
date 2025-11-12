import { useState } from "react";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { MdKey, MdMail } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../contexts/UserContext";

interface FormData {
  email: string;
  password: string;
}

interface IUSER {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  token:any
  message:string
}

export const AdminSignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
      const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Email and password are required.");
      return;
    }
          mutate();
  };

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate, isPending, error, isError } = useMutation<IUSER>({
    mutationFn: async () => {
      const res = await fetch(`https://pwk.onrender.com/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to login user");
      return data;
    },
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      // Optionally reset form on success
      console.log(data);
      login({
        id: data?.id,
        email: data?.email,
        role: data?.role,
        token: data.token
      });


      data?.token && data?.token !== null && navigate(`/${data?.role}/dashboard`);
      setFormData({
        password: "",
        email: "",
      });
    },
  });

  return (
    <section className="min-h-screen bg-stone-50 font-inter flex flex-col items-start md:items-center justify-center">
      <h2 className="text-gray-900 text-[26px] font-[600] px-5 mb-3">Welcome back</h2>
      <p className="text-gray-700 text-[14px] px-5">Enter your details correctly to login</p>

      <div className="w-full md:w-[50%] mt-5 px-5 flex flex-col gap-4">
        <Input
          label="Email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          action={handleChange}
          icon={<MdMail />}
        />
        <Input
          label="Password"
          name="password"
          placeholder="************"
          value={formData.password}
          action={handleChange}
          type="password"
          icon={<MdKey />}
        />
      </div>

      {isError && <span className="text-red-500 px-10">{error?.message}</span>}
          {successMessage && <span className="text-green-600 px-10">{successMessage}</span>}
      <div className="flex items-center justify-center w-full md:w-[50%] px-5">
        <button
          onClick={handleLogin}
          disabled={isPending}
          className={`mt-8 w-full px-6 py-3 rounded-[8px] text-lg font-bold transition duration-300 
            ${isPending
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white shadow-lg"
            }`}
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </div>
          ) : "Submit"}
        </button>
      </div>

      <span className="text-gray-700 text-sm px-5 mt-4">
        Have no account yet? <Link to="/sign_up/user" className="text-green-500 hover:underline cursor-pointer">Register</Link>
      </span>
    </section>
  );
};

export default AdminSignIn;
