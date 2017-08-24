const db = require('../db/config');
const User = {};

User.findByUserName = username => {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `,[username]);
};

User.create = user => {
    return db.one(`
    INSERT INTO users
    (username, password_digest, display_name, email, wins, currency)
    VALUES ($1, $2, $3, $4, 0, 100)
    RETURNING *
    `,[user.username, user.password_digest, user.displayName, user.email]);
};

User.update = (display_name, email, id)=>{
  return db.one(`
  UPDATE users SET
  display_name = $1,
  email = $2
  WHERE id = $3
  RETURNING *
  `,[display_name, email, id])
};

User.destroy = (id, user_id) => {
return db.none(`
  DELETE FROM users_cards where user_id = $1;
  DELETE FROM users WHERE id = $1
  `,[id]);
}

module.exports = User;