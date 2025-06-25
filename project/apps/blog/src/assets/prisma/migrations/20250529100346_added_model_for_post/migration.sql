-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "announce" VARCHAR(255) NOT NULL,
    "content" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "text" VARCHAR(300) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "format" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photo_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_posts" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" VARCHAR(300),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_title_idx" ON "posts"("title");

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "video_posts_post_id_key" ON "video_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "text_posts_post_id_key" ON "text_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "quote_posts_post_id_key" ON "quote_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "photo_posts_post_id_key" ON "photo_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "link_posts_post_id_key" ON "link_posts"("post_id");

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_posts" ADD CONSTRAINT "photo_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
