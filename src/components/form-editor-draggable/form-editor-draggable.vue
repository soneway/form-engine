<template>
  <gd-form
    ref="form"
    :class="_class"
    :model="value"
    :size="size"
    :label-width="labelWidth"
    :label-align="labelAlign"
    :gutter="gutter"
    :colcount="colcount">
    <VueDraggable
      :class="_draggableClass"
      group="form"
      v-model="keys"
      @change="onFieldSort">
      <FormEditorItem
        v-for="(item, key) in schema"
        :pca-json="item.pcaJson || pcaJson"
        :schema="item"
        :class="getItemClass(key)"
        @click.native="onItemClick({keyName: key})"
        :value="value"
        :key="key"
        :key-name="key">
        <slot
          name="item"
          :key-name="key"
          :schema="item">
        </slot>
      </FormEditorItem>
    </VueDraggable>
  </gd-form>
</template>

<script>
  import { deepCopy } from 'utils-lib/dist/object';
  import FormEditorItem from '../form-editor-item';
  import VueDraggable from 'vuedraggable';
  import $bus from '../../scripts/utils/bus';

  const name = 'form-editor';

  export default {
    name: 'form-editor-draggable',
    components: {
      FormEditorItem,
      VueDraggable,
    },
    provide () {
      return {
        formEditor: this,
      };
    },
    props: {
      schema: {
        type: Object,
        default () {
          return {};
        },
      },
      value: {
        type: Object,
        default () {
          return {};
        },
      },
      size: String,
      activeKey: String,
      disabled: Boolean,
      readonly: Boolean,
      colcount: Number,
      pcaJson: {
        type: Object,
        default () {
          return {};
        },
      },
      labelWidth: String,
      labelAlign: String,
      gutter: Number,
    },
    data () {
      return {
        keys: this.getKeysBySchema(),
      };
    },
    computed: {
      _class () {
        return [
          name,
          {
            [`${name}-${this.size}`]: this.size,
          },
        ];
      },
      _draggableClass () {
        return [
          `${name}-draggable`,
        ];
      },
    },
    watch: {
      schema () {
        this.keys = this.getKeysBySchema();
      },

      value: {
        handler (value) {
          $bus.$emit('formEditor.value.change', value);
        },
        deep: true,
      },
    },

    methods: {
      getKeysBySchema () {
        const { schema } = this;
        return Object.keys(schema)
          .map((key) => ({
            keyName: key,
            type: schema[key].type,
          }));
      },

      // 校验数据
      validate (resolveCb, rejectCb) {
        return new Promise((resolve) => {
          this.$refs.form.validate((valid, errors) => {
            const data = deepCopy(this.value);
            if (valid) {
              typeof resolveCb === 'function' && resolveCb(data, errors);
            }
            else {
              typeof rejectCb === 'function' && rejectCb(data, errors);
            }
            resolve(valid);
          });
        });
      },

      // 排序
      onFieldSort ({ added }) {
        if (added) {
          const { element: { type, keyName } } = added;
          this.$emit('fieldadd', type, keyName);
        }

        this.$emit('fieldsort', this.keys);
      },

      // 获取item类名
      getItemClass (key) {
        return {
          active: key === this.activeKey,
        };
      },

      // 项点击
      onItemClick (param) {
        this.$emit('itemclick', param);
      },
    },
  };
</script>
