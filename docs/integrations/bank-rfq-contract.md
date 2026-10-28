# Bank RFQ exchange contract (proposal)

This document describes a future file-based integration boundary for Velto. The current application has no SFTP connection: dispatches, acknowledgements, and quotations shown in the UI are local demonstrations only. A bank remains responsible for generating every quote and contractual term.

## Exchange lifecycle

1. Velto creates an RFQ and an immutable revision for each distributed version.
2. A delivery adapter writes one request envelope per counterparty to that counterparty's agreed location.
3. The bank returns an acknowledgement or a rejection referencing the RFQ ID and revision.
4. The bank returns a quote response with a unique bank quote ID. Velto validates it and links it to the matching RFQ and counterparty.
5. Repeated deliveries or responses with the same idempotency key are recognized as duplicates, not new business events.

The transport adapter must keep delivery, acknowledgement, quote receipt, client selection, bank price confirmation, and execution as separate events. Retries must not create another RFQ or quote.

## RFQ request envelope

```json
{
  "schemaVersion": "1.0",
  "messageType": "rfq.request",
  "messageId": "msg-01J9RFQ7N3M2",
  "idempotencyKey": "RFQ-2026-0148:revision:1:BNP-PARIBAS",
  "createdAt": "2026-10-28T09:30:00Z",
  "rfq": {
    "rfqId": "RFQ-2026-0148",
    "revision": 1,
    "clientReference": "NORTHSTAR-CLIENT-REF",
    "productTemplate": "autocall",
    "underlyings": [
      { "identifierType": "indexTicker", "identifier": "SX5E" }
    ],
    "notional": { "amount": "5000000", "currency": "EUR" },
    "terms": {
      "tenor": "5Y",
      "downsideBarrierPercent": "60",
      "autocallTriggerPercent": "100",
      "couponTargetPercent": "8",
      "couponTargetMeaning": "client_requirement"
    },
    "responseDeadline": "2026-10-29T14:00:00+02:00"
  },
  "counterparty": { "counterpartyId": "BNP-PARIBAS" }
}
```

Amounts and percentage terms are decimal strings to avoid ambiguity from binary floating point. Optional terms that the client did not provide are omitted; they are never silently defaulted by the transport layer. The client coupon target is explicitly labelled as a requirement, not a Velto price.

## Bank acknowledgement

```json
{
  "schemaVersion": "1.0",
  "messageType": "rfq.acknowledgement",
  "messageId": "bank-msg-889102",
  "receivedAt": "2026-10-28T09:31:12Z",
  "rfqId": "RFQ-2026-0148",
  "revision": 1,
  "counterpartyId": "BNP-PARIBAS",
  "status": "accepted",
  "bankReference": "BNPP-RFQ-55291"
}
```

An acknowledgement confirms receipt or acceptance for processing only. It is not a quotation or a commitment to transact.

## Bank quotation response

```json
{
  "schemaVersion": "1.0",
  "messageType": "quote.response",
  "messageId": "bank-msg-889245",
  "idempotencyKey": "BNP-PARIBAS:BNPP-Q-55291:1",
  "receivedAt": "2026-10-28T10:04:31Z",
  "rfqId": "RFQ-2026-0148",
  "revision": 1,
  "counterpartyId": "BNP-PARIBAS",
  "bankQuoteId": "BNPP-Q-55291",
  "quoteStatus": "quoted",
  "quoteType": "indicative",
  "validUntil": "2026-10-28T14:00:00+02:00",
  "terms": {
    "couponPercent": "8.15",
    "downsideBarrierPercent": "60",
    "tenor": "5Y"
  },
  "bankNotes": "Subject to final documentation and market conditions."
}
```

The quoted coupon, barriers, tenor, validity, and firm/indicative status are supplied by the bank. Velto may validate format and consistency with the referenced request, but must not calculate or fill in missing economic terms. Invalid or unmatched responses should be retained in an operational error log and must not appear as valid offers.

## Operational requirements before connecting a bank

- Agree the schema version, identifiers, time zone, folder naming, file format, encryption, and acknowledgement semantics with that counterparty.
- Keep credentials and private keys in a backend-managed secret store; never put them in frontend code or this example.
- Record delivery attempts, response validation, retries, and timestamps as append-only events.
- Enforce per-counterparty idempotency and reject stale or unknown RFQ revisions.
- Treat malformed files, duplicate responses, rejections, and expired quotations as explicit operational states.
- Test with the bank's certification environment before enabling real delivery.

This proposal is not a live integration specification until it is reviewed and agreed with each counterparty.
