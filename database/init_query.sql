CREATE TABLE Posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,

  post_title VARCHAR(64),
  post_text VARCHAR(64),

  post_publish_date DATETIME,
  post_user VARCHAR(64)
);

CREATE TABLE Contributions (
  cont_post INT,
  cont_user VARCHAR(64),
  
  cont_text VARCHAR(64),
  cont_publish_date DATETIME,
  
  PRIMARY KEY (cont_post, cont_user)
);

CREATE TABLE Follow (
  follower VARCHAR(64),
  followed VARCHAR(64),

  PRIMARY KEY (follower, followed)
);


INSERT INTO Posts (post_title, post_text, post_publish_date, post_user) VALUES
  ('Post 1', 'Text for Post 1', '2023-05-21 10:00:00', 'User1'),
  ('Post 2', 'Text for Post 2', '2023-05-02 11:30:00', 'User2'),
  ('Post 3', 'Text for Post 3', '2023-05-03 14:45:00', 'User3'),
  ('Post 4', 'Text for Post 4', '2023-05-04 09:20:00', 'User1'),
  ('Post 5', 'Text for Post 5', '2023-05-05 16:10:00', 'User2'),
  ('Post 6', 'Text for Post 6', '2023-05-06 12:30:00', 'User3'),
  ('Post 7', 'Text for Post 7', '2023-05-07 17:25:00', 'User1'),
  ('Post 8', 'Text for Post 8', '2023-05-08 10:40:00', 'User2'),
  ('Post 9', 'Text for Post 9', '2023-05-09 15:15:00', 'User3'),
  ('Post 10', 'Text for Post 10', '2023-05-10 13:50:00', 'User1'),
  ('Post 11', 'Text for Post 11', '2023-05-11 08:05:00', 'User2'),
  ('Post 12', 'Text for Post 12', '2023-05-12 19:00:00', 'User3'),
  ('Post 13', 'Text for Post 13', '2023-05-13 11:45:00', 'User1'),
  ('Post 14', 'Text for Post 14', '2023-05-14 14:20:00', 'User2'),
  ('Post 15', 'Text for Post 15', '2023-05-15 16:30:00', 'User3');

INSERT INTO Contributions (cont_post, cont_user, cont_text, cont_publish_date) VALUES
  (1, 'User1', 'Contribution 1', '2023-05-01 10:15:00'),
  (1, 'User2', 'Contribution 2', '2023-05-01 11:45:00'),
  (1, 'User3', 'Contribution 3', '2023-05-02 13:00:00'),
  (2, 'User1', 'Contribution 4', '2023-05-02 15:30:00'),
  (2, 'User2', 'Contribution 5', '2023-05-02 16:00:00'),
  (2, 'User3', 'Contribution 6', '2023-05-03 09:30:00'),
  (3, 'User1', 'Contribution 7', '2023-05-04 14:00:00'),
  (3, 'User2', 'Contribution 8', '2023-05-04 16:30:00'),
  (3, 'User3', 'Contribution 9', '2023-05-04 16:30:00'),
  (4, 'User3', 'Contribution 10', '2023-05-05 12:48:00'),
  (4, 'User2', 'Contribution 11', '2023-05-06 13:20:00'),
  (4, 'User1', 'Contribution 12', '2023-05-07 12:14:00'),
  (5, 'User1', 'Contribution 13', '2023-05-07 15:55:00'),
  (5, 'User2', 'Contribution 14', '2023-05-08 09:10:00'),
  (5, 'User3', 'Contribution 15', '2023-05-09 13:10:00'),
  (6, 'User2', 'Contribution 16', '2023-05-09 14:20:00'),
  (6, 'User3', 'Contribution 17', '2023-05-10 16:45:00'),
  (6, 'User1', 'Contribution 18', '2023-05-09 14:20:00'),
  (7, 'User1', 'Contribution 19', '2023-05-10 13:10:00'),
  (7, 'User2', 'Contribution 20', '2023-05-11 12:30:00'),
  (7, 'User3', 'Contribution 21', '2023-05-12 14:55:00'),
  (8, 'User1', 'Contribution 22', '2023-05-13 10:25:00'),
  (8, 'User2', 'Contribution 23', '2023-05-13 11:40:00'),
  (8, 'User3', 'Contribution 24', '2023-05-14 13:15:00'),
  (9, 'User1', 'Contribution 25', '2023-05-15 09:50:00'),
  (9, 'User2', 'Contribution 26', '2023-05-15 10:55:00'),
  (9, 'User3', 'Contribution 27', '2023-05-16 12:20:00'),
  (10, 'User1', 'Contribution 28', '2023-05-17 14:45:00'),
  (10, 'User2', 'Contribution 29', '2023-05-17 15:55:00'),
  (10, 'User3', 'Contribution 30', '2023-05-18 17:10:00'),
  (11, 'User2', 'Contribution 39', '2023-05-09 10:30:00'),
  (11, 'User3', 'Contribution 40', '2023-05-10 12:45:00'),
  (11, 'User1', 'Contribution 41', '2023-05-11 15:00:00'),
  (12, 'User2', 'Contribution 42', '2023-05-11 16:30:00'),
  (12, 'User1', 'Contribution 43', '2023-05-12 09:20:00'),
  (12, 'User3', 'Contribution 44', '2023-05-13 11:40:00'),
  (13, 'User1', 'Contribution 45', '2023-05-14 13:30:00'),
  (13, 'User2', 'Contribution 46', '2023-05-15 15:10:00'),
  (13, 'User3', 'Contribution 47', '2023-05-16 10:15:00'),
  (14, 'User2', 'Contribution 48', '2023-05-16 12:45:00'),
  (14, 'User1', 'Contribution 49', '2023-05-17 14:30:00'),
  (14, 'User3', 'Contribution 50', '2023-05-18 16:20:00'),
  (15, 'User1', 'Contribution 51', '2023-05-19 09:45:00'),
  (15, 'User2', 'Contribution 52', '2023-05-20 11:30:00'),
  (15, 'User3', 'Contribution 53', '2023-05-21 14:10:00');
