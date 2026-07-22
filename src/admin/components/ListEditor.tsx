import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { AdminButton, Input, Textarea } from "./ui";

function move<T>(items: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function RowControls({
  onUp,
  onDown,
  onRemove,
  disableUp,
  disableDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  disableUp: boolean;
  disableDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        title="Move up"
        className="rounded-lg p-1.5 text-slate-500 hover:bg-gray-100 disabled:opacity-30"
      >
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        title="Move down"
        className="rounded-lg p-1.5 text-slate-500 hover:bg-gray-100 disabled:opacity-30"
      >
        <ArrowDown size={15} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        title="Remove"
        className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

/** Editor for an array of plain strings. */
export function StringListEditor({
  items,
  onChange,
  multiline = false,
  placeholder,
  addLabel = "Add item",
}: {
  items: string[];
  onChange: (next: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
  addLabel?: string;
}) {
  const update = (index: number, value: string) =>
    onChange(items.map((it, i) => (i === index ? value : it)));

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1">
            {multiline ? (
              <Textarea
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(index, e.target.value)}
              />
            ) : (
              <Input
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(index, e.target.value)}
              />
            )}
          </div>
          <div className="pt-1">
            <RowControls
              onUp={() => onChange(move(items, index, -1))}
              onDown={() => onChange(move(items, index, 1))}
              onRemove={() => onChange(items.filter((_, i) => i !== index))}
              disableUp={index === 0}
              disableDown={index === items.length - 1}
            />
          </div>
        </div>
      ))}
      <AdminButton
        variant="ghost"
        type="button"
        onClick={() => onChange([...items, ""])}
      >
        <Plus size={16} /> {addLabel}
      </AdminButton>
    </div>
  );
}

/** Editor for an array of objects; each item is rendered via `renderItem`. */
export function ItemListEditor<T>({
  items,
  onChange,
  template,
  renderItem,
  itemLabel = "Item",
  addLabel = "Add item",
}: {
  items: T[];
  onChange: (next: T[]) => void;
  template: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  itemLabel?: string;
  addLabel?: string;
}) {
  const update = (index: number, patch: Partial<T>) =>
    onChange(
      items.map((it, i) => (i === index ? { ...it, ...patch } : it)),
    );

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-light p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {itemLabel} {index + 1}
            </span>
            <RowControls
              onUp={() => onChange(move(items, index, -1))}
              onDown={() => onChange(move(items, index, 1))}
              onRemove={() => onChange(items.filter((_, i) => i !== index))}
              disableUp={index === 0}
              disableDown={index === items.length - 1}
            />
          </div>
          <div className="space-y-3">
            {renderItem(item, (patch) => update(index, patch))}
          </div>
        </div>
      ))}
      <AdminButton
        variant="ghost"
        type="button"
        onClick={() => onChange([...items, template()])}
      >
        <Plus size={16} /> {addLabel}
      </AdminButton>
    </div>
  );
}
