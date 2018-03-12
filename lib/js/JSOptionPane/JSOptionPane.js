"use strict";

class JSOptionPane {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectTitle = "";
    this.objectMessage = "";
    this.objectOptionType = "";
    this.objectOptionText = new Array();
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
  }

  getObject() {
    return $("#" + this.getId());
  }

  setTitle(title) {
    this.objectTitle = title;
  }

  getTitle() {
    return this.objectTitle;
  }

  setMessage(message) {
    this.objectMessage = message;
  }

  getMessage(message) {
    return this.objectMessage;
  }

  setOptionType(optionType) {
    this.objectOptionType = optionType;
  }

  getOptionType(optionType) {
    return this.objectOptionType;
  }

  setOptionText(optionText) {
    this.objectOptionText = optionText;
  }

  getOptionText(optionText) {
    return this.objectOptionText;
  }

  setClass(clazz) {
    this.objectClass = clazz;
  }

  getClass() {
    return this.objectClass;
  }

  /* 
   * index从1开始计数
   */
  getOptionButton(index = 1) {
    return $("#" + this.getId()).find("div").find("div:nth-child(2)").find(`button:nth-child(${index})`);
  }

  getCode() {
    return this.objectCode;
  }

  /*
   * setOptionText 设置按钮文本（字符串数组）
   * setOptionType 设置选项按钮类型
   *               OK_OPTION 单Ok
   *               YES_NO_OPTION Yes和No
   */
  generateCode() {
    let optionTypeCode = "";
    if ("YES_NO_OPTION" == this.getOptionType().toUpperCase()) {
      // YES_NO_OPTION
      let t1 = this.getOptionText()[0];
      let t2 = this.getOptionText()[1];
      if (undefined == t1) {
        t1 = "YES";
      }
      if (undefined == t2) {
        t2 = "NO";
      }
      optionTypeCode = `
        <button type = "button" class = "btn">${t1}</button><button type = "button" class = "btn">${t2}</button>
      `;
    } else {
      // OK_OPTION
      let t = this.getOptionText()[0];
      if (undefined == t) {
        t = "OK";
      }
      optionTypeCode = `
        <button type = "button" class = "btn">${t}</button>
      `;
    }
    // 注意：本类样式一定要加在默认class之后，getClass()之前。
    this.objectCode = `
      <div class = "modal fade JSOptionPane ${this.getClass()}" id = "${this.getId()}" tabindex = "-1">
        <div>
          <div>${this.getTitle()}<button type = "button" class = "close" data-dismiss = "modal">&times;</button></div>
          <div>
            <div>${this.getMessage()}</div>
            <div>${optionTypeCode}</div>
          </div>
        </div>
      </div>
    `;
  }
}
