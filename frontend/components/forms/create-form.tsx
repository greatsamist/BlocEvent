// import { FC, Fragment, useEffect, useMemo, useState } from "react";
// import styles from "./create-form.module.scss";
// import { useForm } from "react-hook-form";
// import { useContractWrite, useWaitForTransaction } from "wagmi";
// import type { TransactionReceipt } from "@ethersproject/providers";
// import { BlocAddress, blocContractABI } from "@lib";

// const contractConfig = {
//   addressOrName: BlocAddress,
//   contractInterface: blocContractABI,
// };

// export const CreateForm: FC<CreateFormProps> = (props: CreateFormProps) => {
//   const { onError, onSuccess } = props;

//   const [errorReason, setErrorReason] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       errorReason && setErrorReason(undefined);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [errorReason]);

//   const {
//     register,
//     handleSubmit,
//     formState: { isValid, errors },
//   } = useForm<CreationFormData>({ mode: "onChange" });

//   const creation = useContractWrite(contractConfig, "createEvent", {
//     onSettled: async (_, error) => {
//       if (error) {
//         const reason = (error as unknown as { reason: string }).reason;
//         const reasonString = reason.split(":")[1];
//         setErrorReason(reasonString);
//         await onError(error);
//       }
//     },
//   });

//   const waitCreation = useWaitForTransaction({
//     wait: creation.data?.wait,
//     hash: creation.data?.hash,
//     onSuccess: async (data: TransactionReceipt) => {
//       await onSuccess(data);
//     },
//   });

//   const registerHandler = async (data: CreationFormData) => {
//     if (isValid) {
//       const { participantsNumber, ticketPrice } = data;
//       try {
//         await creation.writeAsync({
//           args: [participantsNumber, ticketPrice],
//         });
//       } catch (error) {
//         return;
//       }
//     }
//   };

//   const isLoading = useMemo<boolean>(() => {
//     return Boolean(creation.isLoading || waitCreation.isLoading);
//   }, [creation.isLoading, waitCreation.isLoading]);

//   return (
//     <Fragment>
//       <div
//         className={styles.container}
//         onSubmit={handleSubmit(registerHandler)}
//       >
//         <h1 className={styles.heading}>Register Form</h1>
//         <p className={styles.heading__para}>Fill details appropriately</p>
//         <form className={styles.form}>
//           {/* /* === eventName === */}
//           <input
//             className={styles.form__input}
//             id="eventName"
//             type="text"
//             placeholder="Event name"
//             {...(register("eventName"),
//             { required: true, minLength: 1, maxLength: 32 })}
//           />
//           {/* /* === participantsNumber === */}
//           <input
//             className={styles.form__input}
//             id="participantsNumber"
//             type="number"
//             placeholder="Maximum number of participants"
//             {...(register("participantsNumber"),
//             { required: true, minLength: 1 })}
//           />
//           {/* /* === ticketPrice === */}
//           <input
//             className={styles.form__input}
//             id="ticketPrice"
//             type="number"
//             placeholder="Maximum number of participants"
//             {...(register("ticketPrice"), { required: true, minLength: 0 })}
//           />
//           <button type="submit">Create</button>
//           {isLoading ? "Loading" : errorReason ? errorReason : "Make Payment"}
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// interface CreateFormProps {
//   onError: (error: Error) => Promise<void>;
//   onSuccess: (data: TransactionReceipt) => Promise<void>;
// }

// export interface CreationFormData {
//   eventName: string;
//   participantsNumber: number;
//   ticketPrice: number;
// }
