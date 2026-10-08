import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

const apiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};

export default function LeadForm({ type = 'contact' }) {

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: '',
    message: ''
  });

  const [state, setState] = useState('idle');

  const endpoint =
    type === 'health'
      ? '/api/health-checkup'
      : type === 'consultation'
        ? '/api/consultation'
        : type === 'lead-magnet'
          ? '/api/lead-magnet'
          : '/api/contact';


  const updateField = (field, value) => {
    setData(previous => ({
      ...previous,
      [field]: value
    }));
  };


  const submit = async event => {

    event.preventDefault();

    setState('loading');

    try {

      const response = await fetch(
        apiUrl(endpoint),
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(data)
        }
      );

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.error || 'Request failed'
        );
      }

      setState('success');

      setData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requirement: '',
        message: ''
      });

    } catch (error) {

      console.error(
        'Lead form submission failed:',
        error
      );

      setState('error');
    }
  };


  if (state === 'success') {

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
          ✓
        </div>

        <h3 className="mt-6 text-2xl text-white">
          Request received.
        </h3>

        <p className="mt-3 text-white/50">
          Thanks for reaching out. Our team will get back to you soon.
        </p>

        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-8 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
        >
          Send another request
        </button>

      </div>
    );
  }


  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
    >

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-white/50">
            Name *
          </label>

          <input
            required
            type="text"
            value={data.name}
            onChange={event =>
              updateField(
                'name',
                event.target.value
              )
            }
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>


        <div>
          <label className="mb-2 block text-sm text-white/50">
            Email *
          </label>

          <input
            required
            type="email"
            value={data.email}
            onChange={event =>
              updateField(
                'email',
                event.target.value
              )
            }
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>


        <div>
          <label className="mb-2 block text-sm text-white/50">
            Phone
          </label>

          <input
            type="tel"
            value={data.phone}
            onChange={event =>
              updateField(
                'phone',
                event.target.value
              )
            }
            placeholder="+91"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>


        <div>
          <label className="mb-2 block text-sm text-white/50">
            Company
          </label>

          <input
            type="text"
            value={data.company}
            onChange={event =>
              updateField(
                'company',
                event.target.value
              )
            }
            placeholder="Company name"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          />
        </div>

      </div>


      <div className="mt-5">

        <label className="mb-2 block text-sm text-white/50">
          Requirement
        </label>

        <input
          type="text"
          value={data.requirement}
          onChange={event =>
            updateField(
              'requirement',
              event.target.value
            )
          }
          placeholder="What do you need help with?"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
        />

      </div>


      <div className="mt-5">

        <label className="mb-2 block text-sm text-white/50">
          Message
        </label>

        <textarea
          rows={6}
          value={data.message}
          onChange={event =>
            updateField(
              'message',
              event.target.value
            )
          }
          placeholder="Tell us a little about your project..."
          className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
        />

      </div>


      {state === 'error' && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          Something went wrong while sending your request.
          Please try again.
        </div>
      )}


      <button
        type="submit"
        disabled={state === 'loading'}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === 'loading'
          ? 'Sending…'
          : 'Send request'}
      </button>

    </form>
  );
}