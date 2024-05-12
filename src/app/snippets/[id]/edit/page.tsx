import { notFound } from "next/navigation";

import SnippetEditForm from "@/components/SnippetEditForm";
import { prisma } from "@/db";

type Props = {
  params: {
    id: string;
  };
};

export default async function SnippetEditPage({ params }: Props) {
  const { id: snippetId } = params;

  const snippet = await prisma.snippet.findFirst({
    where: {
      id: +snippetId,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
