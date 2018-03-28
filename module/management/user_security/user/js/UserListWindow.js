////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// UserListWindow
////////////////////////////////////////////////////////////////////////////////
class UserListWindow {
  constructor(ucw, urw, umw) {
    this.ucw = ucw;
    this.urw = urw;
    this.umw = umw;
    ////////////////////////////////////////////////////////////////////////////
    // 搜索参数
    ////////////////////////////////////////////////////////////////////////////
    this.data = {};
    ////////////////////////////////////////////////////////////////////////////
    // Name搜索框
    ////////////////////////////////////////////////////////////////////////////
    this.nameTF = new JSTextField();
    this.nameTF.setPlaceHolder("Name");
    this.nameTF.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Search按钮
    ////////////////////////////////////////////////////////////////////////////
    this.searchBtn = new JSButton();
    this.searchBtn.setText("Search");
    this.searchBtn.setClass("btn-primary");
    this.searchBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // User列表
    ////////////////////////////////////////////////////////////////////////////
    this.listTable = new JSTable();
    this.listTable.setClass("table-striped table-bordered");
    this.listTable.setThead(
      [
        {
          "text": "Name",
          "colspan": -1
        },
        {
          "text": "Role",
          "colspan": -1
        },
        {
          "text": "Failed Retry Count",
          "colspan": -1
        },
        {
          "text": "Frozen Datetime",
          "colspan": -1
        },
        {
          "text": "Status",
          "colspan": -1
        },
        {
          "text": "Operation",
          "colspan": -1
        }
      ]
    );
    this.listTable.addTbody(
      [
        {
          "text": "Search Result",
          "value": "",
          "colspan": 6,
          "rowspan": -1
        }
      ]
    );
    this.listTable.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 分页对象
    ////////////////////////////////////////////////////////////////////////////
    this.pagination = new JSPagination();
    this.pagination.setSize(3);
    ////////////////////////////////////////////////////////////////////////////
    // Create按钮
    ////////////////////////////////////////////////////////////////////////////
    this.createBtn = new JSButton();
    this.createBtn.setText("Create");
    this.createBtn.setClass("btn-primary");
    this.createBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setWindowDecorationStyle("FRAME");
    this.mainWindow.setTitle("User List");
    this.mainWindow.setClass("UserListWindow");
    this.mainWindow.setContent(`
      <div class="input-group">${this.nameTF.getCode()}<span class="input-group-btn">${this.searchBtn.getCode()}</span></div>
      <div>${this.listTable.getCode()}</div>
      <div>${this.pagination.getCode()}</div>
      <div>${this.createBtn.getCode()}</div>
    `);
    this.mainWindow.generateCode();
  }

  //////////////////////////////////////////////////////////////////////////////
  // 设置用户列表数据
  //////////////////////////////////////////////////////////////////////////////
  setUserList(userList) {
    this.listTable.removeTbodyAll();
    for (let i = 0; i < userList.length; i++) {
      if (null == userList[i].frozen_datetime) {
        userList[i].frozen_datetime = "None";
      }
      if (1 == userList[i].status) {
        userList[i].status = "Normal";
      }
      if (2 == userList[i].status) {
        userList[i].status = "Frozen";
      }
      if (3 == userList[i].status) {
        userList[i].status = "Lock";
      }
      this.listTable.addTbody(
        [
          {
            "text": `${userList[i].name}`,
            "value": `${userList[i].name}`,
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${userList[i].role}`,
            "value": `${userList[i].role}`,
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${userList[i].failed_retry_count}`,
            "value": `${userList[i].failed_retry_count}`,
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${userList[i].frozen_datetime}`,
            "value": `${userList[i].frozen_datetime}`,
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${userList[i].status}`,
            "value": `${userList[i].status}`,
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `<i class = "icon-edit" data-uuid = "${userList[i].uuid}"></i><i class = "icon-remove" data-uuid = "${userList[i].uuid}"></i>`,
            "value": "",
            "colspan": -1,
            "rowspan": -1
          }
        ]
      );
    }
    this.listTable.generateCode();
    this.pagination.setOffset(this.data.offset);
    this.pagination.setRows(this.data.rows);
    this.pagination.setCount(this.count);
    this.pagination.generateCode();
    this.mainWindow.setContent(`
      <div class="input-group">${this.nameTF.getCode()}<span class="input-group-btn">${this.searchBtn.getCode()}</span></div>
      <div>${this.listTable.getCode()}</div>
      <div>${this.pagination.getCode()}</div>
      <div>${this.createBtn.getCode()}</div>
    `);
    this.mainWindow.generateCode();
    $("#userListWindowArea").html(this.mainWindow.getCode());
    this.update();
  }

  loadUserList(offset, rows) {
    // 获取计数
    this.data.data_type = "count";
    let result = Ajax.submit(Configure.getServerUrl() + "user_security/getUserByManager/", this.data, false, true, false);
    if (!Common.analyseResult(result)) {
      alert("Search Failed");
      return;
    }
    this.count = result.detail[0].count;
    delete this.data.data_type;
    this.data.offset = offset;
    this.data.rows = rows;
    result = Ajax.submit(Configure.getServerUrl() + "user_security/getUserByManager/", this.data, false, true, false);
    if (!Common.analyseResult(result)) {
      alert("Search Failed");
      return;
    }
    this.setUserList(result.detail);
  }

  update() {
    let _this = this;
    ////////////////////////////////////////////////////////////////////////////
    // 绑定Search按钮事件
    ////////////////////////////////////////////////////////////////////////////
    $(this.searchBtn.getObject()).click(function() {
      let name = _this.nameTF.getObject().val();
      if (0 < name.length) {
        if (null == name.match(/^[0-9a-zA-Z_-]{4,16}$/)) {
          $(_this.nameTF.getObject()).val("");
          $(_this.nameTF.getObject()).attr("placeholder", "Name Incorrect");
          $(_this.nameTF.getObject()).css("background-color", "#ffb1b1");
          return;
        }
        _this.data = {
          "name": name
        }
      } else {
        delete _this.data.name;
      }
      _this.loadUserList(0, 20);
      // let result = Ajax.submit(Configure.getServerUrl() + "user_security/getUserByManager/", _this.data, false, true, false);
      // if (Common.analyseResult(result)) {
      //   // 清空数据
      //   $(_this.nameTF.getObject()).replaceWith(_this.nameTF.getCode());
      //   _this.listTable.removeTbodyAll();
      //   _this.setUserList(result.detail);
      //   $("#userListWindowArea").html(_this.mainWindow.getCode());
      //   _this.update();
      // } else {
      //   // 搜索失败
      //   alert("Search Failed");
      // }
    });
    ////////////////////////////////////////////////////////////////////////////
    // 关联Create按钮打开模态窗口
    ////////////////////////////////////////////////////////////////////////////
    $(this.createBtn.getObject()).attr("data-toggle", "modal");
    $(this.createBtn.getObject()).attr("data-target", "#" + this.ucw.mainWindow.getId());
    ////////////////////////////////////////////////////////////////////////////
    // 关联编辑图标打开模态窗口
    ////////////////////////////////////////////////////////////////////////////
    $(".icon-edit").attr("data-toggle", "modal");
    $(".icon-edit").attr("data-target", "#" + _this.umw.mainWindow.getId());
    $(".icon-edit").click(function() {
      // 设置修改数据的uuid
      _this.umw.loadUser($(this).attr("data-uuid"));
    });
    ////////////////////////////////////////////////////////////////////////////
    // 关联删除图标打开模态窗口
    ////////////////////////////////////////////////////////////////////////////
    $(".icon-remove").attr("data-toggle", "modal");
    $(".icon-remove").attr("data-target", "#" + _this.urw.mainWindow.getId());
    $(".icon-remove").click(function() {
      $(_this.urw.mainWindow.getObject()).attr("data-uuid", $(this).attr("data-uuid"));
    });   
  }
}
