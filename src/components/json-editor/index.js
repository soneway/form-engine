import JsonEditor from './json-editor';

JsonEditor.install = function (Vue) {
  Vue.component(JsonEditor.name, JsonEditor);
};

export default JsonEditor;
