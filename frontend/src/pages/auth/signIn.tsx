import {  useState } from "react";
import { Input } from "../../components/input";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useUser } from "../../contexts/UserContext"; // adjust path if needed
import { MdKey, MdMail } from "react-icons/md";

interface FormData {
  email: string;
  password: string;
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useUser(); // from context



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleLogin = async () => {
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://quebec-ur3w.onrender.com/api/kyc/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const { token } = data;

      // Decode token
      const decoded: DecodedToken = jwtDecode(token);

      // Save to context + localStorage
      console.log(decoded)
      login({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        token,
      });

      navigate(`/${decoded?.role}/dashboard`);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#000306] font-inter flex flex-col items-start md:items-center justify-center">
      <h2 className="text-white text-[26px] font-[600] px-5 mb-3">Welcome back</h2>
      <p className="text-white text-[14px] px-5">Enter your details correctly to login n</p>

      <div className="w-full md:w-[50%] mt-5 px-5 lg:w-[1/2] flex flex-col gap-4">
        <Input
          label="Email"
          name="Email"
          placeholder="Enter your email address"
          value={formData.email}
          action={handleChange}
          icon = {<MdMail/>}
        />
        <Input
          label="Password"
          name="password"
          placeholder="************"
          value={formData.password}
          action={handleChange}
          type="password"
          icon = {<MdKey/>}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 px-5">{error}</p>
      )}

      <div className="flex items-center justify-center w-full md:w-[50%] px-5">
        <button
          onClick={handleLogin}
          disabled={loading }
          className={`mt-8 w-full px-6 py-3 rounded-[8px] text-lg font-bold transition duration-300 
          ${loading 
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-800 text-white shadow-lg"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
              <span className="text-gray-300 text-sm px-5">Have no account yet? <a className="text-red-500">Register</a></span>
    </section>
  );
};

export default SignIn;
