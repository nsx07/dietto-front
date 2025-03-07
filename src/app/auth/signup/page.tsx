"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordRequirements = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[a-z]/, message: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
    { regex: /[0-9]/, message: "At least 1 number" },
    { regex: /[^A-Za-z0-9]/, message: "At least 1 special character" },
  ];

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    }

    const failedRequirements = passwordRequirements.filter((requirement) => !requirement.regex.test(password));

    if (failedRequirements.length > 0) {
      return "Password does not meet requirements";
    }

    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validateName = (name: string) => {
    if (!name) {
      return "Name is required";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    // If no errors, proceed with form submission
    if (!nameError && !emailError && !passwordError) {
      // Here you would typically call a function to handle the signup
      console.log("Form submitted:", formData);
      alert("Signup successful!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className={errors.name ? "border-red-500" : ""} />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

              <div className="mt-2 space-y-2">
                <p className="text-sm font-medium">Password requirements:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-center text-sm">
                      {requirement.regex.test(formData.password) ? <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> : <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />}
                      {requirement.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary font-medium">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
