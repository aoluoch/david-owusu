import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

type Command = {
  icon: typeof Bold;
  label: string;
  run: () => void;
};

/**
 * Lightweight rich-text editor producing HTML. Built on `contentEditable` and
 * `document.execCommand` — supported in all evergreen browsers and adequate
 * for an internal admin authoring tool.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something…",
  className,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  // Sync incoming value only when it differs from the live DOM (avoids caret
  // jumps while typing).
  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    emit();
  };

  const emit = () => {
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const format = (tag: string) => exec("formatBlock", tag);

  const addLink = () => {
    const url = window.prompt("Link URL (include https://)");
    if (url) exec("createLink", url);
  };

  const commands: Command[][] = [
    [
      { icon: Bold, label: "Bold", run: () => exec("bold") },
      { icon: Italic, label: "Italic", run: () => exec("italic") },
      { icon: Underline, label: "Underline", run: () => exec("underline") },
    ],
    [
      { icon: List, label: "Bulleted list", run: () => exec("insertUnorderedList") },
      {
        icon: ListOrdered,
        label: "Numbered list",
        run: () => exec("insertOrderedList"),
      },
      { icon: Quote, label: "Quote", run: () => format("blockquote") },
      { icon: Link2, label: "Link", run: addLink },
    ],
    [
      { icon: Undo2, label: "Undo", run: () => exec("undo") },
      { icon: Redo2, label: "Redo", run: () => exec("redo") },
    ],
  ];

  const isEmpty = !value || value === "<br>" || value === "<div><br></div>";

  return (
    <div
      className={cn(
        "rounded-lg border bg-white transition",
        focused ? "border-royal ring-2 ring-royal/20" : "border-gray-300",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2">
        <select
          onChange={(e) => {
            format(e.target.value);
            e.target.value = "p";
          }}
          defaultValue="p"
          className="mr-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-slate-700"
          aria-label="Text style"
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        {/* Commands intentionally capture the editor ref used by their click handlers. */}
        {/* eslint-disable-next-line react-hooks/refs */}
        {commands.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1">
            {gi > 0 && <span className="mx-1 h-5 w-px bg-gray-200" />}
            {group.map(({ icon: Ico, label, run }) => (
              <button
                key={label}
                type="button"
                title={label}
                aria-label={label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={run}
                className="rounded-md p-1.5 text-slate-600 hover:bg-gray-100 hover:text-navy"
              >
                <Ico size={16} />
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="relative">
        {isEmpty && !focused && (
          <span className="pointer-events-none absolute left-4 top-3 text-gray-400">
            {placeholder}
          </span>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          onInput={emit}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            emit();
          }}
          className="richtext min-h-40 px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}
