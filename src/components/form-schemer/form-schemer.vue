<template>
  <div :class="_class">
    <gd-tabs v-model="tabIndex">

      <gd-tabs-pane label="可视化">
        <div :class="_visualClass">

          <!--数据类型-->
          <VueDraggable
            :class="_typeClass"
            :group="typeGroup"
            :value="types"
            :sort="false"
            :clone="cloneField">
            <a
              v-for="type in types"
              :key="type"
              :class="`form-icon-${type} type-item`"
              :data-type="type"
              @click="onTypeClick">{{ typeMap[type] }}
            </a>
          </VueDraggable>
          <!--数据类型 end-->

          <!--工作区-->
          <div :class="_workClass">

            <!--预览区-->
            <div :class="_previewClass">

              <!--编辑器-->
              <FormEditorDraggable
                ref="formEditor"
                :pca-json="pcaJson"
                :active-key="fieldName"
                @fieldsort="onFieldSort"
                @fieldadd="addField"
                @itemclick="onItemClick"
                :schema="curValue">
                <div
                  :class="_toolsClass"
                  slot="item"
                  slot-scope="slotProps">
                  <gd-confirm-poptip
                    placement="left"
                    @confirm="onFieldDelete(slotProps)">
                    <gd-icon
                      icon="delete"
                      class="field-delete-icon"
                      title="删除">
                    </gd-icon>
                  </gd-confirm-poptip>
                </div>
              </FormEditorDraggable>
              <template v-if="Object.keys(curValue).length">
                <gd-button @click="onValidateClick">模拟校验</gd-button>
              </template>
              <!--编辑器 end-->

            </div>
            <!--预览区 end-->

            <!--配置区-->
            <div :class="_configClass">
              <FieldConfig
                v-if="!pending && fieldConfig"
                :config="fieldConfig"
                :field-name="fieldName">
              </FieldConfig>
            </div>
            <!--配置区 end-->

          </div>
          <!--工作区 end-->
        </div>
      </gd-tabs-pane>

      <gd-tabs-pane label="代码">
        <JsonEditor
          v-model="code">
        </JsonEditor>
      </gd-tabs-pane>

    </gd-tabs>

  </div>
</template>

<script>
  import types from '../form-editor-item/types';
  import { parseJSON } from 'utils-lib/dist/json';
  import typeMap from './type-map';
  import FormEditorDraggable from '../form-editor-draggable';
  import FieldConfig from './field-config';
  import JsonEditor from '../json-editor';
  import VueDraggable from 'vuedraggable';

  const name = 'form-schemer';
  const indent = '\t';

  export default {
    name,
    components: {
      FormEditorDraggable,
      FieldConfig,
      JsonEditor,
      VueDraggable,
    },
    props: {
      value: Object,
      pcaJson: Object,
    },
    data () {
      const curValue = this.value || {};
      return {
        curValue,
        keyIndex: 1,
        types,
        typeMap,
        fieldName: '',
        pending: false,
        // 代码
        code: JSON.stringify(curValue, null, indent),
        tabIndex: 0,
        typeGroup: { name: 'form', pull: 'clone', put: 'false' },
      };
    },
    computed: {
      _class () {
        return [
          name,
        ];
      },
      _visualClass () {
        return [
          `${name}-visual`,
        ];
      },
      _workClass () {
        return [
          `${name}-work`,
        ];
      },
      _previewClass () {
        return [
          `${name}-preview`,
        ];
      },
      _configClass () {
        return [
          `${name}-config`,
        ];
      },
      _typeClass () {
        return [
          `${name}-type`,
        ];
      },
      _toolsClass () {
        return [
          `${name}-tools`,
        ];
      },
      fieldConfig () {
        return this.curValue[this.fieldName];
      },
    },
    watch: {
      value (value) {
        if (!value) return;
        this.curValue = value;
      },
      curValue (value) {
        // 双向绑定
        this.$emit('input', value);
      },

      // 切换可视化/代码
      tabIndex (value) {
        // 切换到代码
        if (value === 1) {
          // 设置代码
          this.code = JSON.stringify(this.curValue, null, indent);
        }
      },

      // 代码修改
      code (value) {
        this.curValue = parseJSON(value);
      },

      fieldConfig () {
        // v-if切换, 强制刷新field-config组件
        this.pending = true;
        this.$nextTick(() => {
          this.pending = false;
        });
      },
    },

    methods: {
      // 数据类型点击
      onTypeClick ({ currentTarget }) {
        const { type } = currentTarget.dataset;
        this.addField(type);
      },

      // 添加字段
      addField (type, keyName) {
        keyName = keyName || this.getKeyName(type);
        // 给一个初始值
        const initValue = {
          [keyName]: { type, rules: [] },
        };

        // 对象或数组
        if (['array', 'object'].includes(type)) {
          // 在这里设置fields, 后续修改fields时, 界面响应才无bug
          initValue[keyName].fields = {};
        }

        this.curValue = {
          ...this.curValue,
          ...initValue,
        };

        this.onFieldConfig({ keyName });
      },

      // 生成字段的key
      getKeyName (type) {
        let index = this.keyIndex;
        const { curValue } = this;
        while (curValue[`${type}${index}`]) {
          index = ++this.keyIndex;
        }
        return `${type}${index}`;
      },

      // 删除
      onFieldDelete ({ keyName }) {
        // 删除
        delete this.curValue[keyName];
        this.curValue = {
          ...this.curValue,
        };
      },

      // 配置
      onFieldConfig ({ keyName }) {
        this.fieldName = keyName;
      },

      // 对象属性排序
      onFieldSort (keys) {
        const sorted = {};
        keys.forEach(obj => {
          sorted[obj.keyName] = this.curValue[obj.keyName];
        });
        this.curValue = sorted;
      },

      // 表单项点击
      onItemClick (param) {
        this.onFieldConfig(param);
      },

      // VueDraggable 组件处理
      cloneField (type) {
        const keyName = this.getKeyName(type);
        return { type, keyName };
      },

      // 校验
      onValidateClick () {
        this.$refs.formEditor.validate((data) => {
          this.$toast.success('校验成功');
          console.log('校验成功', data);
        }, (data) => {
          this.$toast.error('校验失败');
          console.log('校验失败', data);
        });
      },
    },
  };
</script>
