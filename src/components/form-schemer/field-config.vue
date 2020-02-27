<template>
  <div :class="_class">
    <h3>{{ title }} - 配置</h3>
    <FormEditor
      :class="_formClass"
      :schema="configSchema"
      :value="config">
    </FormEditor>

    <template v-if="isRulesEnable">

      <h3>常用校验规则</h3>
      <gd-check-list
        item-type="checkbox"
        multiple
        :value="checkedCommonRuleKeys"
        @change="onCommonRuleChange">
        <gd-check-item
          v-for="(item, key) in regexes"
          :key="key"
          :label="item.name"
          :value="key">
        </gd-check-item>
      </gd-check-list>

      <h3>校验规则</h3>

      <div class="rule-item">
        <gd-checkbox
          v-model="required.required">必填
        </gd-checkbox>
        <gd-input
          :disabled="!required.required"
          v-model="required.message"
          placeholder="请输入校验出错提示信息">
        </gd-input>
      </div>

      <div class="rule-item">
        <gd-checkbox
          :disabled="!patternEnable"
          readonly
          :value="patternEnable">正则
        </gd-checkbox>
        <gd-input
          v-model="pattern.pattern"
          placeholder="请输入正则, 如: ^[0-9]*$">
        </gd-input>
        <gd-input
          :disabled="!patternEnable"
          v-model="pattern.message"
          placeholder="请输入校验出错提示信息">
        </gd-input>
      </div>

      <div class="rule-item">
        <gd-checkbox
          :disabled="!minEnable"
          readonly
          :value="minEnable">最小
        </gd-checkbox>
        <gd-input
          type="number"
          v-model="min.min"
          placeholder="请输入最小值">
        </gd-input>
        <gd-input
          :disabled="!minEnable"
          v-model="min.message"
          placeholder="请输入校验出错提示信息">
        </gd-input>
      </div>

      <div class="rule-item">
        <gd-checkbox
          :disabled="!maxEnable"
          readonly
          :value="maxEnable">最大
        </gd-checkbox>
        <gd-input
          type="number"
          v-model="max.max"
          placeholder="请输入最大值">
        </gd-input>
        <gd-input
          :disabled="!maxEnable"
          v-model="max.message"
          placeholder="请输入校验出错提示信息">
        </gd-input>
      </div>

      <div class="rule-item">
        <gd-checkbox
          :disabled="!lenEnable"
          readonly
          :value="lenEnable">长度
        </gd-checkbox>
        <gd-input
          type="number"
          v-model="len.len"
          placeholder="请输入长度">
        </gd-input>
        <gd-input
          :disabled="!lenEnable"
          v-model="len.message"
          placeholder="请输入校验出错提示信息">
        </gd-input>
      </div>
    </template>

    <template v-if="isFieldsCodeEnable">
      <h3>对象/数组代码</h3>
      <div class="form-schemer-code">
        <JsonEditor
          v-model="code">
        </JsonEditor>
      </div>
    </template>
  </div>
</template>

<script>
  import { parseJSON } from 'utils-lib/dist/json';
  import regexes from './regexes';

  import FormEditor from '../form-editor';
  import ruleTypeMap from './rule-type-map';
  import JsonEditor from '../json-editor';

  const name = 'field-config';
  const indent = '\t';

  export default {
    name,
    components: {
      FormEditor,
      JsonEditor,
    },
    props: {
      config: Object,
      fieldName: String,
    },
    data () {
      // 必填
      const required = this.getRule('required');
      // 正则
      const pattern = this.getRule('pattern');
      // 最大
      const max = this.getRule('max');
      // 最小
      const min = this.getRule('min');
      // 长度
      const len = this.getRule('len');
      // fields代码
      const code = JSON.stringify(this.config.fields, null, indent);

      return { required, pattern, max, min, len, code, regexes };
    },
    computed: {
      _class () {
        return [
          name,
        ];
      },
      _formClass () {
        return [
          `${name}-form`,
        ];
      },

      title () {
        return this.config.label || this.fieldName;
      },

      // 默认值可用
      isDefaultEnable () {
        return !this.typeInArray(['label']);
      },

      // 占位符可用
      isPlaceholderEnable () {
        return !this.typeInArray(['object', 'array', 'checkbox', 'radio', 'boolean', 'region', 'label']);
      },

      // 选项可用
      isOptionsEnable () {
        return this.typeInArray(['radio', 'checkbox', 'select']);
      },

      isDatepicker () {
        return this.typeInArray(['date', 'year', 'month', 'datetime', 'time']);
      },

      // 输入的最大长度可用
      isMaxlengthEnable () {
        return this.typeInArray(['textarea', 'text']);
      },

      // 校验规则可用
      isRulesEnable () {
        return !this.typeInArray(['object', 'array', 'label']);
      },

      // 代码配置fields可用
      isFieldsCodeEnable () {
        return this.typeInArray(['object', 'array']);
      },

      // 配置字段的表格数据描述
      configSchema () {
        const schema = {
          label: {
            label: '标签名称',
          },
          labelAlign: {
            type: 'radio',
            label: '标签对齐',
            options: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' },
            ],
          },
          span: {
            type: 'radio',
            label: '显示宽度',
            options: [
              { label: '100%', value: 12 },
              { label: '3/4', value: 9 },
              { label: '2/3', value: 8 },
              { label: '1/2', value: 6 },
              { label: '1/3', value: 4 },
              { label: '1/4', value: 3 },
            ],
          },
        };

        // 默认值可用
        if (this.isDefaultEnable) {
          schema.default = {
            type: 'text',
            label: '默认值',
          };
        }

        // 占位符可用
        if (this.isPlaceholderEnable) {
          schema.placeholder = {
            type: 'text',
            label: '占位符',
          };
        }

        // 需要选项
        if (this.isOptionsEnable) {
          schema.options = {
            type: 'array',
            label: '选项列表',
            fields: {
              value: {
                type: 'text',
                label: '选项值',
                rules: [
                  { type: 'string', required: true },
                ],
              },
              label: {
                type: 'text',
                label: '选项名称',
              },
            },
          };
        }

        if (this.isDatepicker) {
          schema.range = {
            type: 'boolean',
            label: '是否选择范围',
          };
        }

        // 需要输入的最大长度
        if (this.isMaxlengthEnable) {
          schema.maxlength = {
            type: 'number',
            label: '最大长度',
            rules: [
              { type: 'number', min: 1, message: '最大长度应为正整数' },
            ],
          };
        }

        return schema;
      },

      // 规则可用
      patternEnable () {
        return !!this.pattern.pattern;
      },
      maxEnable () {
        return !!this.max.max;
      },
      minEnable () {
        return !!this.min.min;
      },
      lenEnable () {
        return !!this.len.len;
      },

      // 选中常用检验规则
      checkedCommonRuleKeys () {
        const { rules = [] } = this.config;
        return rules.filter((item) => item._key).map((item) => item._key);
      },
    },

    watch: {
      required: {
        deep: true,
        handler (value) {
          this.onChange('required', value.required);
        },
      },
      pattern: {
        deep: true,
        handler (value) {
          this.onChange('pattern', value.pattern);
        },
      },
      max: {
        deep: true,
        handler (value) {
          this.onChange('max', value.max);
        },
      },
      min: {
        deep: true,
        handler (value) {
          this.onChange('min', value.min);
        },
      },
      len: {
        deep: true,
        handler (value) {
          this.onChange('len', value.len);
        },
      },
      code (value) {
        this.config.fields = parseJSON(value);
      },

      'value.range': {
        handler (value) {
          // 日期特殊处理
          if (this.isDatepicker) {
            const { rules = [] } = this.config;
            rules.forEach((rule) => {
              rule.type = value ? 'array' : this.getRuleType();
            });
          }
        },
      },
    },

    methods: {
      typeInArray (types) {
        return types.includes(this.config.type);
      },

      getRuleType () {
        return ruleTypeMap[this.config.type] || 'string';
      },
      getNoKeyRules () {
        const { rules = [] } = this.config;
        return rules.filter((item) => !item._key);
      },
      getRule (key) {
        const defaults = { type: this.getRuleType() };
        return this.getNoKeyRules()
          .find((item) => item[key] !== undefined) || defaults;
      },

      // 校验规则设置
      onChange (key, value) {
        const { rules = [] } = this.config;
        const index = rules
          .findIndex((item) => !item._key && item[key] !== undefined);
        // 有值
        if (value) {
          // 没有这一项
          if (index === -1) {
            const rule = this[key];
            // 日期特殊处理
            if (this.isDatepicker) {
              rule.type = this.config.range ? 'array' : this.getRuleType();
            }
            rules.push(rule);
          }
        }
        // 去掉
        else {
          rules.splice(index, 1);
        }
      },

      // 常用校验规则选择
      onCommonRuleChange (value) {
        const noKeyRules = this.getNoKeyRules();
        const checkedRules = value.map((item) => {
          const regexItem = regexes[item];
          return {
            _key: item,
            type: this.getRuleType(),
            pattern: regexItem.regex,
            message: `${regexItem.name}格式不正确`,
          };
        });
        this.config.rules = noKeyRules.concat(checkedRules);
      },

    },
  };
</script>
