const mongoose = require('mongoose');

// URL de conexão com o MongoDB
const uri = "mongodb://localhost:27017/thecollegestore"; // Substitua pela sua URI e banco de dados

// Conectando ao MongoDB com Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartData: Object,
  date: Date
});

// Criando o modelo
const User = mongoose.model('User', userSchema);

// Função para remover usuários por substring no email
async function removeUsuariosPorSubstringEmail(substring) {
  try {
    // Filtrando usuários que contêm a substring no email
    const query = { email: { $regex: substring, $options: "i" } }; // "i" para case-insensitive

    // Removendo usuários
    const result = await User.deleteMany(query);

    console.log(`${result.deletedCount} usuário(s) removido(s) que contêm '${substring}' no email.`);
    await new Promise(resolve => setTimeout(resolve, 10000));
  } catch (error) {
    console.error("Erro ao remover usuários:", error);
  } finally {
    // Fechando a conexão com o MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Substitua a substring abaixo pelo valor desejado
removeUsuariosPorSubstringEmail("meuemail");
