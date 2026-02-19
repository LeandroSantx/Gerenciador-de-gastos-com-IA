const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/expense');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// @route   POST api/expenses
// @desc    Adicionar um novo gasto ou receita
// @access  Private
router.post('/', auth, async (req, res) => {
  const { description, amount, type, category } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user.id,
      description,
      amount,
      type,
      category,
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});


// @route   GET api/expenses
// @desc    Obter todos os gastos do usuário autenticado
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// @route   PUT api/expenses/:id
// @desc    Editar um gasto específico do usuário
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { description, amount, type, category } = req.body;
  const expenseFields = { description, amount, type, category };

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Gasto não encontrado' });
    }

    // Verificar se o gasto pertence ao usuário autenticado
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: expenseFields },
      { new: true }
    );
    res.json(expense);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// @route   DELETE api/expenses/:id
// @desc    Deletar um gasto específico do usuário
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Gasto não encontrado' });
    }

    // Verificar se o gasto pertence ao usuário autenticado
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Gasto removido' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});


// @route   POST api/expenses/analyze
// @desc    Analisar gastos e obter insights da IA
// @access  Private
router.post('/analyze', auth, async (req, res) => {
  
  const expenses = req.body;

  if (!expenses || expenses.length === 0) {
    return res.status(400).json({ msg: 'Nenhum gasto ou receita foi fornecido para análise.' });
  }

  try {
    const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;

    const prompt = `
      Analise os seguintes dados de gastos e receitas.
      
      Resumo Rápido:
      - Receita Total: R$ ${totalIncome.toFixed(2)}
      - Despesa Total: R$ ${totalExpense.toFixed(2)}
      - Saldo: R$ ${balance.toFixed(2)}

      A seguir, os dados detalhados para análise completa:
      ${JSON.stringify(expenses, null, 2)}
    `;

    console.log("Tentando conectar na URL:", process.env.GEMINI_API_URL);
    const urlComKey = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;
    const response = await axios.post(
      urlComKey,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("ERRO DETALHADO:", err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    res.status(500).send('Erro ao se comunicar com a API de IA');
  }
});

module.exports = router;