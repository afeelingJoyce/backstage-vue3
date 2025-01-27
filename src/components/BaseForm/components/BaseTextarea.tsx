/*
 * @Author: 陈宇环
 * @Date: 2022-12-20 14:37:53
 * @LastEditTime: 2023-06-14 11:04:12
 * @LastEditors: 陈宇环
 * @Description:
 */
import { defineComponent, PropType } from 'vue'
import styles from '@/components/BaseForm/style.module.scss'
import { textareaProps } from '../interface/index'
import { CustomDynamicComponent } from '@/components/CustomDynamicComponent'

export default defineComponent({
  name: 'BsTextarea',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    config: {
      type: Object as PropType<textareaProps>,
      default() {
        return {}
      },
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props: any, { emit }) {
    const { dynamicTextarea } = new CustomDynamicComponent()
    function updateValue(value: number | string | InputEvent) {
      let cloneValue = value
      
      // ant-Design-vue 无input事件，value获取到的是原生input事件的e
      if (window.uiLanguage === CustomDynamicComponent.antLanguage) {
        cloneValue = ((value as InputEvent).target as HTMLInputElement).value
      }

      emit('update:modelValue', cloneValue)
      emit('change', {
        props: props.config.prop,
        value: cloneValue,
      })
    }
    return () => {
      return <div class={['baseTextarea', styles.width100]}>
        <dynamicTextarea
          class="textarea"
          type='textarea'
          model-value={props.modelValue}
          placeholder={props.config.placeholder || `请输入${props.config.label}`}
          disabled={!!props.config.disabled}
          

          /** ant-design-vue && ele 统一封装 - start */
          clearable={props.config.clearable !== false}  // ele 特有属性 - 清除按钮
          allowClear={props.config.allowClear ?? props.config.clearable !== false} // ant-design-vue特有属性
          rows={props.config.rows || 3}  // ele 特有属性 - 默认area行数
          autoSize={props.config.autoSize || { minRows: 3, maxRows: 3 }}  // ant-design-vue特有属性 - 默认area行数
          /** ant-design-vue && ele 统一封装 - end */

          {...props.config.nativeProps}
          onInput={updateValue}
        />
      </div>
    }
  },
})