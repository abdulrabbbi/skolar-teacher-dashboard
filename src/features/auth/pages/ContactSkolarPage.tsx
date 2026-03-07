import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  schoolName: string;
  numberOfStudents: string;
  state: string;
  message: string;
};

const initialFormState: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  schoolName: "",
  numberOfStudents: "",
  state: "",
  message: "",
};

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]";

const labelClass = "flex flex-col gap-1";
const labelTextClass = "text-[11px] font-medium text-slate-500";

export default function ContactSkolarPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("/auth/login")}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur hover:bg-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Login
      </button>

      <div className="rounded-2xl border border-white/40 bg-white/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-8">

        {/* ── SUCCESS STATE ── */}
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#00B96B]/10">
              <CheckCircle2 className="h-8 w-8 text-[#00B96B]" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Request received!</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Thanks, <span className="font-medium text-slate-700">{form.firstName}</span>. The Skolar team will review your request and be in touch at{" "}
              <span className="font-medium text-slate-700">{form.email}</span> shortly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="h-10 rounded-xl bg-[#00B96B] px-6 text-xs font-semibold text-white hover:bg-[#009f5c]"
              >
                Back to Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(initialFormState);
                  setSubmitted(false);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white/80 px-6 text-xs font-semibold text-slate-600 hover:bg-white"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          /* ── FORM ── */
          <>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Contact the Skolar team
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Tell us about your school and we'll help set up teacher accounts.
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  <span className={labelTextClass}>First Name</span>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>Last Name</span>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>Phone Number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>Job Title</span>
                  <input
                    required
                    value={form.jobTitle}
                    onChange={(e) => updateField("jobTitle", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>School Name</span>
                  <input
                    required
                    value={form.schoolName}
                    onChange={(e) => updateField("schoolName", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>Number of Students</span>
                  <input
                    required
                    min={1}
                    type="number"
                    value={form.numberOfStudents}
                    onChange={(e) => updateField("numberOfStudents", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className={labelTextClass}>State</span>
                  <select
                    required
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select state</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </label>
              </div>

              <label className={labelClass}>
                <span className={labelTextClass}>Message</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
                />
              </label>

              <button
                type="submit"
                className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-[#009f5c]"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
