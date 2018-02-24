"use strict";

class Header {
  /**
   * 构造函数
   *
   * @param headerOutputId 传入header输出的元素id
   * @param dialogOutputId 传入对话框输出的元素id
   * @param redirect 登出成功后的跳转地址
   */
  constructor(headerOutputId, dialogOutputId, redirect) {
    this.headerOutputId = headerOutputId;
    this.dialogOutputId = dialogOutputId;
    this.redirect = redirect;
    // 列表-修改密码的id
    this.listModifyPasswordId = "_" + Toolkit.getUuid(true);
    // 列表-登出的id
    this.listLogoutId = "_" + Toolkit.getUuid(true);
    // 对话框-修改密码的id
    this.dialogModifyPasswordId = "_" + Toolkit.getUuid(true);
    // 对话框-登出确认的id
    this.dialogLogoutConfirmId = "_" + Toolkit.getUuid(true);
    // 按钮-修改密码的id
    this.buttonModifyPasswordId = "_" + Toolkit.getUuid(true);
    // 按钮-登出按钮的id
    this.buttonLogoutId = "_" + Toolkit.getUuid(true);
    // 输入-新密码的class
    this.inputNewPasswordCls = "_" + Toolkit.getUuid(true);
    // 输入-新密码确认的class
    this.inputNewPasswordConfirmCls = "_" + Toolkit.getUuid(true);
    // 标签-新密码提示消息的id
    this.labelNewPasswordPromptMessageId = "_" + Toolkit.getUuid(true);
    // 标签-新密码确认提示消息的id
    this.labelNewPasswordConfirmPromptMessageId = "_" + Toolkit.getUuid(true);
  }

  /**
   * 初始化函数
   */
  init() {
    let currentObject = this;
    // 修改密码列表按钮事件绑定
    $(document).on("click", `#${this.listModifyPasswordId}`, function() {
      currentObject.outputModifyPasswordDialog();
    });
    // 登出列表按钮事件绑定
    $(document).on("click", `#${this.listLogoutId}`, function() {
      Toolkit.generateBootstrapConfimDialog(this.dialogOutputId, "退出确认", "确认要退出吗？", "取消", "退出", function() {
        UserStatus.userLogout(currentObject.redirect);
      });
    });
    // 修改密码按钮事件绑定
    $(document).on("click", `#${this.buttonModifyPasswordId}`, function() {
      currentObject.modifyPassword();
    });
  }

  /**
   * 输出修改密码对话框
   */
  outputModifyPasswordDialog() {
    let code = 
      `<div class = "modal fade custom_modal" id = "${this.dialogModifyPasswordId}" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "false">
        <div class = "modal-dialog modal-sm">
          <div class = "modal-content">
            <div class = "modal-header bg-primary">
              <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
              <h4 class = "modal-title" id = "myModalLabel">修改密码</h4>
            </div>
            <div class = "modal-body nopadding-bottom">
              <div class = "form-group">
                  <label for = "name" class = "pull-left">新密码</label><span class = "pull-right header_color_red" id = "${this.labelNewPasswordPromptMessageId}"></span>
                  <input class = "form-control ${this.inputNewPasswordCls}" type = "password">
               </div>
              <div class = "form-group">
                  <label for = "name">新密码确认</label><span class = "pull-right header_color_red" id = "${this.labelNewPasswordConfirmPromptMessageId}"></span>
                  <input class = "form-control ${this.inputNewPasswordConfirmCls}" type = "password" value = "">
               </div>
            </div>
            <div class = "modal-footer">
              <button type = "button" class = "btn btn-primary" id = "${this.buttonModifyPasswordId}">修改</button>
              <button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>
            </div>
          </div>
        </div>
      </div>`;
    $(this.dialogOutputId).append(code);
    $(`#${this.dialogModifyPasswordId}`).modal("show");
    $(`#${this.dialogModifyPasswordId}`).on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  }

  /**
   * 输出头部
   */
  outputHeader() {
    let code = 
      `<div class = "row header_row">
        <div class = "col-lg-12 header_col">
          <div class = "panel panel-primary header_radius header_mb0">
            <div class = "panel-heading clearfix header_radius">
              <div class="pull-left ">
                <img src = "../../img/fjerp_logo_white.png" width = "24" class = "header_mr15" />
                <span class = "header_line">系统管理</span>
              </div>
              <div class = "pull-right">
                <div class = "btn-group">
                  <button class = "btn btn-default dropdown-toggle" type = "button" data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false">管理员<span class = "caret"></span></button>
                  <ul class = "dropdown-menu header_menu">
                    <li><a id = "${this.listModifyPasswordId}">修改密码</a></li>
                    <li><a id = "${this.listLogoutId}">退出</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $(this.headerOutputId).html(code);
  }

  /**
   * 修改密码
   */
  modifyPassword() {
    let newPassword = $(`.${this.inputNewPasswordCls}`).val();
    let newPasswordConfirm = $(`.${this.inputNewPasswordConfirmCls}`).val();
    if ((null == newPassword) || (0 == newPassword.length)) {
      $(`#${this.labelNewPasswordPromptMessageId}`).html("请输入密码");
      $(`.${this.inputNewPasswordCls}`).focus();
      return;
    } else {
      $(`#${this.labelNewPasswordPromptMessageId}`).html("");
    }
    if ((null == newPasswordConfirm) || (0 == newPasswordConfirm.length)) {
      $(`#${this.labelNewPasswordConfirmPromptMessageId}`).html("请输入确认密码");
      $(`.${this.inputNewPasswordConfirmCls}`).focus();
      return;
    } else {
      $(`#${this.labelNewPasswordConfirmPromptMessageId}`).html("");
    }
    if (newPassword != newPasswordConfirm) {
      alert("两次密码不一致");
      return; 
    }
    let url = `${Configure.getProjectPath(2)}lego/lego_user?servletName=modifyUserSecurityWithPasswordByUser`;
    let data = {
      "password": newPassword
    };
    let result = Toolkit.ajaxAssistant(url, data, false, true, false);
    if (1 == result.status) {
      $(`#${this.dialogModifyPasswordId}`).modal("hide");
      $(`#${this.dialogModifyPasswordId}`).on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    } else {
      alert("修改密码失败");
    }
  }
}
