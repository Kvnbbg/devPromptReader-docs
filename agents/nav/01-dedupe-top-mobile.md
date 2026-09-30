# Task 01 — Dedupe TopNav / MobileNav panels

## Problem

Two UI sources render the same nav content (TopNav + MobileNav).

## Goal

Single shared nav model or shared panel component; orientation only changes chrome, not content tree twice.

## Constraints

- Portrait behavior unchanged
- Horizontal #4 rail behavior preserved (PR #73)
- Re-run nav/onboarding/feed tests (target 61/61)

## Do not

- Large rewrite without tests
- Break 44px touch targets

## Status

TODO — explicit debt from 2026-09-30 milestone
