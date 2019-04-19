export default {
  props: {
    /**
     * Table Attributes具体请查看elementUI官网
     * */
    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    size: String,

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    showHeader: {
      type: Boolean,
      default: true
    },

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    emptyText: String,

    defaultExpandAll: Boolean,

    expandRowKeys: Array,

    defaultSort: Object,

    tooltipEffect: String,

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    lazy: Boolean,

    load: Function
  },
  methods: {
    /**
     * @method sortchange
     * @description 当表格的排序条件发生变化的时候会触发该事件
     * @param column
     * @param prop
     * @param order
     * */
    sortChange({column, prop, order}) {
      this.$emit('sortChange', {
        column, prop, order
      });
    },

    /**
     * @method filterChange
     * @description 当表格的筛选条件发生变化的时候会触发该事件，
     * @description 参数的值是一个对象，对象的 key 是 column 的 columnKey，
     * @description 对应的 value 为用户选择的筛选条件的数组。
     * @param filters
     * */
    filterChange(filters) {
      this.$emit('filterChange', {
        filters
      });
    },
    /**
     * @method select
     * @description 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param selection
     * @param row
     * */
    select(selection, row) {
      this.$emit('select', {
        selection, row
      });
    },
    /**
     * @method selectAll
     * @description 用户手动勾选全选 Checkbox 时触发的事件
     * @param selection
     * */
    selectAll(selection) {
      this.$emit('selectAll', {
        selection
      });
    },
    /**
     * @method selectionChange
     * @description 当选择项发生变化时会触发该事件
     * @param selection
     * */
    selectionChange(selection) {
      this.$emit('selectionChange', {
        selection
      });
    },
    /**
     * @method cellMouseEnter
     * @description 当单元格 hover 进入时会触发该事件
     * @param row
     * @param column
     * @param cell
     * @param event
     * */
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cellMouseEnter', {
        row,
        column,
        cell,
        event,
      });
    },
    /**
     * @method cellMouseLeave
     * @description 当单元格 hover 退出时会触发该事件
     * @param row
     * @param column
     * @param cell
     * @param event
     * */
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cellMouseLeave', {
        row,
        column,
        cell,
        event,
      });
    },
    /**
     * @method cellClick
     * @description 当某个单元格被点击时会触发该事件
     * @param row
     * @param column
     * @param cell
     * @param event
     * */
    cellClick(row, column, cell, event) {
      this.$emit('cellClick', {
        row,
        column,
        cell,
        event,
      });
    },
    /**
     * @method cellDblclick
     * @description 当某个单元格被双击击时会触发该事件
     * @param row
     * @param column
     * @param cell
     * @param event
     * */
    cellDblclick(row, column, cell, event) {
      this.$emit('cellDblclick', {
        row,
        column,
        cell,
        event,
      });
    },
    /**
     * @method rowClick
     * @description 当某一行被点击时会触发该事件
     * @param row
     * @param column
     * @param event
     * */
    rowClick(row, column, event) {
      this.$emit('rowClick', {
        row,
        column,
        event,
      });
    },
    /**
     * @method rowContextmenu
     * @description 当某一行被鼠标右键点击时会触发该事件
     * @param row
     * @param column
     * @param event
     * */
    rowContextmenu(row, column, event) {
      this.$emit('rowContextmenu', {
        row,
        column,
        event,
      });
    },
    /**
     * @method rowDblclick
     * @description 当某一行被双击时会触发该事件
     * @param row
     * @param column
     * @param event
     * */
    rowDblclick(row, column, event) {
      this.$emit('rowDblclick', {
        row,
        column,
        event,
      });
    },
    /**
     * @method headerClick
     * @description 当某一列的表头被点击时会触发该事件
     * @param column
     * @param event
     * */
    headerClick(column, event) {
      this.$emit('headerClick', {
        column,
        event,
      });
    },
    /**
     * @method headerContextmenu
     * @description 当某一列的表头被鼠标右键点击时触发该事件
     * @param column
     * @param event
     * */
    headerContextmenu(column, event) {
      this.$emit('headerContextmenu', {
        column,
        event,
      });
    },

    /**
     * @method currentChange
     * @description 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
     * @param currentRow
     * @param oldCurrentRow
     * */
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('currentChange', {
        currentRow,
        oldCurrentRow,
      });
    },
    /**
     * @method headerDragend
     * @description 当拖动表头改变了列的宽度的时候会触发该事件
     * @param newWidth
     * @param oldWidth
     * @param column
     * @param event
     * */
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('headerDragend', {
        newWidth,
        oldWidth,
        column,
        event
      });
    },
    /**
     * @method expandChange
     * @description 当用户对某一行展开或者关闭的时候会触发该事件
     * @param row
     * @param expandedRows
     * */
    expandChange(row, expandedRows) {
      this.$emit('expandChange', {
        row,
        expandedRows,
      });
    }
  },
};
