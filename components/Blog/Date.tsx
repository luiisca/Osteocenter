import { format, parse, setGlobalDateI18n } from "fecha";

setGlobalDateI18n({
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
})

export default function Date({ dateString }: { dateString: string }) {
  const date = parse(dateString, "isoDateTime")!;
  return (
    <time dateTime={dateString}>{format(date, "DD [de] MMMM, YYYY")}</time>
  );
}
