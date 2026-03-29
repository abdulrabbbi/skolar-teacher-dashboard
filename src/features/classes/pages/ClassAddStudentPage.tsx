import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Mail, UserPlus } from "lucide-react";

import { ROUTES } from "../../../app/router/routes";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import { useTeacherClassrooms } from "../data/teacherClasses.storage";

const INVITE_BASE_URL = "https://www.skolar.com/classrooms";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function copyToClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const el = document.createElement("input");
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export default function ClassAddStudentPage() {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const { classrooms, customClassrooms, addStudent } = useTeacherClassrooms();

  const classItem = classrooms.find((item) => item.id === classId);
  const customClassroom = customClassrooms.find((item) => item.id === classId);
  const classroom = customClassroom ?? classItem;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "code" | null>(null);

  const inviteCode = useMemo(() => {
    const cleaned = classId?.replace(/[^a-z0-9]/gi, "") ?? "";
    const base = cleaned.slice(0, 7) || "CLASSRM";
    return base.toUpperCase();
  }, [classId]);

  const inviteLink = useMemo(() => {
    return `${INVITE_BASE_URL}/${inviteCode.toLowerCase()}`;
  }, [inviteCode]);

  const joinInstructions = useMemo(() => {
    return `Students can also join by going to ${INVITE_BASE_URL} and entering the code: ${inviteCode}`;
  }, [inviteCode]);

  if (!classId || !classroom) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => navigate(ROUTES.classes)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to classes
        </Button>
        <Card className="border border-slate-200 bg-white p-8">
          <h1 className="text-xl font-semibold text-slate-900">Class not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The classroom you tried to open does not exist.
          </p>
        </Card>
      </div>
    );
  }

  const onCopy = async (value: string, which: "link" | "code") => {
    setCopied(null);
    await copyToClipboard(value);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 1200);
  };

  const handleSendInvite = () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Enter a student email address.");
      setNotice(null);
      return;
    }

    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      setNotice(null);
      return;
    }

    if (customClassroom) {
      addStudent(customClassroom.id, trimmed);
      setNotice(`${trimmed} was added to ${classroom.title}.`);
    } else {
      setNotice(`Invite prepared for ${trimmed}.`);
    }

    setError(null);
    setEmail("");
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(ROUTES.classDetails(classroom.id))}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {classroom.title}
      </button>

      <Card className="border border-slate-200 bg-white p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Add Students
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Invite students to {classroom.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Share the join link or send an email invitation directly from this
            page.
          </p>
          {!customClassroom ? (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This class uses demo data, so direct invites are preview-only here.
            </p>
          ) : null}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Invite with a link
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Students can join this classroom from a shareable link or by using
            the invite code.
          </p>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Invite Link
              </p>
              <p className="mt-2 break-all font-mono text-sm text-slate-700">
                {inviteLink}
              </p>
              <Button
                size="lg"
                variant="primary"
                className="mt-4 h-11 rounded-xl px-5"
                onClick={() => void onCopy(inviteLink, "link")}
              >
                <Copy className="h-4 w-4" />
                {copied === "link" ? "Copied" : "Copy Link"}
              </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Invite Code
              </p>
              <p className="mt-2 font-mono text-lg text-slate-900">{inviteCode}</p>
              <p className="mt-3 text-sm text-slate-500">{joinInstructions}</p>
              <Button
                size="lg"
                variant="outline"
                className="mt-4 h-11 rounded-xl px-5"
                onClick={() => void onCopy(inviteCode, "code")}
              >
                <Copy className="h-4 w-4" />
                {copied === "code" ? "Copied" : "Copy Code"}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Send an email invite
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add a student by email and send them a direct invitation.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm">
              <UserPlus className="h-5 w-5" />
            </div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@email.com"
              className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              inputMode="email"
            />
          </div>

          <Button
            size="lg"
            variant="primary"
            className="mt-4 h-11 w-full rounded-xl px-5"
            onClick={handleSendInvite}
          >
            <Mail className="h-4 w-4" />
            Send Invite
          </Button>

          {error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </p>
          ) : null}

          {notice ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {notice}
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
