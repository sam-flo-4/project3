USE mysql_project_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE attractions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  rating FLOAT(2, 1) NOT NULL DEFAULT 0,
  category VARCHAR(50)
);

CREATE TABLE user_ratings (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  attraction_id INT NOT NULL,
  rating INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  FOREIGN KEY (attraction_id)
    REFERENCES attractions (id)
    ON DELETE CASCADE
);
