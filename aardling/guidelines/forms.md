# Forms

1. Every form on an Aardling surface — newsletter, contact form, workshop enquiry — is built
   from this file.
2. Forms add no colour, size, spacing step or radius. Control colours are in `colour.md`;
   spacing and radii in `layout.md`; focus ring and states in `web.md`.

## Anatomy

A field is four parts, stacked in this order:

1. the label
2. the help text
3. the control
4. the error message

| Part | Treatment |
| --- | --- |
| Label | `--font-size-body`, `--font-weight-medium`, `--text-primary`. Always visible. |
| Help text | `--font-size-small`, `--text-secondary`, `--space-1` below the label. Wired with `aria-describedby`. |
| Control | `--space-2` below whatever precedes it. 1px `--border-control`, `--radius-sm`, ground `--surface-raised`, padding 12px vertical and `--space-2` horizontal, at least 44px high. |
| Error message | `--font-size-small`, `--text-error`, `--space-1` below the control. The border doubles to 2px at the same time. |

1. Never place the parts side by side.
2. The label is `--font-weight-medium`, not 600. 600 is for emphasis in running text and table
   headers.
3. The 12px vertical padding is a literal, not a token. It matches the button padding in
   `layout.md`, so a field and a button agree on height.
4. No placeholder text. A placeholder is never a label. Put its content in the help text.
5. Size a field to its answer: an email address takes the column; a postcode about twelve
   characters.
6. The form column never exceeds `--container-sm` (516px).
7. Below 720px, never put two fields side by side. Above it, only when they are one answer,
   such as first and last name.
8. Every control carries its `autocomplete`: `email`, `name`, `organization`, `tel`.

## Help text

1. Help text prevents a specific mistake or answers the question a reader would otherwise ask.
2. Never restate the label. See `voice.md`.
3. Place it above the control, never below.
4. Never in a tooltip or behind an icon.
5. One or two lines. Anything longer goes above the fieldset.
6. Say why, not only what: "Include the country code, so we can call you back."

> Yes: We reply from a person, not a ticketing system.
>
> Yes: Roughly how many engineers this would be for. An estimate is fine.
>
> Yes: Include the country code, so we can call you back.

> No: Please enter your email address in the field below.
>
> No: Required field.
>
> No: We take your privacy very seriously.

## Required and optional

1. Mark what is optional, in words, in the label.
2. The word is `--text-secondary` at `--font-weight-regular`, inside the label.
3. Never a bare asterisk.
4. If most of a form is optional, mark the required fields instead, in words.
5. Prefer deleting a field whose answers nobody reads.

```html
<label for="company">Company <span class="optional">(optional)</span></label>
```

## Validation timing

Report an error as late as honestly possible; clear it as early as possible.

| Moment | What happens |
| --- | --- |
| Typing, no error yet | Nothing. No message, no border change, no tick. |
| Leaving an empty field | Nothing. Empties are caught on submit. |
| Leaving a filled-in field that is wrong | The error appears. |
| Typing in a field already in error | Re-checked on every keystroke; the error goes the instant the value is right. |
| Checkboxes, radios and selects | Judged on submit only. |
| Submit | Everything is checked. Focus moves to the summary, or to the first field in error where there is no summary. |
| The server rejects it | Rendered on the same field, in the same place, in the same words. |

1. Never disable the submit button. Let the reader press it and say what is wrong. See
   `colour.md`.
2. Never validate on a timer while somebody types.
3. Never use the browser's validation bubbles. Put `novalidate` on the form. Keep `type="email"`,
   `inputmode` and the rest for keyboard and semantics.
4. Nothing animates. Only the border colour transitions, at `--duration-fast`.
5. Never run an asynchronous check per keystroke. Checks such as "already subscribed" run on
   blur or submit and never block typing.
6. Reserve no space for errors. An inserted message pushes the fields below it down.

## Error messages

1. Start with a verb, name the field, and never use the machine's vocabulary.
2. Sentence case, a full stop, no exclamation mark. British English.
3. The message stands alone: it is repeated verbatim in the error summary.
4. Never blame the reader. Not "you entered an invalid value".

| Not this | This |
| --- | --- |
| This field is required. | Enter your email address. |
| Invalid email format. | This does not look like an email address. Check for a missing @, or a typo in the part after it. |
| Error: submission failed. | We could not send this. Try again in a moment — nothing you typed has been lost. |
| Please enter a valid date! | Enter the date as DD/MM/YYYY — 14/03/2026, for example. |
| You must accept the terms. | Tick the box to confirm you would like the workshop dates. |

## The error summary

1. On a failed submit, a form with more than one field shows one list of errors directly above
   its first field, after the form's heading. Not at the top of the page.
2. Container: 2px `--text-error` border, `--radius-md`, `--space-3` padding.
3. Only the heading is `--text-error`; everything else is `--text-primary`.
4. `role="alert"` and `tabindex="-1"`. Focus moves to it.
5. Every item links to its field's `id` and carries the same words as the field's message.
6. Links are `--text-primary`, underlined in `--link-underline`, full strength on hover. See
   `colour.md`.
7. The heading counts: "Two things need fixing before this can be sent."
8. A one-field form gets no summary.

## Fieldsets

1. Use `<fieldset>` and `<legend>` only when a group of controls answers one question: a radio
   group, related checkboxes, a date split across three inputs, a name split in two.
2. Separate questions (company, role, team size) take a heading and `--space-6`, not a fieldset.
3. The legend is the question — "Which day suits you?" — not a category noun like "Day".
4. No border and no background. Switch off the browser's default frame.
5. Legend: General Sans at `--font-weight-heading` and `--font-size-h6`. Never Voyage. See
   `typography.md`.
6. One legend per fieldset. Never nest fieldsets; split into two sections or two pages.
7. A group's error message sits under the legend's help text, not under the last option.

## The controls

1. Checkbox and radio: a 24px box (`--icon-lg`) in a row at least 44px tall. The whole row is
   the target.
2. At rest: 1px `--border-control` on `--surface-raised`.
3. Checked: filled with `--text-primary`; tick or dot drawn in `--surface-raised`.
4. Gap between box and text: `--space-2`.
5. The radio is a circle: the one exception to the brand's three radii.
6. Select: the native control with `appearance: none`, the brand's `arrow-down` mark at
   `--icon-sm` as a background image at the right, cleared by `--space-6` of padding. Never a
   hand-built listbox.
7. Textarea: starts at five lines, resizes vertically only.
8. Disabled: `--text-secondary` on `--surface-page`, with `disabled` or `aria-disabled`. See
   `colour.md`. Not dimmed further.

## Spacing

| Between | Step | Value |
| --- | --- | --- |
| A label and its help text | `--space-1` | 8px |
| A label, or its help text, and its control | `--space-2` | 16px |
| A control and its error message | `--space-1` | 8px |
| One field and the next | `--space-3` | 24px |
| Options within one checkbox or radio group | none — the 44px rows touch | — |
| The last field and the submit button | `--space-4` | 32px |
| One fieldset or section and the next | `--space-6` | 48px |
| The width of the form column | `--container-sm` | 516px |

1. Lay out fields with flex or grid and `gap`, not margins on the children. See `layout.md`.

## The newsletter

```html
<section data-surface="light" class="newsletter">
  <h3>Get our writing by email</h3>
  <p>Notes from the engagements we can talk about, dates for open workshops, and the
     occasional long piece on <span class="nowrap">Domain-Driven Design</span>.</p>
  <form novalidate>
    <label for="nl">Email address</label>
    <span class="help" id="nl-help">…</span>
    <input type="email" id="nl" aria-describedby="nl-help"
           autocomplete="email" inputmode="email" spellcheck="false">
    <button type="submit">Subscribe</button>
  </form>
</section>
```

1. One field: the email address. A confirmation email (double opt-in) does the rest.
2. The band sits on `--colour-violet` and carries `data-surface="light"`. Without it the focus
   ring inherits Snow White and measures 1.69 against the Violet. See `web.md`.
3. The button is the primary button — Night Blue on Lime Green — in either theme.
4. The help text says what arrives, how often, and how to stop it.
5. State the cadence the list actually sends at, or none. See `voice.md`.
6. On submit, the confirmation replaces the form where it stood. Not a new page, not a modal,
   not a line under the form.
7. The confirmation carries `role="status"`, takes focus, and names the address it sent to.
8. No separate consent tick: the purpose is stated above the button, submitting is an
   affirmative act, and the confirmation email is the audit record. If that legal position is
   reversed, the tick goes between field and
   button as an ordinary checkbox row, judged on submit only, never pre-ticked, and never with
   the privacy notice in the same sentence as the consent.
9. No name field.
10. Nothing is pre-ticked, on this or any other form.
11. No modal, no scroll-triggered pop-up, no exit-intent overlay.
12. No shamed decline link.

> **Check your inbox**
>
> We have sent a link to gien@aardling.eu. Open it and you are on the list. Nothing arrives
> until you do.
>
> Not there? It may be in your spam folder. Otherwise, try again — you can use a different
> address.

## Success

1. Success is carried by words, and by the error disappearing.
2. Never a tick, a green border, or a colour change on a field that has become correct.
3. `--text-success` may accompany words, never replace them. See `colour.md`.

## Both themes

1. A form uses the same markup and roles in either theme. There is no dark variant.
2. `--border-control` is `--colour-muted-grey` on a light ground and `--colour-dark-muted-grey`
   on a dark one. `--text-error` re-points the same way.
3. A form inside `[data-surface="dark"]` needs no CSS of its own.
4. Check every form in both themes by switching the operating system setting, not a devtools
   override. See `web.md`.
