import { FC, Fragment, useEffect, useMemo, useState } from "react";
import styles from "./create-form.module.scss";
import { useForm } from "react-hook-form";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionReceipt } from "@ethersproject/providers";
import contractABI from "@lib/abi/bloc-event.json";

const contractConfig = {
  addressOrName: "",
  contractInterface: contractABI,
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

  const creation = useContractWrite(contractConfig, "error", {
    onSettled: async (_: any, error: unknown) => {
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
      const {} = data;
      try {
        await creation.writeAsync({
          args: [],
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
      <div
        className={styles.container}
        onSubmit={handleSubmit(registerHandler)}
      >
        <h1 className={styles.heading}>Register Form</h1>
        <p className={styles.heading__para}>Fill details appropriately</p>
        <form className={styles.form}>
          <input
            className={styles.form__input}
            required
            name="eventName"
            id="eventName"
            type="text"
            maxLength={32}
            placeholder="Event name"
          />
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
}
