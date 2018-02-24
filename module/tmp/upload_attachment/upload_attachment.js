"use strict";

class UploadAttachment {
  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   * @param type 0: 查看 1: 可编辑
   */
  constructor(outputId, type) {
    this.outputId = outputId;
    this.type = type;
    // 按钮-添加附件的类
    this.buttonAttachmentAddCls = "_" + Toolkit.getUuid(true);
    // 按钮-左查看附件的类
    this.buttonLeftSlideCls = "_" + Toolkit.getUuid(true);
    // 按钮-右查看附件的类
    this.buttonRightSlideCls = "_" + Toolkit.getUuid(true);
    // 按钮-附件的类
    this.buttonAttachmentCls = "_" + Toolkit.getUuid(true);
    // 输入-选择文件的类
    this.inputChooseFileCls = "_" + Toolkit.getUuid(true);
    // 链接-附件的类
    this.linkAttachmentCls = "_" + Toolkit.getUuid(true);
    // 层-显示附件的类
    this.divAttachmentDisplay = "_" + Toolkit.getUuid(true);
    // 层-显示内容的类
    this.divContentDisplay = "_" + Toolkit.getUuid(true);
    // 区域-显示附件的类
    this.areaAttachmentDisplay = "_" + Toolkit.getUuid(true);
  }

  /**
   * 加载样式
   */
  loadCss() {
    $(`.${this.buttonLeftSlideCls}`).addClass("upload_attachment_btn_left");
    $(`.${this.buttonRightSlideCls}`).addClass("upload_attachment_btn_right");
    $(`.${this.buttonAttachmentCls}`).addClass("upload_attachment_btn");
    $(`.${this.inputChooseFileCls}`).addClass("upload_attachment_file_choose");
    $(`.${this.divAttachmentDisplay}`).addClass("upload_attachment_box");
    $(`.${this.divContentDisplay}`).addClass("upload_attachment_content");
    $(`.${this.areaAttachmentDisplay}`).addClass("upload_attachment_area");
    $(`.${this.divContentDisplay} ul`).addClass("upload_attachment_content_ul");
    $(`.${this.divContentDisplay} ul li`).addClass("upload_attachment_content_ul_li");
    $(`.${this.divContentDisplay} ul li a`).addClass("upload_attachment_content_ul_li_a");
    $(`.${this.divContentDisplay} ul li a img`).addClass("upload_attachment_content_ul_li_a_img");
    $(`.${this.buttonAttachmentAddCls} > img`).addClass("upload_attachment_add-img");
    $(`.${this.linkAttachmentCls} > button`).addClass("upload_attachment_file-button");
  }

  /**
   * 根据后缀获取图片显示的src
   *
   * @param fileName 文件名
   *
   * @return 返回图片显示的src
   */
  getDisplayImageSrc(fileName) {
    let imgSrc = null;
    let suffix = fileName.substring(fileName.indexOf(".") + 1).toLowerCase();
    if ("png" == suffix) {
       imgSrc = `${Configure.getProjectPath(2)}upload/${fileName}`;
     } else if ("jpg" == suffix) {
       imgSrc = `${Configure.getProjectPath(2)}upload/${fileName}`;
     } else if ("jpeg" == suffix) {
       imgSrc = `${Configure.getProjectPath(2)}upload/${fileName}`;
     } else if ("gif" == suffix) {
       imgSrc = `${Configure.getProjectPath(2)}upload/${fileName}`;
     } else {
       if ("accdb" == suffix) {
         imgSrc = "../../img/file_type/accdb.png";
       } else if ("avi" == suffix) {
         imgSrc = "../../img/file_type/avi.png";
       } else if ("bmp" == suffix) {
         imgSrc = "../../img/file_type/bmp.png";
       } else if ("css" == suffix) {
         imgSrc = "../../img/file_type/css.png";
       } else if ("doc" == suffix) {
         imgSrc = "../../img/file_type/doc.png";
       } else if ("docx" == suffix) {
         imgSrc = "../../img/file_type/docx.png";
       } else if ("eml" == suffix) {
         imgSrc = "../../img/file_type/eml.png";
       } else if ("eps" == suffix) {
         imgSrc = "../../img/file_type/eps.png";
       } else if ("fla" == suffix) {
         imgSrc = "../../img/file_type/fla.png";
       } else if ("ind" == suffix) {
         imgSrc = "../../img/file_type/ind.png";
       } else if ("ini" == suffix) {
         imgSrc = "../../img/file_type/ini.png";
       } else if ("jsf" == suffix) {
         imgSrc = "../../img/file_type/jsf.png";
       } else if ("midi" == suffix) {
         imgSrc = "../../img/file_type/midi.png";
       } else if ("mov" == suffix) {
         imgSrc = "../../img/file_type/mov.png";
       } else if ("mp3" == suffix) {
         imgSrc = "../../img/file_type/mp3.png";
       } else if ("mpeg" == suffix) {
         imgSrc = "../../img/file_type/mpeg.png";
       } else if ("pdf" == suffix) {
         imgSrc = "../../img/file_type/pdf.png";
       } else if ("pptx" == suffix) {
         imgSrc = "../../img/file_type/pptx.png";
       } else if ("proj" == suffix) {
         imgSrc = "../../img/file_type/proj.png";
       } else if ("psd" == suffix) {
         imgSrc = "../../img/file_type/psd.png";
       } else if ("pub" == suffix) {
         imgSrc = "../../img/file_type/pub.png";
       } else if ("rar" == suffix) {
         imgSrc = "../../img/file_type/rar.png";
       } else if ("readme" == suffix) {
         imgSrc = "../../img/file_type/readme.png";
       } else if ("settings" == suffix) {
         imgSrc = "../../img/file_type/settings.png";
       } else if ("tiff" == suffix) {
         imgSrc = "../../img/file_type/tiff.png";
       } else if ("url" == suffix) {
         imgSrc = "../../img/file_type/url.png";
       } else if ("vsd" == suffix) {
         imgSrc = "../../img/file_type/vsd.png";
       } else if ("wav" == suffix) {
         imgSrc = "../../img/file_type/wav.png";
       } else if ("wma" == suffix) {
         imgSrc = "../../img/file_type/wma.png";
       } else if ("wmv" == suffix) {
         imgSrc = "../../img/file_type/wmv.png";
       } else if ("xls" == suffix) {
         imgSrc = "../../img/file_type/xls.png";
       } else if ("xlsx" == suffix) {
         imgSrc = "../../img/file_type/xlsx.png";
       } else if ("zip" == suffix) {
         imgSrc = "../../img/file_type/zip.png";
       } else {
         imgSrc = "../../img/file_type/other.png";
       }
     }
     return imgSrc;
  }

  /**
   * 绑定上传附件按钮事件
   */
  buttonEventBind() {
    let currentObject = this;
    // 模拟打开“文件选择”对话框事件
    $(document).on("click", `.${this.buttonAttachmentAddCls}`, function() {
      $(document).find(`.${currentObject.inputChooseFileCls}`).trigger("click");
    });
    // 选择文件后的内容改变事件
    $(document).on("change", `${this.outputId} .${this.inputChooseFileCls}`, function() {
      for (let i = 0; i < $(this)[0].files.length; i++) {
        let formData = new FormData();
        formData.append("file", $(this)[0].files[i]);
        let result = Toolkit.ajaxAssistant(`${Configure.getProjectPath(2)}/lego/lego_storage?servletName=c_uploadTemporaryFile`, formData, false, true, true);
        if (1 == result.status) {
          // 上传成功
          result = JSON.parse(result.result);
          let imgSrc = currentObject.getDisplayImageSrc(result.file_name);
          $(currentObject.outputId).find("ul").append(
            `<li>
              <a class = "${currentObject.linkAttachmentCls}" data-cluster = "${result.cluster_name}" data-url = "${Configure.getProjectPath(2)}upload/${result.file_name}">
                <button class="btn btn-danger"><span class="glyphicon glyphicon-remove  btn-danger"></span></button>
                <img src = "${imgSrc}">
              </a>
            </li>`
          );
          currentObject.loadCss();
        } else {
          alert(`[${$(this)[0].files[i].name}]上传失败`)
          return;
        }
      }
      $(currentObject.outputId).find(`.${currentObject.inputChooseFileCls}`).val("");
      // 绑定新页面打开附件事件
      $(currentObject.outputId).find(`.${currentObject.linkAttachmentCls}`).unbind("click");
      $(currentObject.outputId).find(`.${currentObject.linkAttachmentCls}`).click(function() {
        window.open($(this).attr("data-url"));
      });
      // 绑定删除附件按钮事件
      $(currentObject.outputId).find(`.${currentObject.linkAttachmentCls} button`).unbind("click");
      $(currentObject.outputId).find(`.${currentObject.linkAttachmentCls} button`).click(function() {
        $(this).parent().parent().remove();
      });
    });
    // 绑定左滚动按钮事件
    $(currentObject.outputId).find(`.${currentObject.buttonLeftSlideCls}`).click(function() {
      let leftValue = parseInt($(currentObject.outputId).find(`.${currentObject.divAttachmentDisplay}`).css("left"));
      let step = leftValue + $(currentObject.outputId).find("a").width();
      if (0 <= step) {
        step = 0;
      }
      $(currentObject.outputId).find(`.${currentObject.divAttachmentDisplay}`).css("left", step);
    });
    // 绑定右滚动按钮事件
    $(currentObject.outputId).find(`.${currentObject.buttonRightSlideCls}`).click(function() {
      let liList = $(currentObject.outputId).find("ul").children("li");
      let leftValue = parseInt($(currentObject.outputId).find(`.${currentObject.divAttachmentDisplay}`).css("left"));
      let step = leftValue - $(currentObject.outputId).find("a").width();
      if ($(currentObject.outputId).find("a").width() * liList.length - $(currentObject.outputId).find("a").width() > Math.abs(step)) {
        $(currentObject.outputId).find(`.${currentObject.divAttachmentDisplay}`).css("left", step);
      }
    });
  }

  /**
   * 输出上传附件
   *
   * @param fileData 文件数据的json对象。需要一个key：file_name。
   */
  output(fileData) {
    let data = "";
    let addBtnCode = "";
    let removeBtnCode = "";
    if (1 == this.type) {
      addBtnCode = `<li><a class = "${this.buttonAttachmentAddCls}"><img src = "../../img/add_attachment.png"></a></li>`;
      removeBtnCode = `<button class="btn btn-danger"><span class="glyphicon glyphicon-remove  btn-danger"></span></button>`;
    }
    if (null != fileData) {
      for (let i = 0; i < fileData.length; i++) {
        let dataCluster = fileData[i].file_name.substring(0, fileData[i].file_name.indexOf("."));
        let imgSrc = this.getDisplayImageSrc(fileData[i].file_name);
        data += 
          `<li>
            <a class = "${this.linkAttachmentCls}" data-cluster = "${dataCluster}" data-url = "${Configure.getProjectPath(2)}upload/${fileData[i].file_name}">
              ${removeBtnCode}
              <img src = "${imgSrc}">
            </a>
          </li>`;
      }
    }
    let code = 
      `<div class = "${this.areaAttachmentDisplay}">
        <div class = "${this.buttonAttachmentCls} ${this.buttonLeftSlideCls}"><span class = "glyphicon glyphicon-chevron-left"></span></div>
        <div class = "${this.divContentDisplay}">
          <input class = "${this.inputChooseFileCls}" type = "file" multiple = "multiple" accept = "image/png, aplication/zip, text/plain, application/pdf,  image/jpeg, image/jpeg, image/jpeg, image/jp2, image/gif" />
          <div class = "${this.divAttachmentDisplay}">
            <ul>
              ${addBtnCode}
              ${data}
            </ul>
          </div>
        </div>
        <div class = "${this.buttonAttachmentCls} ${this.buttonRightSlideCls}"><span class = "glyphicon glyphicon-chevron-right"></span></div>
      </div>`;
    $(this.outputId).html(code);
    // 绑定新页面打开附件事件
    $(this.outputId).find(`.${this.linkAttachmentCls}`).unbind("click");
    $(this.outputId).find(`.${this.linkAttachmentCls}`).click(function() {
      window.open($(this).attr("data-url"));
    });
    // 绑定删除附件按钮事件
    $(this.outputId).find(`.${this.linkAttachmentCls} button`).unbind("click");
    $(this.outputId).find(`.${this.linkAttachmentCls} button`).click(function() {
      $(this).parent().parent().remove();
    });
    this.buttonEventBind(this.outputId);
    this.loadCss();
  }

  /**
   * 获取附件的数据
   *
   * @return json对象数组
   */
  getClusterArray() {
    let retData = new Array();
    let li = $(`${this.outputId} ul`).children("li");
    for (let i = 0; i < li.length; i++) {
      let obj = li[i];
      let cluster = $(obj).find("a").attr("data-cluster");
      if (undefined != cluster) {
        retData.push({"cluster": cluster});
      }    
    }
    return retData;
  }
}
