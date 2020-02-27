<template>
  <div
    class="clinet-code"
    :class="_class">
    <div class="slot-wrapper">
      <slot></slot>
    </div>
    <a
      class="toggle-code"
      @click="onToggleClick"></a>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UI from '@soneway/gdui2';
  import packages from '../../../src/components';

  Vue.use(UI);
  Vue.use(packages);

  export default {
    data () {
      return {
        codeExpand: false,
      };
    },
    computed: {
      _class () {
        return {
          expanded: this.codeExpand,
        };
      },
    },

    methods: {
      onToggleClick () {
        this.codeExpand = !this.codeExpand;
      },
    },
  };
</script>

<style lang="less">
  @import "~@soneway/gdui2/dist/css/index.css";
  @import "../../../src/styles/components/index";

  .clinet-code {
    margin: 1rem 0;
    border: 1px solid #eee;
    border-radius: 10px;

    // 插槽容器
    .slot-wrapper {
      padding: 20px;

      & > div:not([class*="language-"]) {
        & > h2 {
          font-size: 18px;
          margin-bottom: 15px;

          &:not(:first-of-type) {
            margin-top: 30px;
          }

          & + p {
            margin-top: -5px;
            margin-bottom: 10px;
          }
        }
      }
    }

    // 代码容器
    div[class*="language-"] {
      &:last-of-type {
        pre[class*="language-"] {
          margin-bottom: 0;
        }
      }
    }

    // 代码块
    pre[class*="language-"] {
      display: none;
    }

    // 展开代码按钮
    .toggle-code {
      display: block;
      text-align: center;
      line-height: 40px;
      border-top: 1px solid #eee;

      &:before {
        content: '展开源码';
      }
    }

    // 展开状态
    &.expanded {
      .toggle-code {
        &:before {
          content: '收起源码';
        }
      }

      pre[class*="language-"] {
        display: block;
      }
    }
  }
</style>
