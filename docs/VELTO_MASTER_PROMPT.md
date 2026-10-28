# VELTO — MASTER PROMPT FOR CLAUDE CODE
## Institutional Structured Products Brokerage Platform

You are a senior product designer, institutional trading-platform architect, and experienced React/TypeScript engineer.

Your mission is to build **Velto**, a premium institutional brokerage platform dedicated to structured products, with a particular focus on equity-linked structured products and autocalls.

Do not merely describe what you would build. Inspect the existing project, make the changes directly in the codebase, run the application, and implement the interface.

The result must look and feel like a serious professional financial platform used daily by institutional brokers, salespeople, and trading desks.

---

# 1. PRODUCT VISION

Velto is a **structured-products brokerage platform** connecting clients who want structured products with banks that manufacture and price them.

Velto is an intermediary and workflow platform. It is NOT a bank, an issuer, a valuation engine, or an internal pricing system.

The fundamental workflow is:

1. A client or broker creates a Request for Quote (RFQ).
2. The broker selects the relevant bank counterparties.
3. Velto distributes the RFQ to those banks.
4. Each bank returns its own quotation, either manually or through an automated integration.
5. Velto collects and organizes the returned quotations.
6. The broker compares the offers received from different banks.
7. The broker communicates with the client and manages the selection and execution process.
8. All offers, messages, status changes, and relevant timestamps remain traceable.

**Critical business rule:** Velto must never calculate, invent, estimate, or imply a fair value or theoretical price. All quoted prices, coupons, margins, and terms displayed as bank offers must originate from the relevant counterparty or be explicitly marked as demonstration data.

Velto creates value through distribution, workflow automation, counterparty connectivity, quote comparison, execution coordination, and auditability.

The platform should support both manual brokerage workflows and progressively automated bank integrations.

# 2. PRODUCT AND BUSINESS SCOPE

The initial target users are:

- Structured-products brokers.
- Institutional salespeople.
- Buy-side clients and professional investors.
- Bank sales and trading counterparties.
- Platform administrators.

The initial product focus is equity-linked structured products, especially:

- Autocalls.
- Worst-of autocalls.
- Reverse convertibles.
- Equity-linked notes.
- Capital-protected structured products.
- Other structured products that can be described through configurable product templates.

The architecture should be extensible to additional product families without requiring a complete redesign.

The initial implementation is a working prototype, not a live financial infrastructure. Use realistic demonstration data and clearly distinguish it from real bank quotations.

# 3. DESIGN DIRECTION

Create an interface that combines the sophistication of an institutional investment bank platform with the usability of a modern fintech product.

Visual references for the overall quality and information density are Bloomberg, institutional trading applications, premium capital-markets platforms, and modern enterprise SaaS interfaces. Do not copy their branding.

## Visual identity

Product name: VELTO.

Use a refined institutional palette:

- Deep navy blue for the main navigation and primary visual identity.
- White and very light grey for content surfaces.
- Muted blue for secondary elements.
- Strong but restrained blue accents for primary actions.
- Green for positive states and successful operations.
- Amber for pending actions and warnings.
- Red for rejected, failed, or expired states.
- Neutral grey for inactive and informational states.

Use a clean sans-serif font, precise spacing, subtle borders, restrained shadows, and carefully aligned tables.

The interface should feel premium, analytical, calm, and efficient.

Avoid:
- Excessive gradients.
- Large decorative illustrations.
- Oversized dashboard cards.
- Excessive rounded cards.
- Generic startup landing-page design.
- Unnecessary animations.
- Huge empty spaces.
- Fake charts that do not represent useful information.
- Excessive use of emojis.
- A toy-like or consumer-finance appearance.

Prefer compact layouts, clear hierarchy, excellent typography, professional tables, small status badges, contextual panels, and useful information density.

The application should be optimized for desktop use at 1440px and above, while remaining usable on smaller screens.

# 4. APPLICATION STRUCTURE

Build a complete application shell with:

## Left navigation

- Dashboard
- RFQ Desk
- Create RFQ
- Quotes & Comparisons
- Counterparties
- Clients
- Products
- Activity & Audit Trail
- Settings

Use a persistent left sidebar with appropriate icons, clear active states, and a compact VELTO logo/wordmark.

The navigation should be functional. Clicking each item must open its corresponding page or meaningful view. Do not create dead navigation links.

Include a professional top bar with:

- Current page title and breadcrumb where appropriate.
- Global search.
- Notifications.
- Current user profile and role.
- A primary “New RFQ” action where contextually appropriate.

# 5. DASHBOARD

Build an institutional brokerage dashboard focused on activity and operational control.

Include a compact summary of:

- Active RFQs.
- RFQs awaiting bank responses.
- RFQs with new quotations.
- RFQs approaching their deadlines.
- Completed RFQs.
- Recent activity.

Include a primary RFQ activity table showing:

- RFQ ID.
- Client.
- Product type.
- Underlying asset or basket.
- Notional.
- Currency.
- Number of banks invited.
- Number of responses received.
- RFQ status.
- Created time.
- Deadline.
- Assigned broker.

Provide a recent activity feed with events such as:

- RFQ created.
- RFQ sent to counterparties.
- Bank acknowledged receipt.
- New bank quote received.
- Quote updated.
- RFQ deadline approaching.
- Quote selected.
- RFQ cancelled or expired.

Every row and important dashboard element should lead to the corresponding RFQ or workflow.

Use realistic seeded data, with consistent IDs, statuses, counterparties, and timestamps.

Do not display fictional business statistics as verified live production data.

# 6. RFQ DESK — THE CORE OF VELTO

This is the most important screen in the application.

Build a professional RFQ blotter inspired by institutional trading workflows.

The table must support:

- Sorting.
- Search.
- Filtering by status.
- Filtering by client.
- Filtering by product type.
- Filtering by broker.
- Filtering by date.
- Filtering by counterparty response state.
- Pagination or an equivalent efficient browsing mechanism.

Suggested columns:

- RFQ ID.
- Client.
- Product.
- Underlying / Basket.
- Notional.
- Currency.
- Coupon target, if specified by the requester.
- Banks invited.
- Responses received.
- Best received offer, if available.
- Status.
- Deadline.
- Owner.
- Last activity.

A coupon target is a client requirement, not a Velto-generated price.

The “Best received offer” field must only compare valid quotations actually received from counterparties, using a clearly defined and relevant comparison criterion. Do not assume that the highest coupon is always the best offer. Product terms, protection barriers, issuer risk, tenor, and other conditions may differ.

Clicking an RFQ opens a detailed RFQ workspace.

Include clear status indicators for:

- Draft.
- Ready to send.
- Sending.
- Sent.
- Awaiting acknowledgement.
- Awaiting quotes.
- Partially quoted.
- Quotes received.
- Under client review.
- Selected.
- Executed.
- Cancelled.
- Expired.
- Failed.

The status model must be coherent. Do not mark an RFQ as quoted or executed merely because it has been created.

# 7. CREATE RFQ — PROFESSIONAL MULTI-STEP WORKFLOW

Create a polished RFQ creation workflow, preferably a step-by-step wizard with a visible progress indicator.

## Step 1 — Client and ownership

Fields:
- Client.
- Assigned broker.
- Client reference.
- Internal reference.
- RFQ deadline.
- Requested response time zone.
- Optional notes.

## Step 2 — Product definition

Allow the user to select a product template, starting with Autocall and Reverse Convertible.

For an equity-linked autocall, support configurable fields such as:

- Product name or template.
- Underlying assets or indices.
- Single underlying or basket.
- Worst-of basket designation.
- Currency.
- Notional.
- Tenor.
- Observation frequency.
- Autocall observation schedule.
- Autocall barrier.
- Coupon barrier.
- Coupon frequency.
- Capital protection or downside barrier.
- Coupon memory, if applicable.
- Other relevant contractual terms.

For a reverse convertible, expose the relevant underlying, coupon request, maturity, downside barrier, observation schedule, and other applicable contractual parameters.

Use appropriate controls: searchable asset selectors, numeric inputs, dropdowns, date fields, and compact structured sections.

Do not attempt to implement a pricing engine.

Do not calculate a theoretical coupon or fair value.

Support a flexible product schema so that different templates can expose different parameters.

If a parameter is optional or product-dependent, make that explicit. Do not silently assume contractual terms.

## Step 3 — Select counterparties

Allow the broker to select one or several banks.

Display a counterparty table containing:

- Bank name.
- Counterparty status.
- Supported product families.
- Integration mode.
- Last known connectivity or delivery status, when available.
- Selection checkbox.

Integration modes should include:

- Manual.
- SFTP.
- API — planned or configured, depending on actual implementation.

Never claim that a bank is genuinely connected when only demonstration data exists.

## Step 4 — Review and submit

Show a complete RFQ summary:

- Client and broker.
- Product terms.
- Underlying assets.
- Notional and currency.
- Selected counterparties.
- Deadline.
- Any missing or invalid mandatory fields.

Provide:
- Save as draft.
- Back.
- Submit RFQ.

On submission, the RFQ must enter the correct workflow state. In demonstration mode, simulate dispatch and record the event as simulated. Do not claim that an actual bank has received the RFQ unless a real integration confirms it.

# 8. RFQ DETAIL WORKSPACE

When a broker opens an RFQ, display a dedicated workspace.

Use a professional tabbed layout or clearly separated sections:

1. Overview.
2. Product terms.
3. Counterparty responses.
4. Quote comparison.
5. Messages and activity.
6. Audit trail.

The header should show the RFQ ID, client, product, notional, owner, deadline, and current status.

Include contextual actions such as:

- Edit draft.
- Send or resend, where appropriate.
- Add counterparties.
- Extend deadline.
- Cancel RFQ.
- Compare offers.
- Select an offer.
- Export RFQ details.

Actions must respect the RFQ's current state. For example, editing an already distributed RFQ must not silently overwrite the terms previously sent to banks.

If terms are amended after distribution, record a new revision and clearly indicate whether counterparties need to receive the updated version.

# 9. QUOTE COMPARISON — A CORE DIFFERENTIATOR

Build an excellent side-by-side comparison screen for quotations received from multiple banks.

The comparison must make it easy for a broker to identify meaningful differences between offers.

Show, where provided by the bank:

- Counterparty.
- Quoted coupon.
- Currency.
- Notional.
- Tenor.
- Autocall terms.
- Coupon barrier.
- Capital protection or downside barrier.
- Observation schedule.
- Settlement and maturity details.
- Quote timestamp.
- Quote validity / expiry.
- Firm or indicative status.
- Bank reference.
- Quote version.
- Additional terms or restrictions.

Only display values supported by the actual response or clearly marked demonstration data.

Use aligned columns or a comparison matrix. Highlight differences in contractual terms rather than relying only on the coupon.

Allow a broker to:

- Select an offer for further discussion.
- Mark an offer as preferred.
- Record a client decision.
- Reject or archive an offer.
- Export a comparison.
- Open the full quote details.

A selected offer is not automatically an executed transaction.

Keep distinct statuses for received, preferred, selected, accepted, and executed where applicable.

If offers are not economically comparable, show the differences and avoid ranking them as if they were equivalent.

**Never calculate a theoretical price, coupon, fair value, Greeks, or implied margin.** Velto displays and organizes data supplied by the relevant counterparties.

# 10. COUNTERPARTIES

Create a bank-counterparty directory with search, filters, and a detail page for each bank.

Display:

- Bank name and logo placeholder where appropriate.
- Active / inactive status.
- Supported product families.
- Contact information.
- Assigned internal relationship owner.
- Integration mode.
- Delivery and response history.
- Recent RFQs.
- Operational notes.

For SFTP-configured counterparties, the detail page should contain integration status and operational metadata, but never expose passwords, private keys, or other secrets.

Clearly distinguish:
- Configured integration.
- Successful connection test.
- Successful file delivery.
- Bank acknowledgement.
- Actual quote received.

These are different events and must not be conflated.

# 11. BANK CONNECTIVITY — ARCHITECTURE AND UX

The preferred first bank integration is SFTP because it is generally simpler to deploy than a bespoke real-time API.

Design the application so that the transport mechanism can evolve without changing the RFQ user experience.

## Target workflow

1. Velto creates an RFQ with a unique ID and revision.
2. Velto creates a structured RFQ payload.
3. A delivery adapter routes the payload to the appropriate counterparty.
4. For SFTP, the payload is written to the bank's designated outgoing or incoming exchange location according to the agreed protocol.
5. The bank's own system reads the RFQ and invokes its own pricing engine.
6. The bank returns a structured quotation file.
7. Velto imports and validates the response.
8. Velto links the response to the original RFQ and bank.
9. The response becomes visible in the comparison workspace.
10. All important events are logged.

The bank is responsible for generating the quote. Velto is responsible for transport, workflow, validation, organization, and presentation.

Use an adapter-based architecture, with a manual-response adapter and an SFTP adapter interface. An API adapter can be added later.

For the initial prototype:
- Implement the UI and simulated workflow.
- Define clean integration interfaces and payload examples.
- Do not pretend to have a working SFTP connection.
- Do not ask the user to provide real bank credentials.
- Keep configuration and secrets out of frontend code.

The future SFTP integration should consider:
- Structured JSON or CSV payloads with a documented schema.
- Unique RFQ and quote IDs.
- Revision numbers.
- Acknowledgements.
- Idempotent imports to prevent duplicate quotes.
- File validation and error handling.
- Timestamps and time zones.
- Firm versus indicative quotations.
- Quote validity and expiry.
- Rejected or malformed files.
- Retry logic.
- Delivery and processing logs.
- Secure credential management.
- Counterparty-specific configuration.

Include example payloads and document the intended integration contract.

# 12. CLIENTS

Create a client directory containing:

- Client name.
- Client reference.
- Relationship owner.
- Contact information.
- Status.
- Recent RFQs.
- Historical activity.

The client detail page should provide access to its RFQ history and relevant interactions.

Do not invent sensitive personal information.

# 13. PRODUCTS

Create a product-template library.

Each template should contain:
- Product family.
- Description.
- Configurable fields.
- Mandatory versus optional fields.
- Relevant validation rules.

Start with Autocall and Reverse Convertible templates.

Templates define the information required to request a quote. They do not calculate product value.

# 14. ACTIVITY AND AUDIT TRAIL

Implement a coherent event model.

Track events such as:
- RFQ created.
- RFQ edited.
- Revision created.
- Counterparty added or removed.
- RFQ dispatched.
- Delivery succeeded or failed.
- Acknowledgement received.
- Quote imported.
- Quote rejected due to validation.
- Quote updated.
- Offer selected or deselected.
- RFQ cancelled.
- RFQ expired.
- Client decision recorded.

Each event should include, where applicable:
- Timestamp.
- Actor or system.
- RFQ ID.
- Counterparty.
- Event type.
- Relevant status transition.
- Short description.

For a prototype, an append-only event list is sufficient. The design should support stronger audit requirements in a production implementation.

Do not represent the prototype as a certified regulatory or compliance system.

# 15. INTERACTION QUALITY

The interface must be functional, not just visually attractive.

Implement:
- Working navigation.
- Search.
- Table filters.
- Sorting.
- RFQ creation and validation.
- Saving drafts.
- RFQ submission.
- RFQ detail navigation.
- Counterparty selection.
- Simulated dispatch.
- Simulated quote receipt.
- Quote comparison.
- Offer selection.
- Activity history.
- Relevant confirmation dialogs.
- Useful empty states.
- Loading and error states.
- Toast notifications or equivalent feedback.
- Sensible handling of invalid inputs.

Use realistic seeded demonstration data to make the product feel populated immediately.

Seed data should include a range of RFQ states and multiple bank responses for at least some RFQs, so the comparison workflow can be demonstrated.

Ensure all related screens use consistent underlying data. Updating an RFQ or adding a simulated quote must be reflected across the dashboard, RFQ blotter, detail page, comparison view, and activity feed.

Do not create buttons that do nothing. If an operation is not implemented, clearly disable it or explain that it is not yet available.

# 16. TECHNICAL IMPLEMENTATION

First, inspect the existing project before changing anything.

Preserve and reuse the current React + TypeScript + Vite application and the existing Flask backend if present.

Do not rebuild the project from scratch unless the current implementation genuinely requires it.

Inspect:
- Project structure.
- Existing components.
- Dependencies.
- Existing styles.
- Current application entry point.
- Backend routes.
- Existing start scripts.

Then implement the new experience directly in the current project folder.

Technical preferences:
- React.
- TypeScript.
- Vite.
- Reusable components.
- Clear separation between pages, components, types, services, and demo data.
- Consistent styling system.
- Accessible controls.
- Lucide icons if already installed or if adding the dependency is appropriate.
- Flask for the existing Python backend, if applicable.

Use the existing CSS approach if it is sound. Do not introduce an unnecessary second UI framework.

Keep business data separate from presentation components.

Create typed models for:
- Client.
- Counterparty.
- Product template.
- RFQ.
- RFQ revision.
- Quote.
- Delivery attempt.
- Activity event.

Use a service layer for RFQ operations and quote retrieval so that demonstration data can later be replaced by backend endpoints without rewriting the UI.

If a Flask backend exists, add or adapt endpoints as appropriate. At minimum, consider endpoints for:
- Health check.
- RFQ listing and details.
- RFQ creation and updates.
- Quote listing and ingestion.
- Counterparties.
- Activity history.

Use persistent local storage or a lightweight database only if appropriate to the existing architecture. Do not assume that browser memory or seeded data constitutes production persistence.

Keep the initial implementation easy to run locally.

# 17. ENGINEERING RULES

Follow these rules throughout the implementation:

1. Do not replace the project with a new archive or ask the user to copy code between files manually.
2. Modify files directly in the current project.
3. Avoid unnecessary dependencies.
4. Do not overwrite working functionality without a reason.
5. Do not remove useful existing components without checking their role.
6. Never hardcode secrets or credentials.
7. Never connect to real banks or send real RFQs without explicit configuration and authorization.
8. Clearly mark simulated bank activity and demo quotations.
9. Do not fabricate live connectivity, actual bank acknowledgements, or real financial offers.
10. Do not implement a pricing engine.
11. Do not use fake theoretical prices to populate quote-comparison fields.
12. Do not stop after generating the first screen.
13. Do not merely provide recommendations or a plan. Execute the implementation.

# 18. IMPLEMENTATION PROCESS

Work in the following sequence.

### Phase 1 — Inspect

Inspect the existing codebase and determine how the current application works.

Identify what can be reused and what needs to be changed.

### Phase 2 — Establish the visual system

Implement the application shell, navigation, typography, palette, buttons, forms, status badges, tables, and common components.

### Phase 3 — Build the main workflows

Implement the Dashboard, RFQ Desk, Create RFQ wizard, RFQ Detail workspace, and Quote Comparison screens.

These are the highest-priority pages.

### Phase 4 — Complete supporting pages

Implement Counterparties, Clients, Products, Activity & Audit Trail, and Settings.

### Phase 5 — Wire up the data

Use consistent seeded data and a service layer. Ensure actions propagate across the application.

### Phase 6 — Validate

Run the frontend build and any available tests.

Run the backend if applicable. Fix compilation errors, broken imports, runtime errors, and obvious UI issues.

If browser testing is available, inspect the running application and verify the principal workflows.

Do not claim a test passed unless you actually ran it.

### Phase 7 — Report

At the end, provide a concise summary of:
- What was implemented.
- Which workflows are functional.
- Which integrations are simulated.
- Which production features remain outstanding.
- How to launch the application.

# 19. DEFINITION OF DONE

The work is complete when:

- The application launches locally.
- The UI looks like a polished institutional structured-products brokerage platform.
- The main navigation works.
- The dashboard displays consistent RFQ activity.
- The broker can create and submit a demonstration RFQ.
- The broker can select multiple counterparties.
- RFQ statuses evolve coherently.
- Simulated quotations can be received and compared.
- Quotations display their actual supplied terms and validity information.
- The broker can select an offer without incorrectly marking it as executed.
- The activity history reflects the important actions.
- The SFTP integration architecture is documented and prepared for future implementation.
- No theoretical pricing engine has been introduced.
- The interface does not falsely claim that real bank integrations exist.
- The existing project has been updated directly rather than replaced by a ZIP file.

# 20. FINAL PRODUCT PRINCIPLE

Velto should feel like the broker's operating system for structured-products distribution.

The broker should be able to understand, within seconds:
- Which RFQs need attention.
- Which banks have been contacted.
- Which banks have responded.
- Which quotations are valid.
- How the received offers differ.
- What the next action should be.

Prioritize a coherent end-to-end workflow, professional information design, data consistency, and credibility over decorative features.

**Start by inspecting the existing project, then implement the product directly. Do not stop at a proposal or a static mockup.**