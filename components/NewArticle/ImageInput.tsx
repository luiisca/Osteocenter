import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  Image;
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};
const Container = styled.div((props) => [
  css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  `,
]);
const ImgWrap = styled.div(() => [
  tw`justify-self-center w-[clamp(200px, 80%, 400px)]`,
  tw`rounded-[9px] overflow-hidden`,
]);

const ImageInput = () => {
  const [imgPreview, setImgPreview] = useState<string | null | ArrayBuffer>("");

  const onDrop = useCallback((accepedtFiles: Array<{}>) => {
    const firstFile = accepedtFiles[0];

    const handleImagePreview = (files: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(files);
    };
    console.log("dropped");

    handleImagePreview(firstFile);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {isDragActive
          ? "Suelta tu imagen aqui"
          : "Arrastra alguna imagen aqui o haz click para seleccionar imagenes"}
      </Container>
      <div>
        <img src={imgPreview as string} alt="preview dropped image" />
      </div>
    </>
  );
};

export default ImageInput;
