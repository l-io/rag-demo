CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE
    IF NOT EXISTS chunks (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
        document_title text NOT NULL,
        chunk_index int NOT NULL,
        content text NOT NULL,
        embedding vector (1024) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now ()
    );

CREATE INDEX IF NOT EXISTS chunks_embedding_idx ON chunks USING hnsw (embedding vector_cosine_ops);