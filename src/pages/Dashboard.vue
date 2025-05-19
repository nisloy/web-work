<template>
    <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center">
                    <div
                        class="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mr-4">
                        <DollarSignIcon class="h-6 w-6" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ balance }}     RWF
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                        <TargetIcon class="h-6 w-6" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Goals</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ goals.length }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center">
                    <div
                        class="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                        <CreditCardIcon class="h-6 w-6" />
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">This Month's Spending</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ thisMonthSpending }}     RWF
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Goals Progress</h2>
                <div v-if="goals.length > 0" class="space-y-4">
                    <div v-for="goal in goals" :key="goal.id" class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ goal.name }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                {{ goal.currentAmount }}    RWF / {{ goal.targetAmount }}     RWF
                            </span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div class="bg-emerald-500 h-2.5 rounded-full"
                                :style="{ width: `${calculateProgress(goal)}%` }"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
                    No goals yet. Create your first goal!
                </div>
            </div>
        </div>
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h2>
                <router-link to="/transactions" class="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                    View All
                </router-link>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Description
                            </th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="transaction in recentTransactions" :key="transaction.id">
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
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-right" :class="transaction.amount >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'">
                                {{ transaction.amount}}     RWF
                            </td>
                        </tr>
                        <tr v-if="recentTransactions.length === 0">
                            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                No transactions yet.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DollarSignIcon, TargetIcon, CreditCardIcon } from 'lucide-vue-next'
import { useFinanceStore } from '../stores/financeStore'

const balance = ref(0)
const goals = ref([])
const transactions = ref([])
const settings = ref({ currency: '    RWF', locale: 'en-US' })

// Computed
const recentTransactions = computed(() =>
    [...transactions.value]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
)

const thisMonthSpending = computed(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return transactions.value
        .filter(t => {
            const d = new Date(t.date)
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.amount < 0
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
})

// Methods
function formatCurrency(value) {
    return new Intl.NumberFormat(settings.value.locale, {
        style: 'currency',
        currency: settings.value.currency
    }).format(value)
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(settings.value.locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function getCategoryClass(category) {
    const classes = {
        Income: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        Savings: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        Bills: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        Transportation: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
        Travel: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
        Health: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
        Education: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
        Purchase: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    }
    return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

function calculateProgress(goal) {
    return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
}



// Lifecycle
onMounted(() => {
    const store = useFinanceStore()
    balance.value = store.balance
    goals.value = store.goals
    transactions.value = store.transactions
    settings.value = store.settings 
})
</script>
  
