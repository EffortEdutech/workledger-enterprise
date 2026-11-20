# G49 — Simulated Client Portfolio and Partner Presentation Go-Live

Status: **IN PROGRESS — PORTFOLIO SEED CREATED**  
Release class: fictional client simulation

## Fictional partner-demo clients

| Client | Project | Contract | Profile |
|---|---|---|---|
| Northbank Development Group | Northbank Mixed Development | NB-042 | Active mixed-use development · RM 48.2m |
| Meridian Infrastructure Partners | Meridian Transit Enabling Works | MT-118 | Active infrastructure works · RM 72.6m |
| Harbourview Property Holdings | Harbourview Residences | HV-207 | Pre-construction property project · RM 31.8m |

The portfolio is stored in `ui/app/clientPortfolio.js`. It contains fictional organizations and seeded project summaries for programme, BOQ, diary, evidence, review, and reporting demonstrations.

## Partner presentation sequence

1. Open the stable WorkLedger Enterprise demo URL.
2. Explain that the current context is a fictional seeded client project.
3. Present Northbank as the primary end-to-end workflow.
4. Switch the narrative to Meridian to show portfolio scale and infrastructure variation.
5. Switch to Harbourview to show a pre-construction lifecycle state.
6. Demonstrate Field Diary → Admin Review → Programme Actuals → Evidence/Audit → Reports.
7. Explain that all client names, values, projects, records, and source processes are simulated.

## Seeded evidence model

Each fictional project is intended to carry:

- Contract and appointment scope
- Site diary records and local evidence
- Programme and BOQ references
- Review and verification history
- Provenance, source digest, custody, and audit/CIPAA markers
- Published and draft report examples

## Boundary

- All portfolio data is fictional and synthetic.
- No client, contractor, consultant, or site-personnel identity is real.
- No live Contract Diary or QS source is connected by this portfolio.
- Writes remain disabled and Field Diary remains local/offline-first.
- This is a simulated client Go-Live for partner presentation, not secure client production.

## Current evidence

- Portfolio fixture and summary tests added.
- Existing functional-demo acceptance: `docs/G45_SIMULATED_GO_LIVE_ACCEPTANCE.md`.
- Presentation package: `docs/G46_FUNCTIONAL_DEMO_PRESENTATION_PACKAGE.md`.
- Stakeholder acceptance: `docs/G47_STAKEHOLDER_DEMO_FEEDBACK_AND_ACCEPTANCE.md`.
