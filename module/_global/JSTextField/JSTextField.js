"use strict";

class JSTextField {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectType = "";
    this.objectPlaceHolder = "";
    this.objectValue = "";
    this.objectReadOnly = false;
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
  }

  setType(type) {
    this.objectType = type;
  }

  getType() {
    return this.objectType;
  }

  setPlaceHolder(placeHolder) {
    this.objectPlaceHolder = placeHolder;
  }

  getPlaceHolder() {
    return this.objectPlaceHolder;
  }

  setValue(value) {
    this.objectValue = value;
  }

  getValue() {
    return this.objectValue;
  }

  setClass(clazz) {
    this.objectClass = clazz;
  }

  getClass() {
    return this.objectClass;
  }

  setReadOnly(readOnly) {
    this.objectReadOnly = readOnly;
  }

  getReadOnly() {
    return this.objectReadOnly;
  }

  getCode() {
    return this.objectCode;
  }

  /* 
   * 生成源码
   *
   * setType 设置类型
   *   text 文本框
   *   password 密码框
   * setPlaceHolder 设置placeholder
   */
  generateCode() {
    let readOnly = "";
    if (this.getReadOnly()) {
      readOnly = "readonly";
    }
    this.objectCode = `
      <input ${readOnly} type = "${this.getType()}" class = "${this.getClass()}" id = "${this.getId()}" placeholder = "${this.getPlaceHolder()}"  value = "${this.getValue()}" />
    `;
  }
}
