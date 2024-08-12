"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ISignUp } from "@/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/FormInput";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/signup.action";
import { initialValue, validationSchema } from "@/constants/signup";
import { toast } from "@/components/ui/use-toast";
import React from "react";
// import { useState } from "react";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<ISignUp>({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { control, handleSubmit } = form;

  const addUser = async (values: ISignUp) => {
    const response = await signUp(values);
    if (response?.error) {
      toast({
        title: response?.error,
      });
    }

    //sent email using loops
    if (response?.id) {
      router.push("/login");
    }
  };

  // const [testEmail, setTestEmail] = useState("");

  // const test124 = () => {
  //   test(testEmail);
  // };

  // const testChange = (e: any) => {
  //   setTestEmail(e.target.value);
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-950 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
        </div>
        {/* enter email:
        <input onChange={(e) => testChange(e)}></input> */}
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <FormInput
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              control={control}
            />
          </div>
          <div>
            <Label>Password</Label>
            <FormInput
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              control={control}
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit(addUser)}>
            Sign Up
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline" prefetch={false}>
            Login
          </Link>
        </div>
        {/* <Button onClick={test124}>Test OTP login</Button> */}
      </div>
    </div>
  );
};

export default SignUpForm;
