<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
            <button @click="showAddTransactionModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <plus-icon class="h-4 w-4 mr-1" />
                Add Transaction
            </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label for="dateRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date Range
                    </label>
                    <select id="dateRange" v-model="filters.dateRange"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                        <option value="all">All Time</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last3Months">Last 3 Months</option>
                        <option value="thisYear">This Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                <div v-if="filters.dateRange === 'custom'" class="md:col-span-2 grid grid-cols-2 gap-2">
                    <div>
                        <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Start Date
                        </label>
                        <input id="startDate" v-model="filters.startDate" type="date"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            End Date
                        </label>
                        <input id="endDate" v-model="filters.endDate" type="date"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                    </label>
                    <select id="category" v-model="filters.category"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>

                <div v-if="filters.dateRange !== 'custom'">
                    <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Search
                    </label>
                    <input id="search" v-model="filters.search" type="text" placeholder="Search description..."
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                </div>
            </div>

            <div class="flex justify-end mt-4">
                <button @click="resetFilters"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    Reset Filters
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Income</h3>
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ totalIncome }}RWF</p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</h3>
                <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ totalExpenses }}RWF</p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Balance</h3>
                <p class="text-2xl font-bold"
                    :class="netBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ netBalance }} RWF
                </p>
            </div>
        </div>

        <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                                <button @click="toggleSort('date')" class="ml-1 focus:outline-none">
                                    <chevron-up-icon v-if="sortConfig.key === 'date' && sortConfig.direction === 'asc'"
                                        class="h-4 w-4 inline" />
                                    <chevron-down-icon
                                        v-else-if="sortConfig.key === 'date' && sortConfig.direction === 'desc'"
                                        class="h-4 w-4 inline" />
                                    <chevrons-up-down-icon v-else class="h-4 w-4 inline text-gray-400" />
                                </button>
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Category</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Description</th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Amount
                                <button @click="toggleSort('amount')" class="ml-1 focus:outline-none">
                                    <chevron-up-icon
                                        v-if="sortConfig.key === 'amount' && sortConfig.direction === 'asc'"
                                        class="h-4 w-4 inline" />
                                    <chevron-down-icon
                                        v-else-if="sortConfig.key === 'amount' && sortConfig.direction === 'desc'"
                                        class="h-4 w-4 inline" />
                                    <chevrons-up-down-icon v-else class="h-4 w-4 inline text-gray-400" />
                                </button>
                            </th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {{ formatDate(transaction.date) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="getCategoryClass(transaction.category)">
                                    {{ transaction.category }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {{ transaction.description }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-right"
                                :class="transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                {{ transaction.amount }} RWF
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editTransaction(transaction)"
                                    class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 mr-3">
                                    Edit
                                </button>
                                <button @click="confirmDeleteTransaction(transaction.id)"
                                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>

                        <tr v-if="filteredTransactions.length === 0">
                            <td colspan="5" class="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                No transactions found matching your filters.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="showAddTransactionModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                        {{ editingTransaction ? 'Edit Transaction' : 'Add Transaction' }}
                    </h2>
                    <button @click="closeTransactionModal"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <x-icon class="h-5 w-5" />
                    </button>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="transactionDate"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date *
                        </label>
                        <input id="transactionDate" v-model="newTransaction.date" type="date" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                        <p v-if="errors.date" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.date }}</p>
                    </div>

                    <div>
                        <label for="transactionCategory"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category *
                        </label>
                        <select id="transactionCategory" v-model="newTransaction.category" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                            <option value="">Select a category</option>
                            <option v-for="category in categories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                        <p v-if="errors.category" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.category }}</p>
                    </div>

                    <div>
                        <label for="transactionAmount"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount *
                        </label>
                        <div class="flex items-center">
                            <select v-model="amountType"
                                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                                <option value="income">Income (+)</option>
                                <option value="expense">Expense (-)</option>
                            </select>
                            <div class="relative flex-1">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500 dark:text-gray-400">$</span>
                                </div>
                                <input id="transactionAmount" v-model="newTransaction.absoluteAmount" type="number"
                                    min="0.01" step="0.01" required
                                    class="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="0.00" />
                            </div>
                        </div>
                        <p v-if="errors.amount" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.amount }}
                        </p>
                    </div>

                    <div>
                        <label for="transactionDescription"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description *
                        </label>
                        <input id="transactionDescription" v-model="newTransaction.description" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. Salary, Rent, Groceries" />
                        <p v-if="errors.description" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.description }}</p>
                    </div>

                    <div>
                        <label for="transactionGoal"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Link to Goal (optional)
                        </label>
                        <select id="transactionGoal" v-model="newTransaction.goalId"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                            <option :value="null">None</option>
                            <option v-for="goal in goals" :key="goal.id" :value="goal.id">
                                {{ goal.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button @click="closeTransactionModal"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        Cancel
                    </button>
                    <button @click="saveTransaction"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        {{ editingTransaction ? 'Update' : 'Add' }}
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showDeleteConfirm"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6">
                    Are you sure you want to delete this transaction? This action cannot be undone.
                </p>
                <div class="flex justify-end space-x-3">
                    <button @click="showDeleteConfirm = false"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        Cancel
                    </button>
                    <button @click="deleteTransaction"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useFinanceStore } from '../stores/financeStore';
import {
    PlusIcon, XIcon, ChevronUpIcon, ChevronDownIcon,
    ChevronsUpDownIcon
} from 'lucide-vue-next';

const store = useFinanceStore();

const transactions = computed(() => store.transactions);
const categories = computed(() => store.categories);
const goals = computed(() => store.goals);

const filters = reactive({
    dateRange: 'all',
    startDate: '',
    endDate: '',
    category: '',
    search: ''
});

const sortConfig = reactive({
    key: 'date',
    direction: 'desc'
});


const showAddTransactionModal = ref(false);
const editingTransaction = ref(false);
const showDeleteConfirm = ref(false);
const transactionToDeleteId = ref(null);

// New transaction data
const newTransaction = reactive({
    date: new Date().toISOString().split('T')[0],
    category: '',
    absoluteAmount: '',
    description: '',
    goalId: null
});

// Amount type (income or expense)
const amountType = ref('expense');

// Form validation errors
const errors = reactive({
    date: '',
    category: '',
    amount: '',
    description: ''
});


onMounted(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    filters.startDate = firstDay;
    filters.endDate = lastDay;
});

// Format currency based on settings
const formatCurrency = (value) => {
    return new Intl.NumberFormat(store.settings.locale, {
        style: 'currency',
        currency: store.settings.currency
    }).format(value);
};

// Format date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(store.settings.locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Get category class for styling
const getCategoryClass = (category) => {
    const classes = {
        'Income': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'Savings': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'Bills': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        'Food': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        'Transportation': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        'Entertainment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        'Shopping': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
        'Travel': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
        'Health': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
        'Education': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
        'Purchase': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };

    return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

const filteredTransactions = computed(() => {
    let result = [...transactions.value];

    if (filters.dateRange !== 'all') {
        const now = new Date();
        let startDate, endDate;

        if (filters.dateRange === 'thisMonth') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else if (filters.dateRange === 'lastMonth') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        } else if (filters.dateRange === 'last3Months') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else if (filters.dateRange === 'thisYear') {
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31);
        } else if (filters.dateRange === 'custom') {
            if (filters.startDate && filters.endDate) {
                startDate = new Date(filters.startDate);
                endDate = new Date(filters.endDate);
                // Set end date to end of day
                endDate.setHours(23, 59, 59, 999);
            }
        }

        if (startDate && endDate) {
            result = result.filter(t => {
                const transDate = new Date(t.date);
                return transDate >= startDate && transDate <= endDate;
            });
        }
    }
    if (filters.category) {
        result = result.filter(t => t.category === filters.category);
    }
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(t =>
            t.description.toLowerCase().includes(searchTerm)
        );
    }
    result.sort((a, b) => {
        let comparison = 0;

        if (sortConfig.key === 'date') {
            comparison = new Date(a.date) - new Date(b.date);
        } else if (sortConfig.key === 'amount') {
            comparison = a.amount - b.amount;
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return result;
});

const totalIncome = computed(() => {
    return filteredTransactions.value
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
});

const totalExpenses = computed(() => {
    return filteredTransactions.value
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
});

const netBalance = computed(() => {
    return totalIncome.value - totalExpenses.value;
});

// Toggle sort
const toggleSort = (key) => {
    if (sortConfig.key === key) {
        sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortConfig.key = key;
        sortConfig.direction = 'desc';
    }
};

const resetFilters = () => {
    filters.dateRange = 'all';
    filters.category = '';
    filters.search = '';

    const now = new Date();
    filters.startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    filters.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
};

const editTransaction = (transaction) => {
    editingTransaction.value = true;


    amountType.value = transaction.amount >= 0 ? 'income' : 'expense';

    Object.assign(newTransaction, {
        id: transaction.id,
        date: transaction.date,
        category: transaction.category,
        absoluteAmount: Math.abs(transaction.amount),
        description: transaction.description,
        goalId: transaction.goalId
    });

    showAddTransactionModal.value = true;
};

const validateTransactionForm = () => {
    let isValid = true;

    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '');

    if (!newTransaction.date) {
        errors.date = 'Date is required';
        isValid = false;
    }

    if (!newTransaction.category) {
        errors.category = 'Category is required';
        isValid = false;
    }

    if (!newTransaction.absoluteAmount || parseFloat(newTransaction.absoluteAmount) <= 0) {
        errors.amount = 'Please enter a valid amount';
        isValid = false;
    }

    if (!newTransaction.description.trim()) {
        errors.description = 'Description is required';
        isValid = false;
    }

    return isValid;
};

// Save transaction
const saveTransaction = () => {
    if (!validateTransactionForm()) return;

    // Calculate actual amount based on type
    const amount = amountType.value === 'income'
        ? parseFloat(newTransaction.absoluteAmount)
        : -parseFloat(newTransaction.absoluteAmount);

    const transaction = {
        ...newTransaction,
        amount
    };

    if (editingTransaction.value) {
        // Update transaction
        store.updateTransaction(transaction);
    } else {
        // Add new transaction
        store.addTransaction(transaction);
    }

    closeTransactionModal();
};

const closeTransactionModal = () => {
    showAddTransactionModal.value = false;
    editingTransaction.value = false;

    // Reset form
    Object.assign(newTransaction, {
        date: new Date().toISOString().split('T')[0],
        category: '',
        absoluteAmount: '',
        description: '',
        goalId: null
    });

    amountType.value = 'expense';

    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '');
};

// Confirm delete
const confirmDeleteTransaction = (id) => {
    transactionToDeleteId.value = id;
    showDeleteConfirm.value = true;
};

const deleteTransaction = () => {
    if (transactionToDeleteId.value) {
        store.deleteTransaction(transactionToDeleteId.value);
        showDeleteConfirm.value = false;
        transactionToDeleteId.value = null;
    }
};
</script>