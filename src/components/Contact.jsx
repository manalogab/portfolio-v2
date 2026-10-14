import { useState } from 'react';
import { profile } from '../data';
import StretchWord from './StretchWord';

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (message.trim().length < 10) errors.message = 'Write at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const subject = `Portfolio inquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <section className="section section--last" aria-labelledby="contact">
      <StretchWord id="contact">Contact</StretchWord>

      <div className="contact">
        <div className="contact__info">
          <p className="contact__lead">Have an internship opening, a project, or a question? I reply within a day.</p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="contact__links">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="contact__place">{profile.location}, Philippines</p>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          {[
            { key: 'name', label: 'Your name', type: 'text', auto: 'name' },
            { key: 'email', label: 'Your email', type: 'email', auto: 'email' },
          ].map((f) => (
            <label className="field" key={f.key}>
              <span className="field__label">{f.label}</span>
              <input
                type={f.type}
                autoComplete={f.auto}
                value={form[f.key]}
                onChange={set(f.key)}
                aria-invalid={!!errors[f.key]}
                aria-describedby={errors[f.key] ? `${f.key}-err` : undefined}
              />
              {errors[f.key] && (
                <span className="field__error" id={`${f.key}-err`}>
                  {errors[f.key]}
                </span>
              )}
            </label>
          ))}
          <label className="field">
            <span className="field__label">Message</span>
            <textarea
              rows="5"
              value={form.message}
              onChange={set('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-err' : undefined}
            />
            {errors.message && (
              <span className="field__error" id="message-err">
                {errors.message}
              </span>
            )}
          </label>
          <div className="form__foot">
            <button className="btn btn--solid" type="submit">
              Write the email
            </button>
            <p className="form__hint" aria-live="polite">
              {opened
                ? 'Your email app should open with this message filled in. If it didn’t, email me at the address on the left.'
                : 'Opens your email app with this message filled in.'}
            </p>
          </div>
        </form>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <a href="#top">Back to top</a>
      </footer>
    </section>
  );
}
