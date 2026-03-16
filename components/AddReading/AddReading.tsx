"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import css from "./AddReading.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiBackendError } from "@/types/auth";
import toast from "react-hot-toast";
import { startReadingBook, stopReadingBook } from "@/lib/api/clientApi";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import SuccessReadingMessage from "../SuccessReadingMessage/SuccessReadingMessage";

interface FormFields {
  page: number;
}

interface AddReadingProps {
  isReading: boolean;
  totalPages: number;
}

export default function AddReading({ isReading, totalPages }: AddReadingProps) {
  const schema = Yup.object({
    page: Yup.number()
      .typeError("Must be a number")
      .required("Pages is required")
      .positive("Must be more than 0")
      .integer("Must be an integer")
      .max(totalPages, `Cannot exceed ${totalPages} pages`),
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormFields) => {
      const payload = { id: id as string, page: data.page };
      return isReading ? stopReadingBook(payload) : startReadingBook(payload);
    },
    onSuccess: (responseData, variables) => {
      queryClient.invalidateQueries({ queryKey: ["book", id] });

      if (isReading && variables.page === totalPages) {
        setIsSuccessModalOpen(true);
      }
      reset();
      toast.success(isReading ? "Session stopped" : "Session started");
    },
    onError: (err: ApiBackendError) => {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: FormFields) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessModalOpen]);

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>{isReading ? "Stop page:" : "Start page:"}</h3>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Page number:</span>
          <input
            className={css.input}
            type="number"
            placeholder=""
            {...register("page")}
          />
        </div>
        {errors.page && <p className={css.error}>{errors.page.message}</p>}
        <button type="submit" className={css.button}>
          {isPending ? "Processing..." : isReading ? "To stop" : "To start"}
        </button>
      </form>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        size="small"
      >
        <SuccessReadingMessage />
      </Modal>
    </div>
  );
}
