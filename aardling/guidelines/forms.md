# Forms

Every form on an Aardling surface — the newsletter, the contact form, a workshop enquiry —
is built from this file. It adds no colour, no size, no spacing step and no radius: everything
below is a token the brand already publishes, used for a job it already describes. The colours
of a control are in `colour.md`, the spacing ladder and the radii in `layout.md`, the focus
ring and the state behaviour in `web.md`. This file says how a form is assembled from them.

## Anatomy

A field is four things, stacked, always in this order:

1. the label
2. the help text
3. the control
4. the error message

Stacked, never side by side. A reader meets the question, then the guidance, then the box —
which is the order they need them in, and the order a screen reader announces them in.

| Part | Treatment |
| --- | --- |
| Label | `--font-size-body`, `--font-weight-medium`, `--text-primary`. Always visible. |
| Help text | `--font-size-small`, `--text-secondary`, `--space-1` below the label. Wired with `aria-describedby`. |
| Control | `--space-2` below whatever precedes it. 1px `--border-control`, `--radius-sm`, ground `--surface-raised`, padding 12px vertical and `--space-2` horizontal, never under 44px high. |
| Error message | `--font-size-small`, `--text-error`, `--space-1` below the control. The border doubles to 2px at the same time, so the state is not carried by colour alone. |

The label is set at `--font-weight-medium` because it is the heading of its field. 600 is
reserved for emphasis inside running text and for table headers, and a stacked label is
neither.

**12px vertical padding is a literal, not a token.** It is the same figure a button takes in
`layout.md`, so a field and a button set beside each other agree on their height. This file
does not invent a tenth step of the spacing ladder to hold it.

**No placeholder text.** It disappears the moment somebody types, it is the first thing a
reader in a hurry loses, and it fails contrast the instant anyone lightens it to distinguish
it from a real value. Anything a placeholder would have said belongs in the help text. A
placeholder is never a label.

**A field is as wide as its answer deserves.** An email address takes the column; a postcode
takes about twelve characters. The form column itself never exceeds `--container-sm` (516px),
which keeps every label directly above the box it belongs to.

**Two fields never sit side by side below 720px** — and above it, only when they are genuinely
one answer, such as a first and a last name.

**Every control carries its `autocomplete`** — `email`, `name`, `organization`, `tel`. A
reader should be able to fill in an Aardling form without typing.

## Help text

Help text earns its place by preventing a specific mistake, or by answering the question a
reader would otherwise stop and ask. Text that restates the label is filler, and `voice.md`
deletes filler.

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

**Above the control, never below it.** Guidance that arrives after the box is guidance the
reader has already failed to use.

**Never a tooltip, and never behind an icon.** A hover state is unreachable on a touchscreen —
`web.md` — and help text is information, so it cannot live in one. If it matters enough to
write, it matters enough to show.

**One or two lines.** Longer than that and it is not help text; it is the paragraph that should
have gone above the fieldset.

**It says why, not only what.** "Include the country code" is an instruction. "So we can call
you back" is the reason somebody follows it.

## Required and optional

**Mark what is optional, in words, in the label.** Aardling's forms are short and nearly
everything on them is needed, so an asterisk on every field but one is noise.

```html
<label for="company">Company <span class="optional">(optional)</span></label>
```

The word is `--text-secondary` at `--font-weight-regular`, inside the label.

Never a bare asterisk: a symbol with a legend at the top of the form is a symbol whose legend
has scrolled out of sight. If most of a form is optional, invert it and mark the required ones
the same way, in words.

The best fix is usually deletion. A field whose answers nobody reads is not optional; it is
gone.

## Validation timing

**Reward early, punish late.** Tell somebody they are wrong as late as honestly possible, and
tell them they are right again as early as possible. Everything else follows from that.

| Moment | What happens | Why |
| --- | --- | --- |
| Typing, no error yet | Nothing at all. No message, no border change, no tick. | Half an email address is not a wrong email address. |
| Leaving a field that is empty | Nothing. | A reader tabbing through to see what is being asked has done nothing wrong. Empties are caught on submit. |
| Leaving a field that is filled in but wrong | The error appears. | They have finished their answer and it will not work. This is the last honest moment to say so. |
| Typing in a field that is already in error | Re-checked on every keystroke; the error goes the instant the value is right. | The reward half. Nobody should have to leave a field to find out they have fixed it. |
| Checkboxes, radios and selects | Judged on submit only. | Blur fires as a reader moves between the options of the group they are still answering. |
| Submit | Everything is checked. Focus moves to the summary, or to the first field in error where there is no summary. | The reader pressed a button and has to be told what it did. |
| The server rejects it | Rendered on the same field, in the same place, in the same words. | A reader cannot tell which side of the wire refused them, and should not have to. |

**Never disable the submit button.** A button that does nothing and does not say why leaves a
reader with nowhere to go. Let them press it, and tell them what is wrong. `colour.md` already
says that a disabled control which needs explaining should be explained in text instead.

**Never validate on a timer while somebody types.** Debounced live validation interrupts a
reader halfway through an address.

**Never the browser's own bubbles.** Put `novalidate` on the form and do the messaging here.
The native bubbles are unstyled, they time out on their own, they are not announced
consistently, and they are not in this brand's voice. Keep `type="email"`, `inputmode` and the
rest for the keyboard and the semantics.

**Nothing animates.** The error is there or it is not. Only the border colour transitions, at
`--duration-fast`.

**Never an asynchronous check per keystroke.** "Is this address already subscribed" runs on
blur or on submit, and never blocks typing.

**The reflow is accepted, not reserved against.** Inserting a message pushes the fields below
it down, and no space is held empty in advance for one. That is safe because of *when* errors
appear: on blur, focus has already left the field; on submit, focus moves deliberately. An
error never opens under a pointer that is halfway through a click.

## Error messages

An error message is the one piece of copy on the site written to somebody who is already
annoyed. It starts with a verb, it names the field, and it never uses the machine's vocabulary.

| Not this | This |
| --- | --- |
| This field is required. | Enter your email address. |
| Invalid email format. | This does not look like an email address. Check for a missing @, or a typo in the part after it. |
| Error: submission failed. | We could not send this. Try again in a moment — nothing you typed has been lost. |
| Please enter a valid date! | Enter the date as DD/MM/YYYY — 14/03/2026, for example. |
| You must accept the terms. | Tick the box to confirm you would like the workshop dates. |

Sentence case, a full stop, and no exclamation mark. British English, like everything else.

**It has to stand alone**, because it is repeated verbatim in the summary at the top of the
form. "Enter your email address" works there; "This field is required" does not.

**Never blame the reader.** Not "you entered an invalid value" — the field was unclear, or the
message was.

## The error summary

On a failed submit, a form with **more than one field** puts a single list of what is wrong
directly above its first field, after the form's heading. Not at the top of the page, where a
long form scrolls it out of sight.

- The container takes a 2px `--text-error` border and `--radius-md`, with `--space-3` of
  padding. Only its heading is `--text-error`; everything inside it is `--text-primary`.
- `role="alert"` and `tabindex="-1"`. Focus moves to it, so a screen reader hears the whole
  list and a sighted reader sees the ring.
- Every item is a link to its field's `id`, carrying the same words as the message on the
  field. The links are links: `--text-primary`, underlined, hover bringing the underline to
  full strength, exactly as `colour.md` sets out.
- The heading counts: "Two things need fixing before this can be sent."

**A one-field form gets no summary.** It would repeat the only message on screen, eight pixels
above itself.

## Fieldsets

Use `<fieldset>` and `<legend>` when a group of controls answers **one question**: a radio
group, a set of related checkboxes, a date split across three inputs, a name split in two.
That is the whole of it.

Company, role and team size are three questions, not one. They take a heading and `--space-6`
of air, not a legend and a border. A fieldset around them tells a screen reader that its legend
applies to all three, which is untrue.

- **The legend is the question** — "Which day suits you?" — not a category noun like "Day".
- **No border and no background.** The browser's default frame is switched off; the grouping is
  carried by the legend and by the space around it.
- General Sans at `--font-weight-heading` and `--font-size-h6`. Never Voyage: `typography.md`
  puts form section labels in the body face.
- One legend per fieldset, and **never a nested fieldset**. A form that seems to need one needs
  two sections, or two pages.
- A group's error message sits under the legend's help text, not under the last option. The
  group is what failed, not the third radio button.

## The controls

**Checkbox and radio** are a 24px box — `--icon-lg` — inside a row that is at least 44px tall,
and the whole row is the target. The box is 1px `--border-control` at rest on `--surface-raised`;
checked, it fills with `--text-primary` and the tick or the dot is drawn in `--surface-raised`.
The gap between the box and its text is `--space-2`.

The radio is **the one exception to the brand's three radii**. It is a circle, because round has
meant "one of these" since long before this brand existed, and a rounded square that is nearly a
circle only looks like a mistake.

**Select** is the native control, with `appearance: none` and the brand's own `arrow-down` mark
at `--icon-sm` set as a background image at the right, cleared by `--space-6` of padding. Never
a hand-built listbox: the native control gets the platform's own picker on a phone, and nothing
we write will beat it.

**Textarea** starts at five lines and resizes vertically only. Sideways resizing breaks the
column.

**A disabled control** is `--text-secondary` on `--surface-page` and carries `disabled` or
`aria-disabled`, as `colour.md` sets out. It is not dimmed further.

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

Lay the fields out with flex or grid and `gap`, not margins on the children — `layout.md`.

## The newsletter

One field. The reader gives an email address, and a confirmation email — a double opt-in —
does the rest.

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

The band sits on `--colour-violet` and carries `data-surface="light"`, which `web.md` requires
of any pastel that may end up on a dark page: without it the focus ring inside inherits Snow
White and measures 1.69 against the Violet. The button is the primary button — Night Blue on
Lime Green — unchanged in either theme.

The help text says what arrives, how often, and how to stop it. **The cadence is a fact and has
to be true**: write the frequency the list actually sends at, or do not state one. `voice.md`
does not allow a number without something behind it.

**On submit the form is replaced, where it stood, by the confirmation.** Not a new page, not a
modal, and not a line of text under a form that is still sitting there. The confirmation carries
`role="status"`, focus moves to it, and it names the address it sent to so a typo is visible
without leaving the page:

> **Check your inbox**
>
> We have sent a link to gien@aardling.eu. Open it and you are on the list. Nothing arrives
> until you do.
>
> Not there? It may be in your spam folder. Otherwise, try again — you can use a different
> address.

**No separate consent tick.** The purpose is stated immediately above the button, submitting is
an affirmative act, and the confirmation email is a second one that produces the audit record. A
tick that merely blocks a submit is doing less work than the confirmation link already does.
This is a legal position as much as a design one; if it is reversed, the tick goes between the
field and the button as an ordinary checkbox row, judged on submit only, never pre-ticked, and
never with the privacy notice folded into the same sentence as the consent.

**No name field.** Every extra field costs subscribers, and a first name is not used for
anything.

**Nothing is pre-ticked**, on this or any other form.

**No modal, no scroll-triggered pop-up, no exit-intent overlay.** The band sits in the page and
waits.

**No shamed decline.** No "no thanks, I don't care about architecture" link. A reader who is not
interested scrolls past.

## The success colour never carries the message

Success is carried by **words, and by the thing that was wrong disappearing** — never by a tick,
a green border, or a colour change on a field that has just become correct. When a field is
fixed, its error simply goes; that is the whole of the feedback, and it is enough.

The palette does now have a counterpart to the error red. `--text-success` was approved after
this section was written, and it changed nothing here: the words stay, and the colour only ever
accompanies them. `colour.md` says where it is allowed and what it must not do — a green border
with no message is not a confirmation.

## Both themes

A form is the same markup and the same roles in either theme. There is no dark variant: the
boundary is `--border-control`, which is `--colour-muted-grey` on a light ground and
`--colour-dark-muted-grey` on a dark one, and the error is `--text-error`, which re-points the
same way. A form inside `[data-surface="dark"]` — the footer, an inverted band — is correct
without a line of its own CSS.

Check a form in both themes before calling it finished, by switching the operating system
setting rather than a devtools override. `web.md` says why.
