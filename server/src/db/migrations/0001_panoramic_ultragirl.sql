CREATE TABLE `budget` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`category` text NOT NULL,
	`limit_amount` real NOT NULL,
	`month` integer NOT NULL,
	`year` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `budget_unique_idx` ON `budget` (`user_id`,`category`,`month`,`year`);--> statement-breakpoint
CREATE TABLE `expense` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`category` text NOT NULL,
	`note` text,
	`expense_date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `expense_user_id_idx` ON `expense` (`user_id`);--> statement-breakpoint
CREATE INDEX `expense_expense_date_idx` ON `expense` (`expense_date`);--> statement-breakpoint
CREATE TABLE `income` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`source` text NOT NULL,
	`note` text,
	`income_date` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `income_user_id_idx` ON `income` (`user_id`);