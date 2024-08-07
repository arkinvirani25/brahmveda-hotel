import { ISignUp } from "@/interface";
import * as yup from "yup";

export const initialValue: ISignUp = {
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Enter a valid format"),
  password: yup.string().required("Password is required"),
});
