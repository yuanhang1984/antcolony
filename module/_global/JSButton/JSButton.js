"use strict";

class JSButton {
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
    this.buttonId = JString.getUuid(true);
  }

  /**
   * @Override
   */
  _output() {
    let btnStyle = "";
    if (-1 != this.buttonWidth) {
      btnStyle += `width: ${this.buttonWidth}px; `;
    }
    if (-1 != this.buttonHeight) {
      btnStyle += `height: ${this.buttonHeight}px; `;
    }
    let btnType = "btn-default";
    if (1 == this.buttonType) {
      btnType = "btn-default";
    } else if (2 == this.buttonType) {
      btnType = "btn-primary";
    } else if (3 == this.buttonType) {
      btnType = "btn-success";
    } else if (4 == this.buttonType) {
      btnType = "btn-info";
    } else if (5 == this.buttonType) {
      btnType = "btn-warning";
    } else if (6 == this.buttonType) {
      btnType = "btn-danger";
    } else if (7 == this.buttonType) {
      btnType = "btn-link";
    }
    let code = `
      <button style = "${btnStyle}" type = "button" class = "btn ${btnType}" id = "${this.buttonId}">${this.buttonText}</button>
    `;
    $(this.outputId).html(code);
  }

  /**
   * @Override
   */
  _eventBind() {
    let currentObject = this;
    $(`#${this.buttonId}`).click(function() {
      currentObject.buttonClickFunc(currentObject.buttonClickFuncParam);
    });
  }

  /**
   * 配置按钮
   * @param buttonWidth 按钮的宽度
   *        -1 宽度根据按钮文本决定
   * @param buttonHeight 按钮的高度
   *        -1 高度根据按钮文本决定
   * @param buttonType 按钮的类型
   *        1 default样式
   *        2 primary样式
   *        3 success样式
   *        4 info样式
   *        5 warning样式
   *        6 danger样式
   *        7 link样式
   * @param buttonText 按钮的文本
   * @param buttonClickFunc 按钮点击事件的方法
   * @param buttonClickFuncParam 按钮点击事件方法的参数
   */
  setButtonConfig(buttonWidth, buttonHeight, buttonType, buttonText, buttonClickFunc, buttonClickFuncParam) {
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonType = buttonType;
    this.buttonText = buttonText;
    this.buttonClickFunc = buttonClickFunc;
    this.buttonClickFuncParam = buttonClickFuncParam;
  }
}
