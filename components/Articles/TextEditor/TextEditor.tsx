import { Plate, TEditableProps } from "@udecode/plate";
import { MyParagraphElement, MyValue } from "./plateTypes";

const editableProps: TEditableProps<MyValue> = {
  placeholder: "Escribir...",
};

const TextEditor = ({
  initialContent,
  setFieldValue,
}: {
  initialContent: any;
  setFieldValue: any;
}) => {
  return (
    <Plate<MyValue>
      editableProps={editableProps}
      initialValue={initialContent}
      onChange={(newValue) => setFieldValue("content", newValue)}
    />
  );
};

export default TextEditor;
