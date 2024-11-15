<template>
  <MdlContainer
    disable-padding
    wrapper-class="gap-2"
  >
    <template #header>
      <MdlSection
        direction="col"
        gap="[12px]"
        custom-classes="py-[20px] px-[24px]"
      >
        <MdlSection
          gap="[10px]"
          justify="between"
        >
          <MdlSection
            direction="col"
            width="[70%]"
          >
            <span class="text-cutured-950 text-[20px] font-semibold">{{ tableTitle }}</span>
            <span class="text-quaternary-100 text-[14px]">{{ tableDesc }}</span>
          </MdlSection>
          <button
            class="flex flex-row gap-2 text-[16px] font-semibold items-center p-[12px] bg-vermillion-100 text-white rounded-lg shadow-sm shadow-[#0000000d]"
            data-qa="btn-create-course"
            @click="onCreateClick"
          >
            <img
              src="/img/icons/plus-white.svg"
              alt="add"
            >
            {{ addButtonText }}
          </button>
        </MdlSection>

        <MdlSection
          align-items="stretch"
          justify="between"
          gap="4"
          flex-wrap="wrap"
        >
          <div
            class="flex flex-row gap-2 px-[12px] py-[12px] border rounded-lg border-quaternary-200
             flex-1 min-w-[200px]"
          >
            <img
              src="/img/icons/search.svg"
              alt=""
              width="20"
              height="20"
            >
            <input
              v-model="filter.search"
              data-qa="filter-search"
              type="search"
              placeholder="Search by title or user created name"
              class="w-full focus:outline-none"
            >
          </div>
          <div>
            <div class="w-full">
              <DateRangeFilter
                :key="filterDateKey"
                v-model="selectDate"
                data-qa="filter-date"
                form-class="!py-[12px] !px-[16px] border !w-[300px]"
                placeholder="Select date"
                :show="selectDate.show"
                :chevron-size="15"
                @on-toggle="(data) => selectDate.show = data"
                @on-close="onFilterDateSelected"
              />
            </div>
          </div>
          <MiscButton
            data-qa="btn-filter-reset"
            primary-color="#DA4A4A"
            text-color="#DA4A4A"
            text="Reset Filter"
            button-wrapper-class="!min-w-[140px]"
            button-class="!border-[1.5px] !p-[12px] !h-auto !rounded-lg"
            @click-handle="onFilterReset"
          >
            <template #icon>
              <span>
                <VTrash
                  height="20"
                  width="20"
                  color="#DA4A4A"
                />
              </span>
            </template>
          </MiscButton>
        </MdlSection>
      </MdlSection>
    </template>

    <template #body>
      <TableBody
        :pagination="pagination"
        :headers="tableHead"
        :data-list="list"
        :action-detail="onRowDetail"
        :action-delete="onRowDelete"
        :action-edit="onRowEdit"
        with-actions
        is-sort-head
        class="overflow-x-auto tb-data"
        @sort-changed="onTableSort"
      >
        <template #cell(created_at)="{ column }">
          <p
            v-if="column"
          >
            {{ moment(column).format('MM/DD/YYYY') }}
          </p>
        </template>
        <template #cell(updated_at)="{ column }">
          <p
            v-if="column"
          >
            {{ moment(column).format('MM/DD/YYYY') }}
          </p>
        </template>
        <template #cell(created_by)="{ data }">
          <p class="flex justify-between gap-4">
            <span class="inline-block flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ data?.created_by
            }}</span>
          </p>
        </template>
      </TableBody>

      <TableFooter
        v-if="pagination.totalData > 1"
        v-model="pagination"
        class="p-5 overflow-auto"
      />
    </template>
  </MdlContainer>
</template>

<script setup lang="ts">
import { mapGetters } from 'vuex';
import { debounce } from 'lodash-es';
import moment from 'moment';
import { getDocumentList } from '@/modules/document/api/api';
import { BASE_MODULE_URL, DocumentType } from '@/modules/document/config/constants';
import DateRangeFilter from '@/fragments/setting/template/DateRangeFilter.vue';
import TableBody from '@/components/datatable/TableBody.vue';
import TableFooter from '@/components/datatable/TableFooter.vue';
import VTrash from '@/components/icons/VTrash.vue';

export default {
  name: 'ListDocument',
  components: {
    DateRangeFilter,
    TableBody,
    TableFooter,
    VTrash,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(val) {
        return Object.values(DocumentType).includes(val);
      },
    },
    tableTitle: {
      type: String,
      default() {
        return 'Document List';
      },
    },
    tableDesc: {
      type: String,
      default() {
        return 'Create and manage documents';
      },
    },
    addButtonText: {
      type: String,
      default() {
        return 'Add Document';
      },
    },
  },
  data() {
    return {
      filterDateKey: 0,
      tableHead: [
        {
          column: 'title',
          displayName: 'Title',
        },
        {
          column: 'created_by',
          displayName: 'Created by',
        },
        {
          column: 'created_at',
          displayName: 'Created',
        },
        {
          column: 'updated_at',
          displayName: 'Last Update',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPage: 1,
        perPage: 10,
        totalData: 0,
        search: null,
        sortBy: null,
        order_by: '',
      },
      list: [],
      selectDate: {
        sequence: 0,
        startDate: undefined,
        endDate: undefined,
        show: false,
        fetch: false,
      },
      dateIsSelected: false,
      filter: {
        search: '',
        status: undefined,
        startDate: undefined,
        endDate: undefined,
      },
      debouncedFetch: () => null,
    };
  },
  computed: {
    ...mapGetters({
      getPalletes: 'org/getPalletes',
    }),
    moment() {
      return moment;
    },
  },
  watch: {
    filter: {
      handler() {
        this.pagination.currentPage = 1;
        this.debouncedFetch();
      },
      deep: true,
    },
    'pagination.currentPage'() {
      this.debouncedFetch();
    },
    'pagination.perPage'() {
      this.debouncedFetch();
    },
    'pagination.order_by'() {
      this.debouncedFetch();
    },
    'pagination.order_dir'() {
      this.debouncedFetch();
    },
  },
  created() {
    this.debouncedFetch = debounce(this.fetchData, 500);
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const params = {
        page: this.pagination.currentPage,
        page_size: this.pagination.perPage,
        order_by: this.pagination?.order_dir,
        sort_by: this.pagination?.order_by,
        keyword: this.filter?.search,
        start_date: this.filter?.startDate ? moment(this.filter?.startDate).startOf('day').toISOString() : undefined,
        end_date: this.filter?.endDate ? moment(this.filter?.endDate).endOf('day').toISOString() : undefined,
        type_document: this.type,
      };

      getDocumentList({ params })
        .then((response) => {
          if (response.data.success) {
            const { data, pagination } = response.data?.data || {};

            this.list = data;
            this.pagination = {
              ...this.pagination,
              currentPage: pagination.current_page,
              totalPage: pagination.total_pages,
              totalData: pagination.total_data,
            };
          }
        })
        .catch(() => {
          this.$swal({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Failed get courses',
            timer: 3000,
            showConfirmButton: false,
          });
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
@import url('@/assets/css/custom/mdl-combobox.css');

.tb-data {
  position: relative;
}

.tb-data :deep(table) {
  table-layout: fixed !important;
}

.tb-data :deep(td:last-child) {
  white-space: nowrap;
}

.tb-data :deep(th > span > div:not(:empty)) {
  margin-left: 12px;
}

.tb-data :deep(th:nth-child(1)) {
  width: 70px !important;
}

.tb-data :deep(th:nth-child(2)) {
  width: 405px !important;
}

.tb-data :deep(th:nth-child(3)),
.tb-data :deep(th:nth-child(4)),
.tb-data :deep(th:nth-child(5)) {
  width: 128px !important;
}

.tb-data :deep(th:nth-child(6)) {
  width: 156px !important;
}

.tb-data :deep(td:last-child) {
  position: sticky;
  right: 0;
}

.tb-data :deep(td:nth-child(2) > p) {
  @apply !text-ellipsis !whitespace-nowrap !overflow-hidden;
}

.tb-data :deep(th:last-child),
.tb-data :deep(td:last-child) {
  position: sticky;
  right: 0;
}

.tb-data :deep(th:first-child),
.tb-data :deep(td:first-child) {
  position: sticky;
  left: 0;
}

.tb-data :deep(thead th:last-child),
.tb-data :deep(thead td:last-child),
.tb-data :deep(thead th:first-child),
.tb-data :deep(thead td:first-child) {
  @apply bg-spacecadet-100;
}

.tb-data :deep(tbody th:last-child),
.tb-data :deep(tbody td:last-child),
.tb-data :deep(tbody th:first-child),
.tb-data :deep(tbody td:first-child) {
  background: white;
}

.tb-date :deep(table > td) {
  padding: 10px 20px;
}
</style>
