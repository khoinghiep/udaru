ALTER TABLE organizations ADD CONSTRAINT valid_chars CHECK (id SIMILAR TO '[A-Za-z0-9_-]+');
ALTER TABLE users ADD CONSTRAINT valid_chars CHECK (id SIMILAR TO '[A-Za-z0-9_-]+');
ALTER TABLE teams ADD CONSTRAINT valid_chars CHECK (id SIMILAR TO '[A-Za-z0-9_-]+');
ALTER TABLE policies ADD CONSTRAINT valid_chars CHECK (id SIMILAR TO '[A-Za-z0-9_-]+');

ALTER TABLE teams ADD CONSTRAINT unique_path UNIQUE (path);