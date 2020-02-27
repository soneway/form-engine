import FormEditor from './form-editor';
import FormEditorDraggable from './form-editor-draggable';
import FormEditorItem from './form-editor-item';
import FormSchemer from './form-schemer';
import JsonEditor from './json-editor';

const components = {
  FormEditor,
  FormEditorDraggable,
  FormEditorItem,
  FormSchemer,
  JsonEditor,
};

function install (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
}

// install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};
