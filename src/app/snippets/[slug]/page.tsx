import { prisma } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function SnippetShowPage({ params }: Props) {
  const { slug } = params;
  await new Promise((res) => setTimeout(res, 2000));
  const snippet = await prisma.snippet.findFirst({
    where: {
      id: +slug,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            className="p-2 border rounded"
            href={`/snippets/${snippet.id}/edit`}
          >
            Edit
          </Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>
      <pre className="p-3 border bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
