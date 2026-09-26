# 02 — Mathematical Foundation for Secure Heavy-Document Upload

## Problem Statement

Heavy documents require a transfer mechanism that is resumable, integrity-preserving, and resistant to partial corruption or tampering, while remaining free of proprietary dependencies and suitable for progressive rendering.

## Formal Model

Let a document \( D \) of size \( N \) bytes be partitioned into an ordered sequence of chunks \( C_i \) of fixed size \( S \) (default 1 MiB, configurable by the implementer within documented bounds), where

\[
i = 0, 1, \dots, \lceil N / S \rceil - 1.
\]

For each chunk compute the cryptographic digest

\[
h_i = \mathrm{SHA\text{-}256}(C_i).
\]

The overall integrity root is defined as the Merkle root \( R \) of the ordered sequence \( \{ h_i \} \).

## Resumability and Verification

A client maintains a bit-vector or sparse set of completed chunk indices.  
Only missing chunks are transmitted.  
Upon receipt of all required chunks, the receiving side recomputes the Merkle root.  
If the recomputed root diverges from the declared \( R \), the assembly is rejected.

## Optional Authenticated Encryption

Prior to transmission, each chunk may be protected by AES-GCM under a per-session key derived from a user-controlled or device-bound secret.  
The encryption step is orthogonal to the integrity root and does not alter the Merkle construction.

## Stream Reuse for Progressive Rendering

The same chunk pipeline supports progressive rendering: once a verified prefix of chunks is available, the reader may begin decoding and displaying text or pages while remaining chunks continue to arrive in the background.

## Guarantees

- Partial uploads are restartable without retransmission of completed data.
- Tampering or corruption is detectable via root divergence.
- The algorithm remains free of proprietary dependencies and is fully implementable in standard web and native environments.

---

Previous: [01-Objectives-and-Scope](01-Objectives-and-Scope.md)  
Next: [03-Architecture-and-CRUD](03-Architecture-and-CRUD.md)
