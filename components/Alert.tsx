import tw, { styled } from "twin.macro";

const Border = styled.div(() => [
  tw`text-white bg-accent-333 border-accent-333`,
]);
const Container = tw.div`container mx-auto px-5`;
const Message = tw.div`py-2 text-sm text-center`;
const Link = tw.a`underline hover:text-primary-shade-1 duration-200 transition-colors`;

export default function Alert({ preview }: { preview: boolean }) {
  return (
    <Border>
      <Container>
        <Message>
          {preview && (
            <>
              Esta pagina es una vista previa.{" "}
              <Link href="/api/exit-preview">Haz click aqui</Link> para salir
              del modo vista previa.
            </>
          )}
        </Message>
      </Container>
    </Border>
  );
}
