# 03 — Architecture and CRUD Semantics

## Storage Model

- **Local primary store**: IndexedDB (or platform equivalent) for metadata and modest documents; File System Access API or Origin Private File System (OPFS) for heavy blobs where supported.
- **Optional remote store**: Authenticated object storage in which the Merkle root serves as the content-addressable key.

## CRUD Operations

All operations are defined with respect to the Merkle root as the canonical identity of a document version.

### Create
Upload or local import triggers computation of the Merkle root, followed by persistence of metadata and chunks.

### Read
Local-first.  
If the document is remote and connectivity is present, the root is verified before streaming begins.

### Update
Specific chunks may be replaced.  
The affected Merkle path is recomputed and the root rewritten.  
The operation remains idempotent with respect to the final root.

### Delete
Local entries are removed.  
When authorised, corresponding remote objects are deleted.  
Soft-delete with a recoverable tombstone for a configurable retention window is supported.

## Offline Behaviour

Mutations performed while offline are queued.  
Upon reconnection, reconciliation proceeds under a last-writer-wins policy augmented by Merkle-root conflict detection.

## Idempotency and Safety

Because identity is content-addressed via the root, repeated application of the same set of chunk operations yields the same final state.  
This property underpins safe retry and multi-device synchronisation scenarios.

---

Previous: [02-Mathematical-Foundation-Upload](02-Mathematical-Foundation-Upload.md)  
Next: [04-Reader-Viewer-Features](04-Reader-Viewer-Features.md)
