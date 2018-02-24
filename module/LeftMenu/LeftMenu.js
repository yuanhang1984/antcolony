"use strict";

class LeftMenu {
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
    // 初始化菜单数据
    this.menuData = [
    {
      "text": "Database",
      "icon": "icon-hdd",
      "list": [
        {
          "text": "Management",
          "link": "http://www.cctv.com",
        },
        {
          "text": "SQL",
          "link": "http://www.google.com",
        }
      ]
    },
    {
      "text": "Modules",
      "icon": "icon-cogs",
      "list": [
        {
          "text": "Management",
          "link": "http://www.xh127.com",
        },
        {
          "text": "Source Code",
          "link": "http://www.google.com",
        },
        {
          "text": "Dispatch",
          "link": "http://www.sougou.com",
        }
      ]
    }
    ];
  }

  /**
   * @Override
   */
  _output() {
    let code = `
      <ul class = "LeftMenu_Menu">
        <li class = "LeftMenu_Header"><span style = "color: #FFFFFF;">Palest</span><span style = "color: #6BC5A4;">Ink</span></li>
        <li class = "LeftMenu_Footer">Copyright 2018 Palestink.com</li>
      </ul>     
    `;
    $(this.outputId).html(code);
    this.outputMenu();
  }

  /**
   * @Override
   */
  _eventBind() {
    let currentObject = this;
    $(".LeftMenu_Child").click(function() {
      currentObject.setChildSelected($(this).text(),$(this).attr("data-link"));
      // window.location.href = $(this).attr("data-link");
    });
  }

  /**
   * 设置当前选中菜单
   */
  setChildSelected(text, link) {
    // 清空原有选中标记
    $(this.outputId).find("li").removeClass("LeftMenu_Child_Selected");
    // 重新遍历菜单设置标记
    $(this.outputId).find("li").each(function() {
      if (($(this).text() == text) && ($(this).attr("data-link") == link)) {
        $(this).addClass("LeftMenu_Child_Selected");
        return;
      }
    });
  }

  /**
   * 输出菜单（在这之前需要调用_output方法）
   */
  outputMenu() {
      let subMenu = `<ul>`;
      for (let i = 0; i < this.menuData.length; i++) {
        let m = this.menuData[i];
        subMenu += `<li class = "LeftMenu_Parent"><i class = "${m.icon}"></i>${m.text}</li>`;
        subMenu += `<ul>`;
        for (let j = 0; j < m.list.length; j++) {
          subMenu += `<li class = "LeftMenu_Child" data-link = "${m.list[j].link}">${m.list[j].text}</li>`;
        }
        subMenu += `</ul>`;
      }
      $(".LeftMenu_Header").after(subMenu);
  }
}
