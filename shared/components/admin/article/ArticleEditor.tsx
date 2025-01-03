import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  Strikethrough,
} from "lucide-react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  const buttonClass =
    "transition hover:bg-primary hover:text-white p-2 rounded-full";
  return (
    <div className="control-group">
      <div className="flex gap-2 my-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? `is-active ${buttonClass}` : buttonClass
          }
          value="bold"
        >
          <Bold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? `is-active ${buttonClass}` : buttonClass
          }
          value="italic"
        >
          <Italic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? `is-active ${buttonClass}` : buttonClass
          }
          value="strike"
        >
          <Strikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? `is-active ${buttonClass}`
              : buttonClass
          }
          value="bulletList"
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? `is-active ${buttonClass}`
              : buttonClass
          }
          value="orderedList"
        >
          <ListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? `is-active ${buttonClass}`
              : buttonClass
          }
          value="blockquote"
        >
          <MessageSquareQuote />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export function ArticleEditor({
  content,
  onchange,
}: {
  content: string;
  onchange: (value: string) => void;
}) {
  return (
    <EditorProvider
      immediatelyRender={false}
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => onchange(editor.getHTML())}
    ></EditorProvider>
  );
}
