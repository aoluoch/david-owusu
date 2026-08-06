import type { EventItem } from "../types/content";

const monthIndex: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  sept: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
};

export interface EventDateSelection {
  startDate: string;
  endDate: string;
}

function endOfDay(date: Date) {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

function isoFromParts(month: string, day: string, year: string) {
  const index = monthIndex[month.toLowerCase()];
  if (index === undefined) return "";
  const monthValue = String(index + 1).padStart(2, "0");
  const dayValue = day.padStart(2, "0");
  return `${year}-${monthValue}-${dayValue}`;
}

function dateFromIso(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function formatMonthDay(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatEventDate({ startDate, endDate }: EventDateSelection) {
  const start = dateFromIso(startDate);
  const end = endDate ? dateFromIso(endDate) : null;
  if (!start) return "";
  if (!end || startDate === endDate) return formatFullDate(start);

  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        start,
      );
      return `${month} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
    }
    return `${formatMonthDay(start)}–${formatFullDate(end)}`;
  }

  return `${formatFullDate(start)}–${formatFullDate(end)}`;
}

export function parseEventDateSelection(dateText: string): EventDateSelection {
  const normalized = dateText
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  const sameMonthRange = normalized.match(
    /^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\d{4})$/,
  );
  if (sameMonthRange) {
    const [, month, startDay, endDay, year] = sameMonthRange;
    return {
      startDate: isoFromParts(month, startDay, year),
      endDate: isoFromParts(month, endDay, year),
    };
  }

  const crossMonthRange = normalized.match(
    /^([A-Za-z]+)\s+(\d{1,2})\s*-\s*([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/,
  );
  if (crossMonthRange) {
    const [, startMonth, startDay, endMonth, endDay, year] = crossMonthRange;
    return {
      startDate: isoFromParts(startMonth, startDay, year),
      endDate: isoFromParts(endMonth, endDay, year),
    };
  }

  const namedDate = normalized.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (namedDate) {
    const [, month, day, year] = namedDate;
    return { startDate: isoFromParts(month, day, year), endDate: "" };
  }

  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return { startDate: "", endDate: "" };

  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return { startDate: `${year}-${month}-${day}`, endDate: "" };
}

export function getEventEndDate(dateText: string) {
  const selection = parseEventDateSelection(dateText);
  const date = dateFromIso(selection.endDate || selection.startDate);
  if (date) return date;

  const parsed = new Date(dateText);
  return Number.isNaN(parsed.getTime()) ? null : endOfDay(parsed);
}

export function isPastEvent(event: EventItem) {
  const endDate = getEventEndDate(event.date);
  return endDate ? endDate < new Date() : false;
}
