import { FC, Fragment, useEffect, useMemo, useState } from "react";
import styles from "./create-form.module.scss";
import { useForm } from "react-hook-form";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionReceipt } from "@ethersproject/providers";
import { BlocAddress, blocContractABI } from "@lib";
import { MoonLoader } from "react-spinners";

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
      console.log(participantsNumber, ticketPrice);
      try {
        await creation.writeAsync({
          args: [3, 2],
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
        <h1 className={styles.heading}>Register Form</h1>
        <p className={styles.heading__para}>Fill details appropriately</p>
        <form className={styles.form} onSubmit={handleSubmit(registerHandler)}>
          {/* /* === eventName === */}
          <input
            className={
              errors.eventName ? styles.form__error : styles.form__input
            }
            id="eventName"
            type="text"
            placeholder="Event name"
            {...(register("eventName"),
            { required: true, minLength: 1, maxLength: 32 })}
          />
          {/* /* === participantsNumber === */}
          <input
            className={
              errors.participantsNumber
                ? styles.form__error
                : styles.form__input
            }
            id="participantsNumber"
            type="number"
            placeholder="Maximum number of participants"
            {...(register("participantsNumber"), { required: true, min: 1 })}
          />
          {/* /* === ticketPrice === */}
          <input
            className={
              errors.ticketPrice
                ? `${styles.form__error}`
                : `${styles.form__input}`
            }
            id="ticketPrice"
            type="number"
            placeholder="Ticket Price"
            {...(register("ticketPrice"), { required: true, min: 0 })}
          />
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
