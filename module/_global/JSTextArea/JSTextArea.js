"use strict";

class JSTextArea {
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
    this.textAreaId = JString.getUuid(true);
  }

  /**
   * @Override
   */
  _output() {
    let isReadOnly = "";
    if (this.textAreaReadOnly) {
      isReadOnly = "readonly";
    }
    let textAreaStyle = "";
    if (-1 != this.textAreaWidth) {
      textAreaStyle += `width: ${this.textAreaWidth}px; `;
    }
    if (-1 != this.textAreaHeight) {
      textAreaStyle += `height: ${this.textAreaHeight}px; `;
    }
    let code = `
      <textarea ${isReadOnly} style = "${textAreaStyle}" class = "${this.textAreaCustomClass}" placeholder = "${this.textAreaPlaceHolder}">${this.textAreaText}</textarea>
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
   * @param textAreaText 文本框的类型
   *        text 文本框
   *        password 密码框
   * @param textAreaWidth 文本框的宽度
   *        -1 宽度默认
   * @param textAreaHeight 文本框的高度
   *        -1 高度默认
   * @param textAreaPlaceHolder 文本框的内容提示
   * @param textAreaText 文本框的文本
   * @param textAreaCustomClass 文本框自定义Class
   * @param textAreaReadOnly 文本框是否只读
   *        true 只读
   *        false 非只读
   */
  setTextAreaConfig(textAreaWidth, textAreaHeight, textAreaPlaceHolder, textAreaText, textAreaCustomClass, textAreaReadOnly = false) {
    this.textAreaWidth = textAreaWidth;
    this.textAreaHeight = textAreaHeight;
    this.textAreaPlaceHolder = textAreaPlaceHolder;
    this.textAreaText = textAreaText;
    this.textAreaCustomClass = textAreaCustomClass;
    this.textAreaReadOnly = textAreaReadOnly;
  }
}
