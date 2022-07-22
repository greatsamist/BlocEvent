import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { BlocAddress, blocContractABI } from "@lib";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import styles from "./create-form.module.scss";
import type { TransactionReceipt } from "@ethersproject/providers";

const contractConfig = {
  addressOrName: BlocAddress,
  contractInterface: blocContractABI,
};

export const CreateForm: FC<CreateFormProps> = (props: CreateFormProps) => {
  const { onError, onSuccess } = props;

  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      errorReason && setErrorReason(undefined);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorReason]);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
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

  const isLoading = useMemo<boolean>(() => {
    return Boolean(creation.isLoading || waitCreation.isLoading);
  }, [creation.isLoading, waitCreation.isLoading]);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1 className={styles.heading}>Event information</h1>
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
            <label htmlFor="eventName" className={styles.inputContainer__label}>
              Maximum number of participants
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

          <button type="submit">
            {isLoading ? (
              <MoonLoader size={30} />
            ) : errorReason ? (
              errorReason
            ) : (
              "Create"
            )}
          </button>
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
  ticketPrice: number;
}
