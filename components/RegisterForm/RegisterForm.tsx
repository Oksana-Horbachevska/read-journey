"use client";

import Link from "next/link";
import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerUser } from "@/lib/clientApi";
import { useRouter } from "next/navigation";
import { ApiBackendError } from "@/types/auth";
import toast from "react-hot-toast";
import { useState } from "react";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

// YUP VALIDATION SCHEMA
const schema = Yup.object({
  name: Yup.string().min(2).required("Name is required").trim(),

  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm<RegisterValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const nameValue = watch("name");
  const isNameInvalid = !!errors.name;
  const isNameValid = !errors.name && dirtyFields.name && nameValue?.length > 2;

  const emailValue = watch("email");
  const isEmailInvalid = !!errors.email;
  const isEmailValid =
    !errors.email && dirtyFields.email && emailValue?.length > 0;

  const passwordValue = watch("password");
  const isPasswordInvalid = !!errors.password;
  const isPasswordValid =
    !errors.password && dirtyFields.password && passwordValue?.length >= 7;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: RegisterValues) => {
    try {
      await registerUser(data);
      console.log(data);

      router.push("/recommended");

      reset();
    } catch (err) {
      const error = err as ApiBackendError;
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.fieldContainer}>
          <div
            className={`${css.inputWrapper} ${isNameInvalid ? css.inputErrorBorder : ""} ${isNameValid ? css.inputValidBorder : ""}`}
          >
            <span className={css.labelPrefix}>Name:</span>
            <input
              className={css.input}
              type="text"
              placeholder=""
              {...register("name")}
            />
          </div>
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>
        <div className={css.fieldContainer}>
          <div
            className={`${css.inputWrapper} ${isEmailInvalid ? css.inputErrorBorder : ""} ${isEmailValid ? css.inputValidBorder : ""}`}
          >
            <span className={css.labelPrefix}>Mail:</span>
            <input
              className={css.input}
              type="email"
              placeholder=""
              {...register("email")}
            />
          </div>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.fieldContainer}>
          <div
            className={`${css.inputWrapper} ${isPasswordInvalid ? css.inputErrorBorder : ""} ${isPasswordValid ? css.inputValidBorder : ""}`}
          >
            <span className={css.labelPrefix}>Password:</span>
            <input
              className={css.input}
              type={showPassword ? "text" : "password"}
              placeholder=""
              {...register("password")}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg className={css.passwordSvg} width="20" height="20">
                <use
                  href={
                    errors.password
                      ? "/sprite.svg#icon-pajamas_error"
                      : showPassword
                        ? "/sprite.svg#icon-eye"
                        : "/sprite.svg#icon-eye-off"
                  }
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={css.btnWrapper}>
          <button
            type="submit"
            className={css.authSubmitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Registration"}
          </button>
          <Link className={css.authLink} href="/login">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
