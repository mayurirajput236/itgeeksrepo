const bcrypt = require('bcryptjs');
const db = require('./database/db.js'); // Adjust the path as necessary

const hashPasswords = async () => {
    const sql = 'SELECT * FROM admin'; // Select all admins
    db.query(sql, async (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return;
        }

        for (const user of results) {
            // Skip if the password is already hashed
            if (user.password && user.password.length < 60) { // Assuming bcrypt hash length
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const updateSql = 'UPDATE admin SET password = ? WHERE email = ?';
                db.query(updateSql, [hashedPassword, user.email], (err) => {
                    if (err) {
                        console.error(`Error updating password for ${user.email}:`, err);
                    } else {
                        console.log(`Updated password for ${user.email}`);
                    }
                });
            }
        }
    });
};

hashPasswords();
