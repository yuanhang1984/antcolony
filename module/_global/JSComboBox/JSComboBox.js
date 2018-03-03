"use strict";

class JSComboBox {
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
    this.comboBoxId = JString.getUuid(true);
  }

  /**
   * @Override
   */
  _output() {
    // 判断菜单向下还是向上
    let typeClass = "dropdown";
    if (2 == this.comboBoxType) {
      typeClass = "dropup";
    }
    // 遍历list组合代码
    let liCode = "";
    for (let i = 0; i < this.comboBoxList.length; i++) {
      let obj = this.comboBoxList[i];
      let disableClass = "";
      if (!obj.enable) {
        disableClass = "disabled";
      }
      if ("header" == obj.type) {
        liCode += `<li class = "dropdown-header" id = "${this.comboBoxId}_li_index_${i}" data-value = "${obj.value}">${obj.text}</li>`;
      } else if ("separator" == obj.type) {
        liCode += `<li class = "divider" id = "${this.comboBoxId}_li_index_${i}"></li>`;
      } else {
        // 常规选项
        liCode += `<li class = "${disableClass}" id = "${this.comboBoxId}_li_index_${i}" data-value = "${obj.value}"><a href = "#">${obj.text}</a></li>`;
      }
    }

    // let isReadOnly = "";
    // if (this.comboBoxReadOnly) {
    //   isReadOnly = "readonly";
    // }
    // let comboBoxStyle = "";
    // if (-1 != this.comboBoxWidth) {
    //   comboBoxStyle += `width: ${this.comboBoxWidth}px; `;
    // }
    // if (-1 != this.comboBoxHeight) {
    //   comboBoxStyle += `height: ${this.comboBoxHeight}px; `;
    // }

    let code = `
      <div class = "${this.comboBoxCustomClass} ${typeClass}" id = "${this.comboBoxId}">
        <button class = "btn btn-default dropdown-toggle" type = "button" data-toggle = "dropdown" data-value = "">
          <span>${this.comboBoxList[this.comboBoxDefaultIndex].text}</span><span class = "caret"></span>
        </button>
        <ul class = "dropdown-menu">${liCode}</ul>
      </div>
    `;
    $(this.outputId).html(code);
  }

  /**
   * @Override
   */
  _eventBind() {
    // let currentObject = this;
    // $(`#${this.comboBoxId}`).find("ul").find("li").click(function() {
    //   $(`#${currentObject.comboBoxId}`).find("button").find("span:first-child").html($(this).find("a").html());
    //   $(`#${currentObject.comboBoxId}`).find("button").attr("data-value", $(this).attr("data-value"));
    // });
    let currentObject = this;
    $(`#${this.comboBoxId}`).find("ul").find("li").find("a").click(function() {
      alert("111");
      $(`#${currentObject.comboBoxId}`).find("button").find("span:first-child").html($(this).html());
      $(`#${currentObject.comboBoxId}`).find("button").attr("data-value", $(this).parent().attr("data-value"));
    });
  }

  /**
   * 配置下拉菜单
   * @param comboBoxType 下拉菜单的类型
   *        1 菜单向下
   *        2 菜单向上
   * @param comboBoxWidth 下拉菜单的宽度
   *        -1 宽度默认
   * @param comboBoxHeight 下拉菜单的高度
   *        -1 高度默认
   * @param comboBoxDefaultIndex 下拉菜单的默认序列
   * @param comboBoxCustomClass 下拉菜单自定义Class
   * @param comboBoxReadOnly 下拉菜单是否只读
   *        true 只读
   *        false 非只读
   */
  setComboBoxConfig(comboBoxType, comboBoxWidth, comboBoxHeight, comboBoxDefaultIndex, comboBoxCustomClass, comboBoxReadOnly = false) {
    this.comboBoxType = comboBoxType;
    this.comboBoxWidth = comboBoxWidth;
    this.comboBoxHeight = comboBoxHeight;
    this.comboBoxDefaultIndex = comboBoxDefaultIndex;
    this.comboBoxCustomClass = comboBoxCustomClass;
    this.comboBoxReadOnly = comboBoxReadOnly;
  }

  /**
   * 配置下拉菜单数据列表
   * @param list 列表
   * [
   *   {"type": "option", "text": "-- select --", "value": "0", "enable": false},
   *   {"type": "header", "text": "Array", "value": "0", "enable": false},
   *   {"type": "separator", "text": "", "value": "", "enable": false}
   * ]
   * list参数为json数据，每个json对象共有4组属性
   * type list显示的类型
   *      option 常规选项
   *      header 菜单头
   *      separator 分割线（当type为separator时，后面参数忽略）
   * text 所要显示的文本
   * value 文本对应的值
   * enable 是否可用
   *        true 可用
   *        false 禁用
   */
  setComboBoxList(list) {
    this.comboBoxList = list;
  }
}
