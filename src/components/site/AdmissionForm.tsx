import { useState, type FormEvent } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSc5qXD-oxLvx2BdJzVNNUPu36tJfcaTK7vD6BZKw8rEwY-xxg/formResponse";

const WHATSAPP_REDIRECT =
  "https://wa.me/918090852167?text=Hi%20NextGen%20Scholars,%20I%20have%20submitted%20my%20admission%20enquiry%20form%20and%20would%20like%20more%20information%20regarding%20admissions%20and%20batches.";

const ENTRY = {
  studentName: "entry.1968357784",
  studentMobile: "entry.808760750",
  parentName: "entry.1703622270",
  parentMobile: "entry.1020810940",
  email: "entry.1126203802",
  studentClass: "entry.127327040",
  board: "entry.1456820842",
  stream: "entry.264952886",
  optionalSubjects: "entry.687419060",
  batchTiming: "entry.1269714002",
};

const inputCls =
  "w-full rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/80";

type FormState = {
  studentName: string;
  studentMobile: string;
  parentName: string;
  parentMobile: string;
  email: string;
  studentClass: string;
  board: string;
  stream: string;
  optionalSubjects: string[];
  batchTiming: string;
};

const initial: FormState = {
  studentName: "",
  studentMobile: "",
  parentName: "",
  parentMobile: "",
  email: "",
  studentClass: "",
  board: "",
  stream: "",
  optionalSubjects: [],
  batchTiming: "",
};

export function AdmissionForm() {
  const [data, setData] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isSenior = data.studentClass === "11" || data.studentClass === "12";
  const baseOptional = ["Computer Science", "Hindi", "Fashion Studies", "Mechatronics"];
  const optionalChoices =
    isSenior && data.stream === "Commerce" ? [...baseOptional, "Mathematics"] : baseOptional;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleSubject = (s: string) => {
    setData((d) => ({
      ...d,
      optionalSubjects: d.optionalSubjects.includes(s)
        ? d.optionalSubjects.filter((x) => x !== s)
        : [...d.optionalSubjects, s],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const fd = new FormData();
    fd.append(ENTRY.studentName, data.studentName);
    fd.append(ENTRY.studentMobile, data.studentMobile);
    fd.append(ENTRY.parentName, data.parentName);
    fd.append(ENTRY.parentMobile, data.parentMobile);
    fd.append(ENTRY.email, data.email);
    fd.append(ENTRY.studentClass, data.studentClass);
    fd.append(ENTRY.board, data.board);
    if (isSenior) fd.append(ENTRY.stream, data.stream);
    data.optionalSubjects.forEach((s) => fd.append(ENTRY.optionalSubjects, s));
    fd.append(ENTRY.batchTiming, data.batchTiming);

    try {
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: fd });
    } catch {
      // no-cors: response is opaque; treat as success
    }

    setSuccess(true);
    setTimeout(() => {
      window.location.href = WHATSAPP_REDIRECT;
    }, 1500);
  };

  if (success) {
    return (
      <div className="glass-card relative overflow-hidden rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">Thank You!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our academic counselor will contact you shortly. Redirecting to WhatsApp…
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-7"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
            Book Free Counseling Session
          </h3>
          <p className="text-sm text-muted-foreground">
            Get expert guidance for academic success.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Student Name</label>
          <input
            required
            className={inputCls}
            value={data.studentName}
            onChange={(e) => update("studentName", e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className={labelCls}>Student Mobile</label>
          <input
            required
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            className={inputCls}
            value={data.studentMobile}
            onChange={(e) => update("studentMobile", e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit number"
          />
        </div>
        <div>
          <label className={labelCls}>Parent Mobile</label>
          <input
            required
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            className={inputCls}
            value={data.parentMobile}
            onChange={(e) => update("parentMobile", e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit number"
          />
        </div>
        <div>
          <label className={labelCls}>Parent / Guardian Name</label>
          <input
            required
            className={inputCls}
            value={data.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className={labelCls}>Email Address</label>
          <input
            required
            type="email"
            className={inputCls}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className={labelCls}>Class</label>
          <select
            required
            className={inputCls}
            value={data.studentClass}
            onChange={(e) => {
              const v = e.target.value;
              setData((d) => ({
                ...d,
                studentClass: v,
                stream: v === "11" || v === "12" ? d.stream : "",
              }));
            }}
          >
            <option value="">Select class</option>
            {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Preferred Batch Timing</label>
          <select
            required
            className={inputCls}
            value={data.batchTiming}
            onChange={(e) => update("batchTiming", e.target.value)}
          >
            <option value="">Select timing</option>
            {["Morning Batch", "Afternoon Batch", "Evening Batch", "Weekend Batch"].map((label) => {
              const value = label.replace(" Batch", "");
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}

          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Board</label>
          <div className="flex flex-wrap gap-2">
            {["CBSE", "ICSE", "ISC"].map((b) => (
              <label
                key={b}
                className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  data.board === b
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-white/70 text-foreground hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name="board"
                  className="sr-only"
                  required
                  checked={data.board === b}
                  onChange={() => update("board", b)}
                />
                {b}
              </label>
            ))}
          </div>
        </div>

        {isSenior && (
          <div className="sm:col-span-2">
            <label className={labelCls}>Stream</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Science (PCM)", value: "PCM" },
                { label: "Science (PCB)", value: "PCB" },
                { label: "Commerce", value: "Commerce" },
                { label: "Arts", value: "Arts" },
              ].map((s) => (
                <label
                  key={s.value}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-center text-xs font-medium transition ${
                    data.stream === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white/70 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="stream"
                    className="sr-only"
                    required
                    checked={data.stream === s.value}
                    onChange={() =>
                      setData((d) => ({ ...d, stream: s.value, optionalSubjects: [] }))
                    }
                  />
                  {s.label}

                </label>
              ))}
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <label className={labelCls}>Optional Subjects</label>
          <div className="flex flex-wrap gap-2">
            {optionalChoices.map((s) => {
              const active = data.optionalSubjects.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSubject(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/70 hover:border-primary/40"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-scale mt-6 w-full rounded-2xl gradient-primary px-6 py-4 font-display text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-70"
      >
        {submitting ? "Submitting…" : "Book Free Counseling Session"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        100% Free • No spam • Counselor calls within 24 hours
      </p>
    </form>
  );
}
