import { NotesFormType } from "../enums/NotesFormType";
import { RefObject } from "react";

export type NotesFormProps = {
  formType: NotesFormType;
  formRef: RefObject<HTMLDivElement>;
};
