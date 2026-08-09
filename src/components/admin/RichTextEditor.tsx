"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect, useRef } from "react";
import { uploadArticleImageAction } from "@/lib/actions/article-actions";

export function RichTextEditor({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (html: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[300px] rounded-b-md border border-t-0 border-slate-300 px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  const insertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadArticleImageAction(formData);
      if (result.ok) {
        editor.chain().focus().setImage({ src: result.url }).run();
      } else {
        alert(result.error);
      }
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-t-md border border-slate-300 bg-slate-50 p-2">
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          粗體
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          斜體
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          標題
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          清單
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          引用
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = prompt("連結網址");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          連結
        </ToolbarButton>
        <ToolbarButton onClick={() => fileInputRef.current?.click()}>圖片</ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) insertImage(file);
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-medium transition ${
        active ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
