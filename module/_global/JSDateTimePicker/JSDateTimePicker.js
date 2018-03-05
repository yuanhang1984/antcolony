"use strict";

class JSDateTimePicker {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectPlaceHolder = "";
    this.objectValue = "";
    this.objectReadOnly = false;
    this.objectFormat = "";
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
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

  setFormat(format) {
    this.objectFormat = format;
  }

  getFormat() {
    return this.objectFormat;
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

  update() {
    $("#" + this.getId()).datetimepicker();
  }

  generateCode() {
    let readOnly = "";
    if (this.getReadOnly()) {
      readOnly = "readonly";
    }
    this.objectCode = `
      <input ${readOnly} type = "text" class = "${this.getClass()}" id = "${this.getId()}" placeholder = "${this.getPlaceHolder()}"  value = "${this.getValue()}" data-date-format = "${this.getFormat()}" />
    `;
  }
}
