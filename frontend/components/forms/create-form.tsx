import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { BlocAddress, blocContractABI } from "@lib";
import { FileUploader } from "@components";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import styles from "./create-form.module.scss";
import type { TransactionReceipt } from "@ethersproject/providers";

export const CreateForm: FC<CreateFormProps> = (props: CreateFormProps) => {
  const { onError, onSuccess } = props;

  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      errorReason && setErrorReason(undefined);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorReason]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreationFormData>({ mode: "onChange" });

  const creation = useContractWrite({
    addressOrName: BlocAddress,
    contractInterface: blocContractABI,
    functionName: "createEvent",
    onSettled: async (_, error) => {
      if (error) {
        const reason = (error as unknown as { reason: string }).reason;
        const reasonString = reason.split(":")[1];
        setErrorReason(reasonString);
        await onError(error);
      }
    },
  });

  const waitCreation = useWaitForTransaction({
    wait: creation.data?.wait,
    hash: creation.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      await onSuccess(data);
    },
  });

  const registerHandler = async (data: CreationFormData) => {
    if (isValid) {
      console.log(files);
      const { participantsNumber, ticketPrice } = data;
      try {
        await creation.writeAsync({
          args: [participantsNumber, ticketPrice],
        });
      } catch (error) {
        return;
      }
    }
  };

  const onFileChangeHandler = async (files: File[] | undefined) => {
    setFiles(files);
  };

  const isLoading = useMemo<boolean>(() => {
    return Boolean(creation.isLoading || waitCreation.isLoading);
  }, [creation.isLoading, waitCreation.isLoading]);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>Event information</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(registerHandler)}>
          {/* /* === eventName === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventName"
              type="text"
              {...register("eventName", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="eventName" className={styles.inputContainer__label}>
              Event Name
            </label>
          </div>
          {/* /* === participantsNumber === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="participantsNumber"
              type="number"
              {...register("participantsNumber", { required: true, min: 1 })}
            />
            <label
              htmlFor="participantsNumber"
              className={styles.inputContainer__label}
            >
              Maximum number of participants
            </label>
          </div>
          {/* /* === organizers === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="organizers"
              type="text"
              {...register("organizers", {
                required: true,
                minLength: 1,
              })}
            />
            <label
              htmlFor="organizers"
              className={styles.inputContainer__label}
            >
              Organizers
            </label>
          </div>
          {/* /* === eventType === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventType"
              type="text"
              {...register("eventType", {
                required: true,
                minLength: 1,
              })}
            />
            <label htmlFor="eventType" className={styles.inputContainer__label}>
              Event Type (e.g online)
            </label>
          </div>
          {/* /* === category === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="category"
              type="text"
              {...register("category", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="category" className={styles.inputContainer__label}>
              Category
            </label>
          </div>

          {/* /* === eventDate === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventDate"
              type="date"
              value={format(new Date(), "yyyy-MM-dd")}
              {...register("eventDate", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="eventDate" className={styles.inputContainer__label}>
              Choose Event Date
            </label>
          </div>

          {/* /* === StartTime === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="startTime"
              type="time"
              value={format(new Date(), "HH:mm")}
              {...register("startTime", {
                required: true,
              })}
            />
            <label htmlFor="startTime" className={styles.inputContainer__label}>
              Start Time
            </label>
          </div>

          {/* /* === endTime === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="endTime"
              type="time"
              value={format(new Date(600), "HH:mm")}
              {...register("endTime", {
                required: true,
              })}
            />
            <label htmlFor="endTime" className={styles.inputContainer__label}>
              End Time
            </label>
          </div>

          {/* /* === shortdesc === */}
          <div className={styles.inputContainer}>
            <textarea
              className={styles.inputContainer__input}
              id="shortDesc"
              {...register("shortDesc", {
                required: true,
                minLength: 10,
              })}
            />
            <label htmlFor="shortDesc" className={styles.inputContainer__label}>
              Give a brief description, make it catchy. Max 100 words
            </label>
          </div>

          {/* /* === desc === */}
          <div className={styles.inputContainer}>
            <textarea
              className={styles.inputContainer__input}
              id="desc"
              {...register("desc", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="desc" className={styles.inputContainer__label}>
              Enter Description, explain in details
            </label>
          </div>

          {/* /* === ticketPrice === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="ticketPrice"
              type="number"
              {...register("ticketPrice", { required: true, min: 0 })}
            />
            <label htmlFor="eventName" className={styles.inputContainer__label}>
              Ticket Price
            </label>
          </div>

          {/* /* === image === */}
          <div className={styles.fullContainer}>
            <FileUploader
              onChange={(files: File[] | undefined) =>
                onFileChangeHandler(files)
              }
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnContainer__btn} type="submit">
              {isLoading ? (
                <MoonLoader size={30} />
              ) : errorReason ? (
                errorReason
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

interface CreateFormProps {
  onError: (error: Error) => Promise<void>;
  onSuccess: (data: TransactionReceipt) => Promise<void>;
}

export interface CreationFormData {
  eventName: string;
  participantsNumber: number;
  eventType: string;
  organizers: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  desc: string;
  shortDesc: string;
  ticketPrice: number;
  eventFile: File[];
}
