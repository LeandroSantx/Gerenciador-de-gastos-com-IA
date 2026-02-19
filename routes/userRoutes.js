const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

// @route   POST api/users/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verificar se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // 2. Criar uma nova instância de usuário
    user = new User({
      name,
      email,
      password,
    });

    // 3. Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Salvar o usuário no banco de dados
    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});


// @route   POST api/users/login
// @desc    Autenticar usuário e gerar token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar se o usuário existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // 2. Comparar a senha fornecida com a senha criptografada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // 3. Gerar o token JWT
    const payload = {
      user: {
        id: user.id
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // O token expira em 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});


// @route   GET api/users/me
// @desc    Obter dados do usuário autenticado
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;