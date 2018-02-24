"use strict";

class Control {
  /**
   * 生成bootstrap确认对话框
   * @param outputId 输出id,默认为body.
   * @param title 对话框标题
   * @param message 对话框消息
   * @param cancelBtnText 取消按钮文本
   * @param confirmBtnText 确认按钮文本
   * @param confirmBtnEvent 确认按钮事件
   */
  static generateBootstrapConfimDialog(outputId = "body", title, message, cancelBtnText = "Cancel", confirmBtnText = "OK", confirmBtnEvent) {
    let confirmBtnId = "_" + Toolkit.getUuid(true);
    let dialogLogoutConfirmId = "_" + Toolkit.getUuid(true);
    let btnCode = "";
    if (null == confirmBtnText) {
      btnCode = `<button type = "button" class = "btn btn-default" data-dismiss = "modal">${cancelBtnText}</button>`;
    } else {
      btnCode = 
        `<button type = "button" class = "btn btn-danger" id = "${confirmBtnId}">${confirmBtnText}</button>
        <button type = "button" class = "btn btn-default" data-dismiss = "modal">${cancelBtnText}</button>`;
    }
    let code =
      `<div class = "modal fade custom_modal" id = "${dialogLogoutConfirmId}" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "false">
        <div class = "modal-dialog modal-sm">
          <div class = "modal-content">
            <div class = "modal-header bg-primary">
              <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
              <h4 class = "modal-title">${title}</h4>
            </div>
            <div class = "modal-body nopadding-bottom text-center">
              <h4>${message}</h4>
            </div>
            <div class = "modal-footer text-center">${btnCode}</div>
          </div>
        </div>
      </div>`;
    $(outputId).append(code);
    // 绑定确认按钮的事件
    $(document).on("click", `#${confirmBtnId}`, confirmBtnEvent);
    $(`#${dialogLogoutConfirmId}`).modal("show");
    $(`#${dialogLogoutConfirmId}`).on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  }
  
  /**
   * 生成bootstrap分页控件
   * @param outputId 输出id
   * @param offset 当前显示数据的偏移
   * @param limit 显示的条目数
   * @param pageCount 页签数量(不包括"向左"和"向右")
   * @param totalCount 总页数
   */
  static generateBootstrapPagination(outputId, offset, limit, pageCount, totalCount) {
    if (offset > totalCount) {
      return;
    }
    let currentPage = 0;
    let code = null;
    code += '<nav class = "pull-right">';
    code += '<ul class = "pagination">';
    if (0 >= offset) {
      currentPage = 1;
    } else {
      currentPage = Math.ceil(offset / limit) + 1;
    }
    let count = Math.ceil(totalCount / limit);
    let displaySceneCount = Math.ceil(count / pageCount);
    let currentPageSceneNum = Math.ceil(currentPage / pageCount);
    if (currentPageSceneNum > 1) {
      code += '<li data-offset = "' + (((currentPageSceneNum - 1) * pageCount * limit) - limit) + '"><a><span>«</span></a></li>';
    }
    for (let i = ((currentPageSceneNum * pageCount) - pageCount + 1); i <= (currentPageSceneNum * pageCount); i++) {
      if (i > count) {
        break;
      }
      if (i == (currentPage)) {
        code += '<li data-offset = "' + (i * limit - limit) + '" class = "active"><a>' + i + '</a></li>';
      } else {
        code += '<li data-offset = "' + (i * limit - limit) + '"><a>' + i + '</a></li>';
      }
    }
    if ((displaySceneCount - currentPageSceneNum) >= 1) {
      code += '<li data-offset = "' + ((currentPageSceneNum * pageCount * limit)) + '"><a><span>»</span></a></li>';
    }
    code += '</ul>';
    code += '</nav>';
    $(outputId).html(code);
  }
}
