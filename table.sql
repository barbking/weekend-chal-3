
-- true default for active column indicates active task,
-- false value for active column indicates completed task

CREATE TABLE tasks (
	  id SERIAL PRIMARY KEY NOT NULL,
	  task VARCHAR(200),
	  active BOOLEAN DEFAULT 'true',
	  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
