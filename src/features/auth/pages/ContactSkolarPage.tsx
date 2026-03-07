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

export default function ContactSkolarPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-3xl">
      <button
        type="button"
        onClick={() => navigate("/auth/login")}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur hover:bg-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Login
      </button>

      <div className="rounded-2xl border border-white/40 bg-white/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-7">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Contact the Skolar team
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tell us about your school and we will help set up teacher accounts.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                First Name
              </span>
              <input
                required
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                Last Name
              </span>
              <input
                required
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                Phone Number
              </span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                Job Title
              </span>
              <input
                required
                value={form.jobTitle}
                onChange={(event) => updateField("jobTitle", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                School Name
              </span>
              <input
                required
                value={form.schoolName}
                onChange={(event) => updateField("schoolName", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                Number of Students
              </span>
              <input
                required
                min={1}
                type="number"
                value={form.numberOfStudents}
                onChange={(event) =>
                  updateField("numberOfStudents", event.target.value)
                }
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              />
            </label>

            <label className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">State</span>
              <select
                required
                value={form.state}
                onChange={(event) => updateField("state", event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
              >
                <option value="" disabled>
                  Select state
                </option>
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

          <label className="space-y-1">
            <span className="text-[11px] font-medium text-slate-500">Message</span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
            />
          </label>

          <button
            type="submit"
            className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-[#009f5c]"
          >
            Send Request
          </button>

          {submitted ? (
            <p className="inline-flex items-center gap-2 text-xs font-medium text-[#00B96B]">
              <CheckCircle2 className="h-4 w-4" />
              Request received. The Skolar team will contact you soon.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
