import NewTable from './src/index.vue';

NewTable.install = (Vue) => {
  Vue.component(NewTable.name, NewTable);
};

export default NewTable;
