const dataBase = require('../../database');

class ContactsRepository {
  async findAll() {
    const rows = await dataBase.query('SELECT * FROM contacts ORDER BY name ASC');
    return rows;
  }

  async findById(id) {
    const [row] = await dataBase.query('SELECT * from contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await dataBase.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async delete(id) {
    const deletedRow = await dataBase.query('DELETE FROM contacts WHERE id = $1', [id]);

    return deletedRow;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await dataBase.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await dataBase.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *`, [name, email, phone, category_id, id]);

    return row;
  }
}

module.exports = new ContactsRepository();
