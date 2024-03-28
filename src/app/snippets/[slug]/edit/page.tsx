interface Props {
  params: {
    slug: string;
  };
}

export default function SnippetEditPage({ params }: Props) {
  const { slug } = params;

  return <div>Edit {slug}</div>;
}
