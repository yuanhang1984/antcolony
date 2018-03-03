"use strict";

class AlertDialog {
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
  }

  /**
   * @Override
   */
  _output() {
    let alertType = "alert-success";
    if (1 == this.dialogType) {
      alertType = "alert-success";
    } else if (2 == this.dialogType) {
      alertType = "alert-info";
    } else if (3 == this.dialogType) {
      alertType = "alert-warning";
    } else if (4 == this.dialogType) {
      alertType = "alert-danger";
    }
    let closeBtnCode = `
      <button type = "button" class = "close" data-dismiss = "alert" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
    `;
    if (!this.hasCloseBtn) {
      closeBtnCode = "";
    }
    let code = `
      <div style = "width: ${this.dialogWidth}px;" class = "alert ${alertType}">${this.dialogContent}${closeBtnCode}</div>
    `;
    $(this.outputId).html(code);
    let currentObject = this;
    if (-1 != this.delayCloseTime) {
      setTimeout(function() {
        $(currentObject.outputId).html("");
      }, currentObject.delayCloseTime);
    }
  }

  /**
   * @Override
   */
  _eventBind() {
  }

  /**
   * 配置对话框内容
   * @param dialogWidth 对话框宽度
   * @param dialogType 对话框类型
   *        1 success样式
   *        2 info样式
   *        3 warning样式
   *        4 danger样式
   * @param dialogContent 内容
   * @param hasCloseBtn 是否有关闭按钮
   *        true 有关闭按钮
   *        false 没有关闭按钮
   * @param delayCloseTime 延迟关闭时间（毫秒）
   *        -1 不设置延迟关闭
   */
  setDialogConfig(dialogWidth, dialogType, dialogContent, hasCloseBtn, delayCloseTime) {
    this.dialogWidth = dialogWidth;
    this.dialogType = dialogType;
    this.dialogContent = dialogContent;
    this.hasCloseBtn = hasCloseBtn;
    this.delayCloseTime = delayCloseTime;
  }
}
