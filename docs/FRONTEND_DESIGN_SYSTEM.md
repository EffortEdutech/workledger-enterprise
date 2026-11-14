# WorkLedger Enterprise — Frontend Design System Baseline

Goal: G2 completion evidence
Status: Approved baseline for prototype-to-production implementation
Date: 14 November 2026 (MYT)

## Design direction

WorkLedger Enterprise uses a calm, professional, evidence-oriented interface. The visual system prioritises dense operational information, clear status boundaries, provenance, and long working sessions over decorative dashboard effects.

## Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| ink | #193447 | Primary text and headings |
| muted | #6D8290 | Secondary text and metadata |
| navy | #12384C | Application shell and authority |
| teal | #167D78 | Primary action and verified state |
| gold | #C99743 | Attention, pending, and review state |
| danger | #A64B45 | Destructive or rejected state |
| wash | #F4F7F8 | Application background |
| line | #DBE6EB | Borders and separators |
| card | #FFFFFF | Content surfaces |

Semantic status must not rely on colour alone. Every status uses text, and where appropriate an icon or supporting explanation.

### Spacing

Use a 4px base scale:

- 4px — icon and label gaps
- 8px — compact controls
- 12px — control padding and table cells
- 16px — card internal spacing
- 24px — section spacing
- 30px — page content gutters

### Typography

- Body: system sans-serif
- Page title: 26px, semibold
- Section title: 16px, semibold
- Body: 14px
- Metadata: 12px
- Labels: 11px uppercase with letter spacing

### Shape and elevation

- Card radius: 12px
- Control radius: 8px
- Status pill radius: 999px
- Border: 1px solid line token
- Shadow: low-contrast, broad, used only for content cards

## Component rules

- Primary actions use teal and one clear verb.
- Destructive actions use danger styling and require a reason.
- Pending and review states use gold plus explanatory text.
- Verified states use teal plus source/provenance context.
- Tables must support horizontal overflow on narrow screens.
- Detail views use summary header, tabs or sections, timeline, and provenance drawer.
- Empty states explain both why the view is empty and what the user can do.
- Denied states explain the scope boundary without exposing restricted information.

## Responsive rules

- Desktop: persistent left navigation and wide tables.
- Tablet: collapsible navigation and horizontally scrollable tables.
- Mobile: stacked cards, drawer navigation, and prioritised primary action.
- Do not hide evidence, status, or provenance solely because the viewport is narrow.

## Design acceptance

- [x] Visual direction approved by product owner through prototype approval.
- [x] Tokens represented in ui/enterprise_prototype.html.
- [x] Status language is explicit and non-legalistic.
- [x] Responsive layout rules documented.
- [x] Component rules documented.

