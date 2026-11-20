-- migrate:up
CREATE INDEX idx_post_id_parent_id
ON comments(post_id, parent_id);

-- migrate:down
DROP INDEX IF EXISTS idx_post_id_parent_id;
