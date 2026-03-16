"use client";

import { useForm } from "react-hook-form";
import css from "./AddBook.module.css";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import Modal from "../Modal/Modal";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types/auth";
import toast from "react-hot-toast";
import { addBookManually } from "@/lib/api/clientApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormFields {
  title: string;
  author: string;
  totalPages: number;
}

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  totalPages: Yup.number()
    .typeError("Must be a number")
    .required("Pages is required")
    .positive("Must be more than 0")
    .integer("Must be an integer"),
});

export default function AddBook() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(schema) });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormFields) => addBookManually(data),
    onSuccess: () => {
      <SuccessMessage />;
      reset();
      queryClient.invalidateQueries({ queryKey: ["ownBooks"] });
      setIsSuccessModalOpen(true);
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error of adding book";
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    if (isSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessModalOpen]);

  const onSubmit = (data: FormFields) => {
    mutate(data);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Create your library:</h3>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Book title:</span>
          <input
            className={css.input}
            type="text"
            placeholder=""
            {...register("title")}
          />
        </div>
        {errors.title && <p className={css.error}>{errors.title.message}</p>}
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>The author:</span>
          <input
            className={css.input}
            type="text"
            placeholder=""
            {...register("author")}
          />
        </div>
        {errors.author && <p className={css.error}>{errors.author.message}</p>}
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Number of pages:</span>
          <input
            className={css.input}
            type="number"
            placeholder=""
            {...register("totalPages")}
          />
        </div>
        {errors.totalPages && (
          <p className={css.error}>{errors.totalPages.message}</p>
        )}
        <button type="submit" className={css.button}>
          {isPending ? "Adding" : "Add book"}
        </button>
      </form>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        size="small"
      >
        <SuccessMessage />
      </Modal>
    </div>
  );
}
