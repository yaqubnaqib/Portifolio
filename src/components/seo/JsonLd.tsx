import { serializeJsonLd, type JsonLdGraph } from "@/lib/structured-data";

/** Server-rendered JSON-LD, present in the initial HTML. */
export default function JsonLd({ data }: { data: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
