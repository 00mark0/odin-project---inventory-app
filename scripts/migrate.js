import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const migrate = async () => {
  try {
    await pool.query(`
      ALTER TABLE items
      ALTER COLUMN price TYPE DECIMAL(10, 2);
    `);

    await pool.query(`
      -- Insert items for Electronics
      INSERT INTO items (name, description, category_id, quantity, price) VALUES
      ('Laptop', 'A high-performance laptop', (SELECT id FROM categories WHERE name = 'Electronics'), 10, 999.99),
      ('Smartphone', 'A latest model smartphone', (SELECT id FROM categories WHERE name = 'Electronics'), 20, 699.99),
      ('Headphones', 'Noise-cancelling headphones', (SELECT id FROM categories WHERE name = 'Electronics'), 15, 199.99),
      ('Smartwatch', 'A smartwatch with various features', (SELECT id FROM categories WHERE name = 'Electronics'), 25, 299.99),
      ('Tablet', 'A lightweight tablet', (SELECT id FROM categories WHERE name = 'Electronics'), 30, 399.99);

      -- Insert items for Furniture
      INSERT INTO items (name, description, category_id, quantity, price) VALUES
      ('Desk', 'A wooden office desk', (SELECT id FROM categories WHERE name = 'Furniture'), 5, 199.99),
      ('Chair', 'An ergonomic office chair', (SELECT id FROM categories WHERE name = 'Furniture'), 15, 89.99),
      ('Bookshelf', 'A large wooden bookshelf', (SELECT id FROM categories WHERE name = 'Furniture'), 10, 149.99),
      ('Sofa', 'A comfortable living room sofa', (SELECT id FROM categories WHERE name = 'Furniture'), 3, 499.99),
      ('Dining Table', 'A dining table with 6 chairs', (SELECT id FROM categories WHERE name = 'Furniture'), 2, 599.99);

      -- Insert items for Clothing
      INSERT INTO items (name, description, category_id, quantity, price) VALUES
      ('T-shirt', 'A cotton t-shirt', (SELECT id FROM categories WHERE name = 'Clothing'), 50, 19.99),
      ('Jeans', 'A pair of denim jeans', (SELECT id FROM categories WHERE name = 'Clothing'), 30, 49.99),
      ('Jacket', 'A warm winter jacket', (SELECT id FROM categories WHERE name = 'Clothing'), 20, 99.99),
      ('Sneakers', 'A pair of running sneakers', (SELECT id FROM categories WHERE name = 'Clothing'), 25, 79.99),
      ('Hat', 'A stylish hat', (SELECT id FROM categories WHERE name = 'Clothing'), 40, 29.99);

      -- Insert items for Books
      INSERT INTO items (name, description, category_id, quantity, price) VALUES
      ('Novel', 'A best-selling novel', (SELECT id FROM categories WHERE name = 'Books'), 100, 14.99),
      ('Textbook', 'A college-level textbook', (SELECT id FROM categories WHERE name = 'Books'), 50, 89.99),
      ('E-book Reader', 'A device for reading e-books', (SELECT id FROM categories WHERE name = 'Books'), 30, 129.99),
      ('Magazine', 'A monthly magazine subscription', (SELECT id FROM categories WHERE name = 'Books'), 200, 9.99),
      ('Comic Book', 'A popular comic book', (SELECT id FROM categories WHERE name = 'Books'), 150, 4.99);

      -- Insert items for Sports
      INSERT INTO items (name, description, category_id, quantity, price) VALUES
      ('Football', 'A standard size football', (SELECT id FROM categories WHERE name = 'Sports'), 20, 24.99),
      ('Tennis Racket', 'A lightweight tennis racket', (SELECT id FROM categories WHERE name = 'Sports'), 15, 79.99),
      ('Basketball', 'An official size basketball', (SELECT id FROM categories WHERE name = 'Sports'), 25, 29.99),
      ('Yoga Mat', 'A non-slip yoga mat', (SELECT id FROM categories WHERE name = 'Sports'), 30, 19.99),
      ('Running Shoes', 'A pair of running shoes', (SELECT id FROM categories WHERE name = 'Sports'), 20, 99.99);
    `);

    console.log("Migration completed successfully");
  } catch (err) {
    console.error("Migration failed", err);
  } finally {
    pool.end();
  }
};

migrate();
