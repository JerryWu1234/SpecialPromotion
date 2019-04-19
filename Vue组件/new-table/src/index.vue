<template>
  <div class="newtable-warp">
    <el-table
      ref="refName"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @select = "select"
      @select-all = "selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click = "cellClick"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      @current-change="currentChange"
      @header-dragend="headerDragend"
      @expand-change="expandChange">
      <template v-for="(column, index) in attributeList">
        <slot
          v-if="column.slot"
          :name="column.slot">
        </slot>
        <component
          v-else-if="column.component"
          :item-data="column"
          :key="index"
          :is="column.component"
        ></component>
        <el-table-column
          v-else
          :type="column.type || 'default' "
          :minWidth="column.minWidth || column.width || 140"
          :column-key="column.columnKey"
          :prop="column.prop"
          :label="column.label"
          :width="column.minWidth ? '-' : (column.width || 140)"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable"
          :sort-by="column.sortBy"
          :sort-method="column.method"
          :resizable="column.resizable"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip"
          :align="column.align"
          :header-align="column.headerAlign || column.align"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue"
          :key="index">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import Mixin from '../Mixin';

export default {
  name: 'NewTable',
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
  },
  // Table Events
  mixins: [Mixin],
  props: {
    // 必传
    tableData: {
      default() {
        return [];
      },
      type: Array,
      required: true,
    },
    // 必穿
    attributeList: {
      default() {
        return [];
      },
      type: Array,
      required: true,
    }
  },

};
</script>

<style lang="less">
.newtable-warp{

}
</style>
