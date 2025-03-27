<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import { stackedTransactionChartOptions, stackedTransactionSeries, transactions, transactionsData } from '@/data/apps/transaction.js';

import CountUp from 'vue-countup-v3';
import SimpleCardComponent from "@/components/@spk/simple-card.vue";
import TableComponent from "@/components/@spk/table-reuseble/tables-re.vue";

export default {
    setup() {
        definePageMeta({
            middleware: ["auth"],
        })

    },
    components: {
        PageHeader,
        CountUp,
        SimpleCardComponent,
        TableComponent
    },
    data() {
        return {
            dataToPass: {
                current: "Transactions",
                list: [
                    'Apps', 'Crypto', 'Transactions'
                ]
            },
            stackedTransactionSeries: stackedTransactionSeries,
            stackedTransactionChartOptions: stackedTransactionChartOptions,
            transactionsData,
            transactions
        };
    },
    methods: {
        deleteTransaction(invoiceId: number) {
            const index = this.transactionsData.findIndex(invoice => invoice.id === invoiceId);

            if (index !== -1) {
                this.transactionsData.splice(index, 1);
            }
        }
    }
};
</script>

<template>
    <PageHeader :propData="dataToPass" />

    <!-- Start::row-1 -->
    <div class="row">
        <div class="col-xl-9">
            <SimpleCardComponent title="Transaction History" cardHeaderClass="justify-content-between"
                :showCardFooter="true">
                <template v-slot:showheader>
                    <div class="d-flex flex-wrap gap-2">
                        <div>
                            <input class="form-control form-control-sm" type="text" placeholder="Search Here"
                                aria-label="Search">
                        </div>
                        <div class="dropdown">
                            <a href="#" class="btn btn-primary btn-sm btn-wave waves-effect waves-light"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By <i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">This Week</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">This Month</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">This Year</a></li>
                            </ul>
                        </div>
                        <div>
                            <button class="btn btn-secondary btn-sm btn-wave">View All</button>
                        </div>
                    </div>
                </template>
                <TableComponent
                    :headers="['', 'Sender', 'Transaction Hash', 'Coin', 'Date', 'Amount', 'Receiver', 'Status', 'Actions']"
                    :rows="transactionsData" tableClass="table text-nowrap table-bordered" v-slot:cell="{ row }">
                    <td>
                        <span class="avatar avatar-sm avatar-rounded bg-light">
                            <i
                                :class="`ti ti-arrow-narrow-${row.arrowDirection} text-${row.arrowTextColor} fw-semibold fs-16`"></i>
                        </span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar avatar-xs avatar-rounded">
                                <img :src="(row.sendersrc)" alt="Sender Image">
                            </span>
                            <div class="fw-semibold">{{ row.senderName }}</div>
                        </div>
                    </td>
                    <td>
                        <span>#{{ row.transactionHash }}</span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <span class="avatar avatar-xs avatar-rounded">
                                <img :src="(row.coinSrc)" alt="Coin Image">
                            </span>
                            <div class="fw-semibold">{{ row.coinName }}</div>
                        </div>
                    </td>
                    <td>
                        <span>{{ row.date }}</span>
                    </td>
                    <td>
                        <span :class="`text-${row.amountColor}`">{{ row.amount }}</span>
                    </td>
                    <td>
                        <span>{{ row.receiver }}</span>
                    </td>
                    <td>
                        <span :class="`badge bg-${row.statusBadgeColor}-transparent`">{{ row.statusBadgeText }}</span>
                    </td>
                    <td>
                        <button class="btn btn-primary-light btn-icon btn-sm" data-bs-toggle="tooltip"
                            data-bs-placement="top" data-bs-title="download">
                            <i class="ri-download-2-line"></i>
                        </button>
                        <button class="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"
                            @click="deleteTransaction(row.id)">
                            <i class="ri-delete-bin-5-line"></i>
                        </button>
                    </td>
                </TableComponent>
                <template v-slot:cardFooter>
                    <nav aria-label="Page navigation">
                        <ul class="pagination mb-0 float-end">
                            <li class="page-item disabled">
                                <a class="page-link" href="javascript:void(0);">Previous</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
                            <li class="page-item active" aria-current="page">
                                <a class="page-link" href="javascript:void(0);">2</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="javascript:void(0);">Next</a>
                            </li>
                        </ul>
                    </nav>
                </template>
            </SimpleCardComponent>
        </div>
        <div class="col-xl-3">
            <div class="card custom-card">
                <div class="card-body p-0">
                    <div class="p-4 border-bottom border-block-end-dashed d-flex align-items-top flex-wrap gap-2"
                        v-for="card, index in transactions" :key="index">
                        <div :class="`svg-icon-background bg-${card.badgeClass}-transparent me-3`" v-html="card.icon">
                        </div>
                        <div class="flex-fill">
                            <h6 class="mb-2 fs-12">{{ card.title }}
                                <span :class="`badge bg-${card.badgeClass} fw-semibold float-end`">
                                    {{ card.badgeCount }}
                                </span>
                            </h6>
                            <div class="pb-0 mt-0">
                                <div>
                                    <h4
                                        class="fs-18 fw-semibold mb-2 d-flex gap-2 align-items-center justify-content-between">
                                        <count-up :end-val="card.countEndValue"></count-up><span
                                            class="text-muted float-end fs-11 fw-normal">Last Year</span>
                                    </h4>
                                    <p class="text-muted fs-11 mb-0 lh-1">
                                        <span :class="`${card.percentageClass} me-1 fw-semibold`">
                                            <i
                                                :class="`ri-arrow-${card.arrowIconClass}-s-line me-1 align-middle`"></i>{{
                                            card.percentageChange }}%
                                        </span>
                                        <span>this month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 pb-2">
                        <p class="fs-15 fw-semibold">Transactions Statistics <span class="text-muted fw-normal">(Last 6
                                months) :</span></p>
                        <apexchart height="210" type="bar" :options="stackedTransactionChartOptions"
                            :series="stackedTransactionSeries">
                        </apexchart>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End::row-1 -->
</template>

<style scoped></style>
