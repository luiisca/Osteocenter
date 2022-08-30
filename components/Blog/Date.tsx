import { format, parse, setGlobalDateI18n } from "fecha";

setGlobalDateI18n({
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
});

export const formatDate = (dateString: string) => {
  const date = parse(dateString, "isoDateTime") as Date;
  return format(date, "DD [de] MMMM, YYYY");
};

export default function Date({ dateString }: { dateString: string }) {
  return <time dateTime={dateString}>{formatDate(dateString)}</time>;
}
