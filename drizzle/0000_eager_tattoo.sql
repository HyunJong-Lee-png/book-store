CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"published_date" date NOT NULL,
	"price" integer NOT NULL,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"sales_volume" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
