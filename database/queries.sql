-- ======================
-- TASKFLOW SQL QUERIES
-- ======================

-- ======================
-- SELECT WITH WHERE
-- ======================

SELECT *
FROM tasks
WHERE completed = FALSE;

-- ======================
-- INSERT
-- ======================

INSERT INTO tasks
(title, description, completed, priority)
VALUES
(
'Новая задача',
'Тест INSERT',
FALSE,
'low'
);

-- ======================
-- UPDATE
-- ======================

UPDATE tasks
SET completed = TRUE
WHERE id = 1;

-- ======================
-- DELETE
-- ======================

DELETE FROM tasks
WHERE id = 4;

-- ======================
-- SELECT WITH JOIN
-- ======================

SELECT

tasks.title,
tasks.priority,
categories.name AS category,
users.username

FROM tasks

JOIN categories
ON tasks.category_id = categories.id

JOIN users
ON tasks.user_id = users.id;