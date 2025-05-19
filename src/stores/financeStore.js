import { defineStore } from "pinia";

export const useFinanceStore = defineStore("finance", {
  state: () => ({
    balance: 12500,
    goals: [
      {
        id: 1,
        name: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 6500,
        deadline: "2024-12-31",
        monthlyContribution: 500,
        category: "Savings",
        createdAt: "2023-10-15",
      },
      {
        id: 2,
        name: "New Car",
        targetAmount: 25000,
        currentAmount: 8000,
        deadline: "2025-06-30",
        monthlyContribution: 800,
        category: "Purchase",
        createdAt: "2023-08-01",
      },
      {
        id: 3,
        name: "Vacation",
        targetAmount: 5000,
        currentAmount: 2200,
        deadline: "2024-07-15",
        monthlyContribution: 300,
        category: "Travel",
        createdAt: "2023-11-10",
      },
    ],
    transactions: [
      {
        id: 1,
        date: "2023-12-01",
        category: "Income",
        amount: 3000,
        description: "Salary",
        goalId: null,
      },
      {
        id: 2,
        date: "2023-12-05",
        category: "Savings",
        amount: -500,
        description: "Emergency Fund Contribution",
        goalId: 1,
      },
      {
        id: 3,
        date: "2023-12-10",
        category: "Purchase",
        amount: -800,
        description: "New Car Fund",
        goalId: 2,
      },
      {
        id: 4,
        date: "2023-12-15",
        category: "Bills",
        amount: -1200,
        description: "Rent",
        goalId: null,
      },
      {
        id: 5,
        date: "2023-12-20",
        category: "Travel",
        amount: -300,
        description: "Vacation Fund",
        goalId: 3,
      },
    ],
    categories: [
      "Income",
      "Savings",
      "Bills",
      "Food",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Travel",
      "Health",
      "Education",
      "Purchase",
      "Other",
    ],
    settings: {
      currency: "USD",
      locale: "en-US",
      emailReminders: true,
      reminderDay: 1,
    },
  }),

  getters: {
    totalBalance: (state) => state.balance,

    activeGoals: (state) => state.goals.length,

    thisMonthSpending: (state) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      return state.transactions
        .filter((t) => {
          const transDate = new Date(t.date);
          return (
            transDate.getMonth() === currentMonth &&
            transDate.getFullYear() === currentYear &&
            t.amount < 0
          );
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    },

    goalById: (state) => (id) => {
      return state.goals.find((g) => g.id === parseInt(id));
    },

    goalProgress: (state) => (id) => {
      const goal = state.goals.find((g) => g.id === parseInt(id));
      if (!goal) return 0;
      return Math.min(
        100,
        Math.round((goal.currentAmount / goal.targetAmount) * 100)
      );
    },

    transactionsByGoal: (state) => (goalId) => {
      return state.transactions.filter((t) => t.goalId === parseInt(goalId));
    },

    monthlyData: (state) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const data = Array(12).fill(0);

      state.transactions.forEach((t) => {
        const date = new Date(t.date);
        const month = date.getMonth();
        if (t.amount > 0) {
          data[month] += t.amount;
        }
      });

      return {
        labels: months,
        data: data,
      };
    },

    categoryData: (state) => {
      const categoryTotals = {};

      state.transactions
        .filter((t) => t.amount < 0)
        .forEach((t) => {
          if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
          }
          categoryTotals[t.category] += Math.abs(t.amount);
        });

      return {
        labels: Object.keys(categoryTotals),
        data: Object.values(categoryTotals),
      };
    },
  },

  actions: {
    addGoal(goal) {
      const newId =
        this.goals.length > 0
          ? Math.max(...this.goals.map((g) => g.id)) + 1
          : 1;

      this.goals.push({
        ...goal,
        id: newId,
        currentAmount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      });
    },

    updateGoal(updatedGoal) {
      const index = this.goals.findIndex((g) => g.id === updatedGoal.id);
      if (index !== -1) {
        this.goals[index] = { ...this.goals[index], ...updatedGoal };
      }
    },

    deleteGoal(goalId) {
      this.goals = this.goals.filter((g) => g.id !== goalId);
      // Also remove related transactions
      this.transactions = this.transactions.filter((t) => t.goalId !== goalId);
    },

    addTransaction(transaction) {
      const newId =
        this.transactions.length > 0
          ? Math.max(...this.transactions.map((t) => t.id)) + 1
          : 1;

      const newTransaction = {
        ...transaction,
        id: newId,
      };

      this.transactions.push(newTransaction);

      // Update balance
      this.balance += transaction.amount;

      // If transaction is linked to a goal, update goal amount
      if (transaction.goalId) {
        const goalIndex = this.goals.findIndex(
          (g) => g.id === transaction.goalId
        );
        if (goalIndex !== -1) {
          this.goals[goalIndex].currentAmount += Math.abs(transaction.amount);
        }
      }
    },

    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings };
    },

    addContribution(goalId, amount) {
      // Add a transaction
      this.addTransaction({
        date: new Date().toISOString().split("T")[0],
        category: "Savings",
        amount: -Math.abs(amount),
        description: `Contribution to ${this.goals.find((g) => g.id === goalId)?.name || "goal"}`,
        goalId: goalId,
      });
    },
  },
});
