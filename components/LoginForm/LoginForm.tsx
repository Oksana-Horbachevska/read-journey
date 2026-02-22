"use client";

import Link from "next/link";
import css from "./LoginForm.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "@/lib/clientApi";
import { useRouter } from "next/navigation";
import { ApiBackendError } from "@/types/auth";
import toast from "react-hot-toast/headless";
import { useState } from "react";

interface LoginValues {
  email: string;
  password: string;
}

// YUP VALIDATION SCHEMA
const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Enter a valid email"),
  password: Yup.string().required("Password is required").length(7),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const isEmailInvalid = !!errors.email;
  const isEmailValid =
    !errors.email && dirtyFields.email && emailValue?.length > 0;

  const passwordValue = watch("password");
  const isPasswordInvalid = !!errors.password;
  const isPasswordValid =
    !errors.password && dirtyFields.password && passwordValue.length >= 7;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  async function onSubmit(data: LoginValues) {
    try {
      await loginUser(data);
      console.log(data);
      router.push("/recommended");
      reset();
    } catch (err) {
      const error = err as ApiBackendError;
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
              <svg className={css.passwordSvg} width="20" height="15">
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
            {isSubmitting ? "Processing..." : "Log In"}
          </button>
          <Link className={css.authLink} href="/register">
            Don’t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
