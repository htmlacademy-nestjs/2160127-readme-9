/*
  Warnings:

  - You are about to drop the `link_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quote_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `text_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "link_posts" DROP CONSTRAINT "link_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "photo_posts" DROP CONSTRAINT "photo_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "quote_posts" DROP CONSTRAINT "quote_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "text_posts" DROP CONSTRAINT "text_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "video_posts" DROP CONSTRAINT "video_posts_post_id_fkey";

-- DropTable
DROP TABLE "link_posts";

-- DropTable
DROP TABLE "photo_posts";

-- DropTable
DROP TABLE "quote_posts";

-- DropTable
DROP TABLE "text_posts";

-- DropTable
DROP TABLE "video_posts";
