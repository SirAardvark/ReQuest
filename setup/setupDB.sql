CREATE TABLE `request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `status_id` int NOT NULL,
  `requestor_id` int NOT NULL,
  `assignee_id` int NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `details` varchar(1000) NOT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request.id_UNIQUE` (`request_id`),
  KEY `status-id_idx` (`status_id`),
  KEY `user-id_idx` (`requestor_id`),
  KEY `assignee-id_idx` (`assignee_id`),
  CONSTRAINT `assignee_id` FOREIGN KEY (`assignee_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `requestor_id` FOREIGN KEY (`requestor_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `status_id` FOREIGN KEY (`status_id`) REFERENCES `request.status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `request.activity` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `activity_type_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_date` datetime NOT NULL,
  `message` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `idrequest.activity_UNIQUE` (`activity_id`),
  KEY `activity-type-id_idx` (`activity_type_id`),
  KEY `user-id_idx` (`user_id`),
  KEY `request-id_idx` (`request_id`),
  CONSTRAINT `activity_type_id` FOREIGN KEY (`activity_type_id`) REFERENCES `request.activitytype` (`type_id`),
  CONSTRAINT `request_id` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `request.activitytype` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `idrequest.activitytype_UNIQUE` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `request.status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `status-id_UNIQUE` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `iduser_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `role-id_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `user.role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user.role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
