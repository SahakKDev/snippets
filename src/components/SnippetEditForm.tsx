"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import * as actions from "@/actions";

import type { Snippet } from "@prisma/client";

type Props = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: Props) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = "") {
    setCode(value);
  }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        theme="vs-dark"
        height="40vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />
      <form action={editSnippetAction}>
        <button className="p-2 border rounded">Save</button>
      </form>
    </div>
  );
}
