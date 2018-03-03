"use strict";

class DangerConfirmDialog {
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
    let code = `
      <div class = "modal fade" id = "${this.dialogId}" tabindex = "-1">
        <div style = "width: ${this.dialogWidth}px" class = "DangerConfirmDialog_Dialog">
          <div class = "DangerConfirmDialog_Title">${this.dialogTitle}<button type = "button" class = "close" data-dismiss = "modal">&times;</button></div>
          <div class = "DangerConfirmDialog_Content">
            <div class = "DangerConfirmDialog_Text">${this.dialogContent}</div>
            <div class = "DangerConfirmDialog_Button"><button type = "button" class = "btn">${this.confirmBtnText}</button><button type = "button" class = "btn" data-dismiss = "modal">${this.cancelBtnText}</button></div>
          </div>
        </div>
      </div>
    `;
    $(this.outputId).html(code);
  }

  /**
   * @Override
   */
  _eventBind() {
    let currentObject = this;
    $(".DangerConfirmDialog_Button").find("button:first-child").click(function() {
      currentObject.confirmBtnFunc(currentObject.confirmBtnFuncParam);
    });
  }

  /**
   * 配置对话框内容
   * @param dialogId 对话框Id
   * @param dialogWidth 对话框宽度
   * @param dialogTitle 标题
   * @param dialogContent 显示内容
   * @param confirmBtnText 确认按钮文本
   * @param cancelBtnText 取消按钮文本
   * @param confirmBtnFunc 确认按钮事件方法
   * @param confirmBtnFuncParam 确认按钮事件方法所需参数
   */
  setDialogConfig(dialogId, dialogWidth, dialogTitle, dialogContent, confirmBtnText, cancelBtnText, confirmBtnFunc, confirmBtnFuncParam) {
    this.dialogId = dialogId;
    this.dialogWidth = dialogWidth;
    this.dialogTitle = dialogTitle;
    this.dialogContent = dialogContent;
    this.confirmBtnText = confirmBtnText;
    this.cancelBtnText = cancelBtnText;
    this.confirmBtnFunc = confirmBtnFunc;
    this.confirmBtnFuncParam = confirmBtnFuncParam;
  }
}
