// Clave utilizada para firmar y verificar los tokens JWT
// En un entorno real debería venir desde una variable de entorno.

const secretKey = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';

module.exports = { secretKey };
