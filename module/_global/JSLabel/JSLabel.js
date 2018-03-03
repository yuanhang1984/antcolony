"use strict";

class JSLabel {
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
    this.labelId = JString.getUuid(true);
  }

  /**
   * @Override
   */
  _output() {
    let code = `
      <span class = "${this.labelCustomClass}" id = "${this.labelId}">${this.labelText}</span>
    `;
    $(this.outputId).html(code);
  }

  /**
   * @Override
   */
  _eventBind() {
  }

  /**
   * 配置标签
   * @param labelText 标签的文本
   * @param labelCustomClass 标签自定义Class
   */
  setLabelConfig(labelText, labelCustomClass = "") {
    this.labelText = labelText;
    this.labelCustomClass = labelCustomClass;
  }
}
