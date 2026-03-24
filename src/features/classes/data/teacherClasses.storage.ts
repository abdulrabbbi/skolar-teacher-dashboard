import { useCallback, useMemo, useState } from "react";

import { classes as mockClasses, type ClassSummary } from "./classes.mock";

const STORAGE_KEY = "teacher_penall_custom_classrooms_v1";

export type ClassroomStudent = {
  id: string;
  email: string;
  name: string;
};

export type CustomClassroom = ClassSummary & {
  roster: ClassroomStudent[];
};

export type TeacherClassroom = ClassSummary | CustomClassroom;

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeStoredStudent(value: unknown): ClassroomStudent | null {
  if (!isRecord(value)) return null;
  const id = typeof value.id === "string" ? value.id : "";
  const email = typeof value.email === "string" ? value.email : "";
  const name = typeof value.name === "string" ? value.name : "";
  if (!id || !email) return null;
  return { id, email, name: name || email };
}

function normalizeStoredClassroom(value: unknown): CustomClassroom | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === "string" ? value.id : "";
  const title = typeof value.title === "string" ? value.title : "";
  const subject = typeof value.subject === "string" ? value.subject : "Classroom";
  const avgScore =
    typeof value.avgScore === "number" && Number.isFinite(value.avgScore)
      ? value.avgScore
      : 0;

  if (!id || !title) return null;

  const description =
    typeof value.description === "string" ? value.description : undefined;
  const imageUrl = typeof value.imageUrl === "string" ? value.imageUrl : undefined;

  const rosterRaw = Array.isArray(value.roster) ? value.roster : [];
  const roster = rosterRaw
    .map(normalizeStoredStudent)
    .filter((v): v is ClassroomStudent => Boolean(v));

  return {
    id,
    title,
    subject,
    avgScore,
    description,
    imageUrl,
    roster,
    students: roster.length,
  };
}

function loadCustomClassrooms(): CustomClassroom[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  const parsed = safeParseJson(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map(normalizeStoredClassroom)
    .filter((v): v is CustomClassroom => Boolean(v));
}

function saveCustomClassrooms(items: CustomClassroom[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createIdFromTitle(title: string) {
  const base = slugify(title) || "classroom";
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${base}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${base}-${Math.random().toString(16).slice(2, 10)}`;
}

export type CreateClassroomInput = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export function useTeacherClassrooms(options?: { includeMocks?: boolean }) {
  const includeMocks = options?.includeMocks ?? true;

  const [custom, setCustom] = useState<CustomClassroom[]>(() => loadCustomClassrooms());

  const classrooms = useMemo(() => {
    return includeMocks ? [...custom, ...mockClasses] : [...custom];
  }, [custom, includeMocks]);

  const createClassroom = useCallback((input: CreateClassroomInput) => {
    const next: CustomClassroom = {
      id: createIdFromTitle(input.title),
      title: input.title.trim(),
      description: input.description?.trim() ? input.description.trim() : undefined,
      imageUrl: input.imageUrl,
      students: 0,
      subject: "Classroom",
      avgScore: 0,
      roster: [],
    };

    setCustom((prev) => {
      const updated = [next, ...prev];
      saveCustomClassrooms(updated);
      return updated;
    });

    return next;
  }, []);

  const updateClassroom = useCallback((id: string, input: CreateClassroomInput) => {
      setCustom((prev) => {
        const updated = prev.map((c) => {
          if (c.id !== id) return c;
          const title = input.title.trim();
          const description = input.description?.trim() || undefined;
          const imageUrl = input.imageUrl;
          return { ...c, title, description, imageUrl };
        });
        saveCustomClassrooms(updated);
        return updated;
      });
  }, []);

  const deleteClassroom = useCallback((id: string) => {
    setCustom((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveCustomClassrooms(updated);
      return updated;
    });
  }, []);

  const addStudent = useCallback((classroomId: string, email: string) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;

    setCustom((prev) => {
      const updated = prev.map((c) => {
        if (c.id !== classroomId) return c;
        const exists = c.roster.some((s) => s.email.toLowerCase() === normalized);
        if (exists) return c;

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `student-${Math.random().toString(16).slice(2)}`;

        const nameGuess = normalized.split("@")[0]?.replace(/[._-]+/g, " ").trim();
        const name =
          nameGuess && nameGuess.length > 1
            ? nameGuess.replace(/\b\w/g, (m) => m.toUpperCase())
            : normalized;

        const roster = [{ id, email: normalized, name }, ...c.roster];
        return { ...c, roster, students: roster.length };
      });

      saveCustomClassrooms(updated);
      return updated;
    });
  }, []);

  const removeStudent = useCallback((classroomId: string, studentId: string) => {
    setCustom((prev) => {
      const updated = prev.map((c) => {
        if (c.id !== classroomId) return c;
        const roster = c.roster.filter((s) => s.id !== studentId);
        return { ...c, roster, students: roster.length };
      });
      saveCustomClassrooms(updated);
      return updated;
    });
  }, []);

  return {
    classrooms: classrooms as TeacherClassroom[],
    createClassroom,
    updateClassroom,
    deleteClassroom,
    addStudent,
    removeStudent,
    customClassrooms: custom,
  };
}
