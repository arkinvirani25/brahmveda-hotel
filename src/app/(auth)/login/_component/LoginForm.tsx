"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChromeIcon } from "lucide-react";
import { ILogin } from "@/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/FormInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { initialValue, validationSchema } from "@/constants/login";

const Login: React.FC = () => {
  const router = useRouter();

  const form = useForm<ILogin>({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const login = async (values: ILogin) => {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.error) {
      setError("root", { message: response.error });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-950 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <FormInput
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              control={control}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <FormInput
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              control={control}
            />
          </div>
          {errors?.root && (
            <div className="text-red-600 text-sm font-medium">{errors?.root.message}</div>
          )}
          <Button type="submit" className="w-full" variant="default" onClick={handleSubmit(login)}>
            Login
          </Button>
        </form>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Button variant="outline" className="w-full" onClick={async () => signIn("google")}>
            <ChromeIcon className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?&nbsp;
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
