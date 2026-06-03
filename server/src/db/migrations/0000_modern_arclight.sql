CREATE TABLE `blacklisted_refresh_token` (
	`id` text PRIMARY KEY NOT NULL,
	`refresh_token` text NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`email` text(240) NOT NULL,
	`password` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);