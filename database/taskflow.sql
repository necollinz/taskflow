-- ======================
-- TASKFLOW DATABASE
-- PostgreSQL
-- ======================

-- ======================
-- USERS TABLE
-- ======================

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(50) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- CATEGORIES TABLE
-- ======================

CREATE TABLE categories (

    id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL
);

-- ======================
-- TASKS TABLE
-- ======================

CREATE TABLE tasks (

    id SERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    completed BOOLEAN DEFAULT FALSE,

    priority VARCHAR(20),

    due_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    user_id INTEGER,

    category_id INTEGER,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id),

    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
);

-- ======================
-- INSERT USERS
-- ======================

INSERT INTO users
(username, email)
VALUES

('alex', 'alex@example.com'),

('maria', 'maria@example.com');

-- ======================
-- INSERT CATEGORIES
-- ======================

INSERT INTO categories
(name)
VALUES

('Учёба'),

('Работа'),

('Дом'),

('Личное');

-- ======================
-- INSERT TASKS
-- ======================

INSERT INTO tasks
(title, description, completed, priority, due_date, user_id, category_id)
VALUES

(
'Сделать практику',
'Закончить учебную практику',
FALSE,
'high',
'2026-05-30',
1,
1
),

(
'Купить продукты',
'Молоко, хлеб, сыр',
TRUE,
'medium',
'2026-05-25',
1,
3
),

(
'Подготовить презентацию',
'Слайды для защиты проекта',
FALSE,
'high',
'2026-06-01',
2,
2
);