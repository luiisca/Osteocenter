import { useState } from "react";
import { Plate, TEditableProps } from "@udecode/plate";
import { MyParagraphElement, MyValue } from "./plateTypes";

const editableProps: TEditableProps<MyValue> = {
  placeholder: "Escribir...",
};

const initialValue = [
  {
    type: "p",
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
  } as MyParagraphElement,
];

const TextEditor = () => {
  const [content, setContent] = useState<MyValue | null>(null);

  return (
    <Plate<MyValue>
      editableProps={editableProps}
      initialValue={initialValue}
      onChange={setContent}
    />
  );
};

export default TextEditor;
