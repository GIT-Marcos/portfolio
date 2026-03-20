import type { PersonalInfo } from '../../domain/entities/portfolio';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  const { name, role, focus, bio, contact } = personalInfo;
  const { email, phone, location, availability, links } = contact;

  const hasLinks = links !== undefined &&
    (links.linkedin !== undefined || links.github !== undefined || links.portfolio !== undefined);

  return (
    <section className="w-full border-b border-slate-800 pb-10">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          {name}
        </h1>
        <p className="mt-1 text-lg text-slate-400">{role}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {focus.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-8">{bio}</p>

      <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
        <a
          href={`mailto:${email}`}
          className="inline-flex justify-self-start w-fit items-center gap-2 text-sm text-slate-300 hover:text-sky-400 transition-colors"
        >
          <Mail className="h-4 w-4 shrink-0 text-sky-400" />
          <span>{email}</span>
        </a>

        {phone !== undefined && (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex justify-self-start w-fit items-center gap-2 text-sm text-slate-300 hover:text-sky-400 transition-colors"
          >
            <Phone className="h-4 w-4 shrink-0 text-sky-400" />
            <span>{phone}</span>
          </a>
        )}

        {location !== undefined && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4 shrink-0 text-sky-400" />
            <span>{location}</span>
          </div>
        )}

        {availability !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-medium">{availability}</span>
          </div>
        )}
      </div>

      {hasLinks && (
        <div className="mt-6 flex items-center gap-4">
          {links?.linkedin !== undefined && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-sky-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {links?.github !== undefined && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-sky-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {links?.portfolio !== undefined && (
            <a
              href={links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
              className="text-slate-500 hover:text-sky-400 transition-colors"
            >
              <Globe className="h-5 w-5" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}
