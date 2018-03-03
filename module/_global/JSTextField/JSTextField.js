"use strict";

class JSTextField {
  /**
   * @Override
   */
  _setOutputId(outputId) {
    this.outputId = outputId;
  }

  /**
   * @Override
   */
  _init() {
    this.textFieldId = JString.getUuid(true);
  }

  /**
   * @Override
   */
  _output() {
    let isReadOnly = "";
    if (this.textFieldReadOnly) {
      isReadOnly = "readonly";
    }
    let textFieldStyle = "";
    if (-1 != this.textFieldWidth) {
      textFieldStyle += `width: ${this.textFieldWidth}px; `;
    }
    if (-1 != this.textFieldHeight) {
      textFieldStyle += `height: ${this.textFieldHeight}px; `;
    }
    let code = `
      <input ${isReadOnly} type = "${this.textFieldType}" style = "${textFieldStyle}" class = "${this.textFieldCustomClass}" placeholder = "${this.textFieldPlaceHolder}"  value = "${this.textFieldText}" />
    `;
    $(this.outputId).html(code);
  }

  /**
   * @Override
   */
  _eventBind() {
  }

  /**
   * 配置文本框
   * @param textFieldType 文本框的类型
   *        text 文本框
   *        password 密码框
   * @param textFieldWidth 文本框的宽度
   *        -1 宽度默认
   * @param textFieldHeight 文本框的高度
   *        -1 高度默认
   * @param textFieldPlaceHolder 文本框的内容提示
   * @param textFieldText 文本框的文本
   * @param textFieldCustomClass 文本框自定义Class
   * @param textFieldReadOnly 文本框是否只读
   *        true 只读
   *        false 非只读
   */
  setTextFieldConfig(textFieldType, textFieldWidth, textFieldHeight, textFieldPlaceHolder, textFieldText, textFieldCustomClass, textFieldReadOnly = false) {
    this.textFieldType = textFieldType;
    this.textFieldWidth = textFieldWidth;
    this.textFieldHeight = textFieldHeight;
    this.textFieldPlaceHolder = textFieldPlaceHolder;
    this.textFieldText = textFieldText;
    this.textFieldCustomClass = textFieldCustomClass;
    this.textFieldReadOnly = textFieldReadOnly;
  }
}
