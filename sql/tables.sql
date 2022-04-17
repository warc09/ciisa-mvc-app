CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description_product TEXT,
	category VARCHAR(255) NOT NULL,
	price INT,
	image_product VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO users (first_name, last_name, email) VALUES (
	"Wilmer", "Rodriguez", "wilmer.rodriguez.czubaty@ciisa.cl"
);

INSERT INTO products (title, description_product, category, price, image_product) VALUES (
	"Whey Protein", "Proteina isolada de suero de leche", "Suplementos", "42200", "https://cdn.shopify.com/s/files/1/0288/3099/0420/products/s101006-5l-1-min-9bf7d2f9-c194-453e-861d-820fbdda273c_500x.jpg?v=1648646568"
);